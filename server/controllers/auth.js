require("dotenv").config();
const Author = require("../models/authors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { fullname, username, email, password, cPassword } = req.body;

    if (!fullname || !username || !email || !password || !cPassword)
      return res.status(500).json({ msg: "fill in required fields" });

    const emailExists = await Author.findOne({ email });
    if (emailExists)
      return res.status(500).json({ msg: "email already exists" });

    const usernameExists = await Author.findOne({ username });
    if (usernameExists)
      return res.status(500).json({ msg: "username already exists" });

    if (password !== cPassword)
      return res.status(500).json({ msg: "passwords do not match" });

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const dataObj = {
      fullname: fullname.toLowerCase(),
      username: username.toLowerCase().replace(/[\s\&\(\)]/g, "_"),
      email: email.toLowerCase(),
      password: newPassword,
    };
    const data = await Author.create({ ...dataObj });

    const token = jwt.sign(
      { userId: data._id, admin: data.admin, status: data.status },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    res.status(200).json({
      msg: "Registration successfull, redirecting...",
      userId: data._id,
      token,
    });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const login = async (req, res) => {
  try {
    const { user, password } = req.body;
    if (!user || !password)
      return res.status(500).json({ msg: "Fill in required fields" });

    const userData = await Author.findOne({
      $or: [{ username: user.toLowerCase() }, { email: user.toLowerCase() }],
    });
    if (!userData)
      return res
        .status(500)
        .json({ msg: "I don't you have an account with us" });

    const confirmPassword = await bcrypt.compare(password, userData.password);
    if (!confirmPassword)
      return res.status(500).json({ msg: "Password incorrect!!" });

    if (userData.status === 0)
      return res
        .status(500)
        .json({ msg: "Ur account has not been verified yet" });

    if (userData.status === 2)
      return res.status(500).json({
        msg: "Ur account has been suspended for a while, contact admin for further info...",
      });

    const token = jwt.sign(
      { userId: userData._id, admin: userData.admin, status: userData.status },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.status(201).json({
      msg: "Signed in succesfully, redirecting...",
      token,
      userId: userData._id,
    });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

module.exports = { register, login };
