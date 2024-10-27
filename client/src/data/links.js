import {
  FaHome,
  FaTags,
  FaPhone,
  FaInfo,
  FaUserFriends,
  FaUser,
  FaBars,
} from "react-icons/fa";
export const links = [
  { name: "Home", linkto: "/", icon: <FaHome /> },
  { name: "Categories", linkto: "/categories", icon: <FaTags /> },
  { name: "Posts", linkto: "/posts", icon: <FaBars /> },
  { name: "Bloggers", linkto: "/bloggers", icon: <FaUserFriends /> },
  { name: "Contact", linkto: "/contact", icon: <FaPhone /> },
  { name: "About", linkto: "/about", icon: <FaInfo /> },
  { name: "Admin", linkto: "/admin", icon: <FaUser /> },
];

export const adminLinks = [
  { name: "Dashboard", link: "/admin" },
  { name: "Write", link: "/admin/write" },
  { name: "Posts", link: "/admin/posts" },
  { name: "Account", link: "/admin/account" },
  { name: "Control room", link: "/admin/super" },
];
