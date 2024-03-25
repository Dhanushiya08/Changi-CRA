import { Select } from "antd";
import { RiRobot2Line } from "react-icons/ri";
import "../user-manage/usermanage.scss";
import { userType } from "./_chatType";
import "./chathistory.scss";
interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  userdata: userType[];
}
const Header = ({ searchQuery, setSearchQuery, userdata }: HeaderProps) => {
  const handleChange = (searchQuery: any) => {
    setSearchQuery(searchQuery);
  };
  const options = userdata.map((user) => ({
    value: user.email_id,
    label: user.email_id,
  }));
  return (
    <>
      <div className="flex justify-between items-center w-full p-2">
        <div className="flex flex-row">
          <div className="px-1 pt-1">
            <RiRobot2Line className="text-xl" />
          </div>
          <div className="text-xl font-bold px-1">ChatBot History</div>
        </div>
        <div className="flex flex-row-reverse  justify-around">
          <div className="px-2 chat-search-input ">
            <Select
              className="search-select"
              placeholder="Search by user email"
              value={searchQuery}
              onChange={handleChange}
              options={options}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
