import { Button, Select } from "antd";
import React from "react";
import { RiUserSettingsLine } from "react-icons/ri";
import { getUserCookie } from "../../../utils/helperFunctions/getCookie";
import { UserManagementTypes, Userrole } from "./_userManage";
import "./usermanage.scss";
interface HeaderProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatestatus: React.Dispatch<React.SetStateAction<boolean>>;
  setoldrecord: React.Dispatch<
    React.SetStateAction<UserManagementTypes | null>
  >;
  setUser: React.Dispatch<React.SetStateAction<Userrole>>;
}
const Header = ({
  setIsModalOpen,
  setUpdatestatus,
  setoldrecord,
  setUser,
}: HeaderProps) => {
  const { role_type } = getUserCookie();
  //zustand state
  // const userListData = useUserManagementUserListStore(
  //   (state: any) => state.userListData
  // );
  const handleAdduser = () => {
    const isAdmin = role_type === "super admin";
    if (isAdmin) {
      setIsModalOpen(true);
      setUpdatestatus(false);
      setoldrecord(null);
    }
  };
  const handleChange = (value: string) => {
    setUser({ role: value });
  };

  return (
    <>
      <div className="flex justify-between items-center w-full p-2">
        <div className="flex flex-row">
          <div className="px-1 pt-1">
            <RiUserSettingsLine className="text-xl" />
          </div>
          <div className="text-xl font-bold px-1">User Management</div>
        </div>
        <div className="flex flex-row  justify-around">
          <div className="p-1 font-semibold">User Type:</div>
          <div className="px-1">
            <Select
              className="user-type-select"
              defaultValue="All"
              style={{ width: 100 }}
              onChange={handleChange}
              options={[
                { value: "all", label: "All" },
                { value: "user", label: "User" },
                { value: "super admin", label: "Super Admin" },
                { value: "bot user", label: "Bot User" },
              ]}
            />
          </div>
          <div className="px-1 ">
            <Button className="add-icon" onClick={() => handleAdduser()}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
