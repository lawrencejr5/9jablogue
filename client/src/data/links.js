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
  { name: "Posts", linkto: "/contact", icon: <FaBars /> },
  { name: "Categories", linkto: "/categories", icon: <FaTags /> },
  { name: "Bloggers", linkto: "/contact", icon: <FaUserFriends /> },
  // { name: "Contact", linkto: "/contact", icon: <FaPhone /> },
  { name: "About", linkto: "/about", icon: <FaInfo /> },
  { name: "Admin", linkto: "/admin", icon: <FaUser /> },
];

export const adminLinks = [
  { name: "Dashboard", link: "/admin" },
  { name: "Write", link: "/admin/write" },
  { name: "Posts", link: "/admin/posts" },
  { name: "Account", link: "/admin/account" },
];
