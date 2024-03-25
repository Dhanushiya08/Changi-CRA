import { useEffect, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_ITEMS } from "./AddSidebarItems";

function SideBarList() {
  const [currentPageLink, setCurrentPageLink] = useState("/");

  const location = useLocation();

  useEffect(() => {
    setCurrentPageLink(location.pathname);
  }, [location.pathname]);
  const renderSidebarList = (item: any) => {
    if (item.link) {
      return (
        <li
          key={item.key}
          className={`${
            currentPageLink === item.link
              ? " transition-all duration-300 bg-cagActiveViolet"
              : " "
          } py-3 mx-2 flex`}
        >
          <Link to={item.link} className=" px-4  flex items-center text-[14px]">
            {item.icon}
            {item.title}
          </Link>
        </li>
      );
    } else if (item.customJSX) {
      return <div key={item.key}>{item.customJSX}</div>;
    } else {
      return null;
    }
  };
  return (
    <div>
      <div className="  pt-5 scrollSidebar">
        <ul className="text-sidebarText space-y-3">
          {SIDEBAR_ITEMS.map((item) => renderSidebarList(item))}
        </ul>

        <button className="absolute p-2 bottom-4 bg-cagViolet rounded-md h-[28px]  text-[12px]">
          <BsLayoutSidebar
            className=" font-extrabold"
            size={13}
            color="white"
          />
        </button>
      </div>
    </div>
  );
}

export default SideBarList;
