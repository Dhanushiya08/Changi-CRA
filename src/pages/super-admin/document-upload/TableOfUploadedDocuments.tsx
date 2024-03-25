import { LoadingOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Checkbox,
  Popconfirm,
  Popover,
  Spin,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import {
  deleteSelectedFileApiCall,
  getFilesApiCall,
} from "../../../api/services/apiCallfunctions";
import { addUniqueKey } from "../../../utils/helperFunctions/addUniqueKey";
import { LOG } from "../../../utils/helperFunctions/logger";
import { useFileListRefetch } from "../../../zustand/useFileListRefetch";
import { sortByLatestDateTop } from "./../../../utils/helperFunctions/sortByLatestDate";
import { Column } from "./_tableTypes";

function TableOfUploadedDocuments() {
  const [fileDataList, setFileDataList] = useState([]);
  const mutation = useMutation({
    mutationFn: (formData) => getFilesApiCall(formData),
    onSuccess: (data) => {
      const updatedData: any = sortByLatestDateTop(
        addUniqueKey(data.data.body),
        "uploaded_datetime"
      );
      setFileDataList(updatedData);
    },
  });

  const confirm = async (records: any) => {
    const formData: any = new FormData();
    const result = await deleteSelectedFileApiCall(formData, records);
    console.log(result);
    if (result.data.statusCode == 200) {
      message.success("Deleted successfully");
      mutation.mutate(formData);
    } else {
      message.error(result.data.message);
    }
  };

  const cancel = (e: any) => {
    LOG(e);
    message.error("User was not deleted");
  };
  const refetchFileList = useFileListRefetch(
    (state: any) => state.fileListDataRefetch
  );
  useEffect(() => {
    const formData: any = new FormData();
    mutation.mutate(formData);
  }, [refetchFileList]);

  const content = (
    <div>
      <ul className=" [&>li]:text-[12px] [&>li]:text-bold">
        <li>
          Version 9.0 <Checkbox></Checkbox>
        </li>
        <li>
          Version 7.0 <Checkbox></Checkbox>
        </li>
      </ul>
    </div>
  );

  const columns: Column[] = [
    {
      title: "Document",
      dataIndex: "presigned_url",
      key: "document",
      render: (link) => (
        <a href={link} target="_blank" className="doc-link">
          <div className="flex items-center ">
            <BiDownload size={19} className="me-1" /> Download File
          </div>
        </a>
      ),
    },
    {
      title: "File Name",
      dataIndex: "document_name",
      key: "fileName",
      render: (fName) => (
        <Tooltip title={fName}>
          <Typography.Text ellipsis={true} className=" w-[200px]">
            {fName}
          </Typography.Text>
        </Tooltip>
      ),
    },
    // {
    //   title: "Size",
    //   dataIndex: "size",
    //   key: "size",
    // },
    {
      title: "Uploaded By",
      dataIndex: "uploaded_by",
      key: "uploadedBy",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      className: "!text-center",
      render: () => <>0.1</>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "!text-center",
      render: (_, records) => (
        <div className="flex justify-evenly">
          {/* <GoPlusCircle className="cursor-pointer" size={15} color="green" /> */}

          {/* <Popover
            placement="left"
            className="cursor-pointer"
            title={""}
            content={content}
          >
            <FiEdit size={16} color="#8280FF" />
          </Popover> */}
          <Popconfirm
            title="Are you sure?"
            description="Are you sure to delete this task?"
            icon={null} // Corrected: Provide null or undefined instead of ""
            onConfirm={() => confirm(records)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            className="cursor-pointer"
          >
            <FiTrash2 size={15} color="#FF4444" />
          </Popconfirm>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "!text-center",
      render: (status) => (
        <div className="py-1 flex items-center justify-center border-[1.3px] font-medium text-[13px] border-[#4AD991] bg-[#6dff6d38] text-[#4AD991]">
          {status !== "Completed" ? (
            <>
              {status}
              <Spin
                className="ps-2"
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 12, color: "green" }}
                    spin
                  />
                }
              />
            </>
          ) : (
            status
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* {JSON.stringify(fileDataList, null, 4)} */}

      <Table
        scroll={{ x: 600 }}
        loading={mutation.isPending}
        pagination={{
          defaultPageSize: 5,
          // showSizeChanger: true,
          // pageSizeOptions: ["10", "20", "30"],
        }}
        dataSource={fileDataList}
        columns={columns}
        className="doc-table"
      />
    </div>
  );
}

export default TableOfUploadedDocuments;
