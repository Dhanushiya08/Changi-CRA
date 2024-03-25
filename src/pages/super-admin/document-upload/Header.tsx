import { Select } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadModal from "./UploadModal";
import { useState } from "react";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const kb = [
    {
      value: "1",
      label: "Not Identified",
    },
    {
      value: "2",
      label: "Closed",
    },
    {
      value: "3",
      label: "Communicated",
    },
    {
      value: "4",
      label: "Identified",
    },
    {
      value: "5",
      label: "Resolved",
    },
    {
      value: "6",
      label: "Cancelled",
    },
  ];
  return (
    <>
      <UploadModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="flex items-center">
        <div className="flex items-center">
          <IoCloudUploadOutline className="me-1" size={21} />
          <span className=" font-bold text-[18px]">Document Upload</span>
        </div>
        <div className="ms-auto">
          <div className="flex items-center ">
            <button
              onClick={showModal}
              className="py-2 mx-2 flex items-center justify-center  w-[105px] border-[1.5px] font-medium text-[13px] border-[#8280FF] text-[#8280FF]"
            >
              Upload
              <IoCloudUploadOutline className="ms-1" size={12} />
            </button>
            {/* <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Knowledge base"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={kb}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
