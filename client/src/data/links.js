import { FaHome, FaTags, FaPhone, FaInfo } from "react-icons/fa";
export const links = [
  { name: "Home", linkto: "/", icon: <FaHome /> },
  { name: "About", linkto: "/about", icon: <FaInfo /> },
  { name: "Categories", linkto: "/categories", icon: <FaTags /> },
  { name: "Contact", linkto: "/contact", icon: <FaPhone /> },
];

export const adminLinks = [
  { name: "Dashboard", link: "/admin/" },
  { name: "Write", link: "/admin/write" },
  { name: "Posts", link: "/admin/posts" },
  { name: "Account", link: "/admin/account" },
];
