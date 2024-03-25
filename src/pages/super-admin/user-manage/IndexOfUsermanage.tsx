import { useMutation } from "@tanstack/react-query";
import type { TableProps } from "antd";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { apiCallManager } from "../../../api/services/apiCallfunctions";
import { addUniqueKey } from "../../../utils/helperFunctions/addUniqueKey";
import { getUserCookie } from "../../../utils/helperFunctions/getCookie";
import { safeStringChecker } from "../../../utils/helperFunctions/safeStringChecker";
import { sortByLatestDateTop } from "../../../utils/helperFunctions/sortByLatestDate";
import { stringToBase64 } from "../../../utils/helperFunctions/stringToBase64";
import { useUserManagementUserListStore } from "../../../zustand/useUserManagementUserListStore";
import Adduser from "./Adduser";
import Header from "./Header";
import { UserManagementTypes, Userrole } from "./_userManage";
import "./usermanage.scss";
import { toPascalCase } from "../../../utils/helperFunctions/numberFormatter";
const IndexOfUsermanage: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ispwdModalOpen, setPwdIsModalOpen] = useState(false);
  const { role_type } = getUserCookie();
  const [tablerecord, settablerecord] = useState<UserManagementTypes[]>([]);
  const [oldrecord, setoldrecord] = useState<UserManagementTypes | null>(null);
  const [user, setUser] = useState<Userrole>({ role: "all" });
  const [updatestatus, setUpdatestatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const setUserListDataZustand = useUserManagementUserListStore(
    (state: any) => state.setUserListData
  );
  const handleEdit = (record: any) => {
    const isAdmin = role_type === "super admin";
    if (isAdmin) {
      setoldrecord(record);
      setIsModalOpen(true);
      setUpdatestatus(true);
    } else {
      message.warning("User is unable to edit the details.");
    }
  };
  const confirm = (record: any) => {
    const isAdmin = role_type === "super admin";
    if (isAdmin) {
      const deleteUserlist: any = {
        event_type: "delete_users",
        id_value: record.id,
        email_id: record.email_id,
        mobile_number: "",
        user_type: "admin",
      };
      mutation_delete_user.mutate(deleteUserlist);
    } else {
      message.warning("User is unable to delete the users.");
    }
  };
  const cancel = () => {};

  const handleReset = (record: any) => {
    const isAdmin = role_type === "super admin";
    if (isAdmin) {
      setoldrecord(record);
      setPwdIsModalOpen(true);
    } else {
      message.warning("User is unable to modify the password.");
    }
  };
  const columns: TableProps<UserManagementTypes>["columns"] = [
    {
      title: "User Type",
      dataIndex: "role_type",
      key: "role_type",
      align: "center",
      // render: (text) => <a>{text}</a>,
      render: (role_type) => safeStringChecker(role_type, "Bot User"),
    },
    {
      title: "Email Id",
      dataIndex: "email_id",
      key: "email_id",
      align: "center",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      align: "center",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      align: "center",
    },
    {
      title: "Mobile No.",
      key: "mobile_number",
      dataIndex: "mobile_number",
      align: "center",
      render: (mobileNumber) => safeStringChecker(mobileNumber, "-"),
    },
    {
      title: "Password",
      key: "pass_word",
      dataIndex: "pass_word",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div className="flex  justify-around">
              <div>******</div>
              <div className="reset-edit">
                <TbRefresh
                  className="reset-button"
                  onClick={() => handleReset(record)}
                />
              </div>
            </div>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        const isAdmin = role_type === "super admin";
        return (
          <>
            <div className="flex justify-center">
              <div className="reset-edit">
                <FiEdit
                  onClick={() => handleEdit(record)}
                  // onClick={isAdmin ? () => handleEdit(record) : undefined}
                />
              </div>
              <div className="reset-delete">
                <Popconfirm
                  title="Delete the User"
                  description="Are you sure to delete this User?"
                  onConfirm={() => confirm(record)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <RiDeleteBin6Line onClick={isAdmin ? () => {} : undefined} />
                </Popconfirm>
              </div>
            </div>
          </>
        );
      },
    },
  ];
  const handleCancel = () => {
    setIsModalOpen(false);
    setPwdIsModalOpen(false);
  };
  const mutation_list_user = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      if (data.data.length > 0) {
        // Adding unique keys to the array
        const dataArrayWithKeys = sortByLatestDateTop(
          addUniqueKey(data.data),
          "updated_on"
        );
        // console.log("---->",dataArrayWithKeys)
        setUserListDataZustand(dataArrayWithKeys);
        settablerecord(dataArrayWithKeys);
      }
    },
  });
  const mutation_delete_user = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: () => {
      message.success("User Deleted");
      setUpdate(!update);
    },
  });
  const mutation_password_reset = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: () => {
      message.success("Password is updated");
    },
  });
  const onfinish = (value: any) => {
    const pass = stringToBase64(String(value?.password));
    form.resetFields();
    setPwdIsModalOpen(false);
    const resetpaswrd: any = {
      event_type: "reset_password",
      id_value: oldrecord && oldrecord.id,
      new_pwd: pass,
      email_id: oldrecord && oldrecord.email_id,
    };
    mutation_password_reset.mutate(resetpaswrd);
  };
  useEffect(() => {
    const totalUserlist: any = {
      event_type: "list_users",
      role_type: user.role,
    };
    mutation_list_user.mutate(totalUserlist);
  }, [update, user]);

  return (
    <>
      <Row className="w-full  min-h-full">
        <Col span={24}>
          <Header
            setIsModalOpen={setIsModalOpen}
            setUpdatestatus={setUpdatestatus}
            setoldrecord={setoldrecord}
            setUser={setUser}
          />
        </Col>
        <Col span={24} className="px-3">
          <div className="border-2 border-[#D9D9D9] p-3 ">
            <Table
              columns={columns}
              loading={mutation_list_user.isPending}
              dataSource={tablerecord}
              className="user-manage-table"
              pagination={{ pageSize: 5 }}
            />
          </div>
        </Col>
      </Row>
      <Modal
        title="Add Super Admin"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        className="admin-add-form"
      >
        <Adduser
          oldrecord={oldrecord}
          updatestatus={updatestatus}
          update={update}
          setUpdate={setUpdate}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </Modal>
      <Modal
        title="Reset your password"
        open={ispwdModalOpen}
        footer={false}
        onCancel={handleCancel}
        className="admin-add-form"
      >
        <Form
          layout="vertical"
          onFinish={onfinish}
          form={form}
          className="reset-password-form"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12} className="flex justify-between">
              <Form.Item>
                <Button htmlType="submit">Cancel</Button>
              </Form.Item>{" "}
            </Col>
            <Col span={12} className="flex flex-row-reverse">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Confirm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default IndexOfUsermanage;
