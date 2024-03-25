import { LOCAL_IMAGE } from "../../../assets/images/ImagesJson";
import SideBarList from "./SideBarList";
import "./sidebar.scss";

function Sidebar() {
  return (
    <div className=" bg-sidebarBlack h-[100vh]  sticky  top-0  ">
      <div className="p-4">
        <img src={LOCAL_IMAGE.logo} className=" object-contain" />
      </div>

      <SideBarList />
    </div>
  );
}
export default Sidebar;
