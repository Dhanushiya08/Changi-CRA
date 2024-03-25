import { useMutation } from "@tanstack/react-query";
import type { TableProps } from "antd";
import { Col, Popover, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { RiQuestionnaireFill } from "react-icons/ri";
import { SiAnswer } from "react-icons/si";
import { apiCallManager } from "../../../api/services/apiCallfunctions";
import { getUserCookie } from "../../../utils/helperFunctions/getCookie";
import { formatDate } from "../../../utils/helperFunctions/numberFormatter";
import "../user-manage/usermanage.scss";
import Header from "./Header";
import { chatType, userType } from "./_chatType";
import "./chathistory.scss";

const IndexOfHistory: React.FC = () => {
  const { email_id } = getUserCookie();
  const [count, setCount] = useState<number>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tabledata, settabledata] = useState<chatType[]>([]);
  const [userdata, setuserdata] = useState<userType[]>([]);
  const [searchQuery, setSearchQuery] = useState(email_id);
  // const handleEdit = (record: chatType) => {
  // };
  // const cancel = () => {};
  // const delconfirm = (record: any) => {
  //   console.log(record);
  //   message.success("Deleted");
  // };

  const columns: TableProps<chatType>["columns"] = [
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (created_at: any) => formatDate(created_at),
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      key: "mobile_number",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email_id",
      key: "email_id",
      align: "center",
    },
    {
      title: "Question",
      key: "question",
      dataIndex: "question",
      align: "start",
      render: (question) => {
        const truncatedSummary =
          question?.length > 4 ? question.slice(0, 5) + "..." : question;
        return (
          <>
            {question && (
              <div className="history-popup">
                <Popover
                  placement="top"
                  className="history-popup"
                  content={question}
                  title=""
                >
                  <div className="flex justify-start ">
                    <div className="flex items-center px-1 qus-icon">
                      {" "}
                      <RiQuestionnaireFill />
                    </div>
                    <div>{truncatedSummary}</div>
                  </div>
                </Popover>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Answer",
      key: "answer",
      dataIndex: "answer",
      align: "center",
      render: (answer) => {
        const truncatedSummary =
          answer?.length > 4 ? answer.slice(0, 5) + "..." : answer;
        return (
          <>
            {answer && (
              <div className="history-popup">
                <Popover className="history-popup" title="" content={answer}>
                  <div className="flex justify-start">
                    <div className="flex items-center px-1 ans-icon">
                      {" "}
                      <SiAnswer />
                    </div>
                    <div>{truncatedSummary}</div>
                  </div>
                </Popover>
              </div>
            )}
          </>
        );
      },
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   align: "center",
    //   render: (record) => (
    //     <>
    //       <div className="flex justify-center">
    //         {/* <div className="reset-add">
    //           <IoIosAddCircleOutline />
    //         </div> */}
    //         {/* <div className="reset-edit">
    //           <FiEdit />
    //         </div>{" "} */}
    //         <div className="reset-delete">
    //           <Popconfirm
    //             title="Delete the User"
    //             description="Are you sure to delete this User?"
    //             onConfirm={() => delconfirm(record)}
    //             onCancel={cancel}
    //             okText="Yes"
    //             cancelText="No"
    //           >
    //             {" "}
    //             <RiDeleteBin6Line />
    //           </Popconfirm>
    //         </div>
    //       </div>
    //     </>
    //   ),
    // },
  ];
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const getpagenumber = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      setCount(data.data[0].page_count);
    },
  });
  const getuser = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      console.log(data);
      setuserdata(data.data);
    },
  });
  const gethistory = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      settabledata(data.data);
    },
  });
  useEffect(() => {
    const totalbaseCount: any = {
      event_type: "total_history_pageno",
      email_id: searchQuery ? searchQuery : email_id,
    };
    getpagenumber.mutate(totalbaseCount);
  }, [searchQuery]);
  useEffect(() => {
    const totalbaseCount: any = {
      event_type: "emailid_list",
    };
    getuser.mutate(totalbaseCount);
  }, []);
  useEffect(() => {
    const totallist: any = {
      event_type: "history_list",
      email_id: searchQuery ? searchQuery : email_id,
      page: currentPage,
      limit: pageSize,
    };
    gethistory.mutate(totallist);
  }, [currentPage, pageSize, searchQuery]);
  return (
    <>
      <Row className="w-full  min-h-full">
        <Col span={24}>
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            userdata={userdata}
          />
        </Col>
        <Col span={24} className="px-3">
          <div className="border-2 border-[#D9D9D9] p-3 ">
            <Table
              columns={columns}
              dataSource={tabledata}
              className="user-manage-table"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: count,
                onChange: handlePageChange,
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default IndexOfHistory;
