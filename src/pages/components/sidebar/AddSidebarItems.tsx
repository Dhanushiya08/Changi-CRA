import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { RiRobot2Line, RiUserSettingsLine } from "react-icons/ri";
import { LOCAL_IMAGE } from "../../../assets/images/ImagesJson";

export const SIDEBAR_ITEMS = [
  {
    key: "dashboard01",
    title: "Dashboard",
    icon: <img src={LOCAL_IMAGE.dashboardIcon} className="me-2" />,
    link: "/dashboard",
  },
  {
    key: "userData",
    title: "Document Upload",
    icon: <HiOutlineUserCircle className="me-2  " size={19} />,
    link: "/document-upload",
  },
  {
    key: "management",
    title: "User Management",
    icon: <RiUserSettingsLine className="me-2  " size={19} />,
    link: "/user-management",
  },
  {
    key: "history",
    title: "History",
    icon: <RiRobot2Line className="me-2 " size={19} />,
    link: "/chatbot-history",
  },
  {
    key: "br",
    customJSX: <hr className="border mx-2 border-[#24272C] border-solid  " />,
  },
  {
    key: "settings",
    title: "User Settings",
    icon: <IoSettingsSharp className="me-2  " size={19} />,
    link: "/settings",
  },
];
