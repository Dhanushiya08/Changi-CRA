import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import React, { useEffect } from "react";
import { apiCallManager } from "../../../api/services/apiCallfunctions";
import { getUserCookie } from "../../../utils/helperFunctions/getCookie";
import { UserManagementTypes } from "./_userManage";
import "./usermanage.scss";
import { useUserManagementUserListStore } from "../../../zustand/useUserManagementUserListStore";
interface HeaderProps {
  updatestatus: boolean;
  isModalOpen: boolean;
  update: boolean;
  oldrecord: UserManagementTypes | null;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Adduser = ({
  oldrecord,
  updatestatus,
  setUpdate,
  isModalOpen,
  setIsModalOpen,
  update,
}: HeaderProps) => {
  const [form] = Form.useForm();
  const { email_id } = getUserCookie();
  const mutation = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: () => {
      setUpdate(!update);
      setIsModalOpen(!isModalOpen);
      message.success("User Added");
    },
  });
  const mutation_update = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: () => {
      setUpdate(!update);
      setIsModalOpen(!isModalOpen);
      message.success("User Updated");
    },
  });
  //zustand state
  const userListData = useUserManagementUserListStore(
    (state: any) => state.userListData
  );

  const onFinish = (values: any) => {
    const hasDuplicateEmail: boolean = userListData?.some(
      (item: any) =>
        item.email_id.toLowerCase().trim() ===
        values.email_id.toLowerCase().trim()
    );
    if (!updatestatus && hasDuplicateEmail) {
      message.error(
        "This email ID is already exists. Please try a different one."
      );
    } else {
      if (updatestatus) {
        const updateUserData: any = {
          event_type: "update_users",
          id_value: oldrecord && oldrecord.id,
          first_name: values.first_name,
          last_name: values.last_name,
          email_id: values.email_id,
          role_type: values.role_type,
          created_by: email_id,
          mobile_number: values.mobile_number,
          user_type: "admin",
          updated_by: "",
          active_status: "",
        };
        mutation_update.mutate(updateUserData);
      } else {
        const addUserData: any = {
          event_type: "add_users",
          first_name: values.first_name,
          last_name: values.last_name,
          email_id: values.email_id,
          role_type: values.role_type,
          created_by: email_id,
          mobile_number: values.mobile_number,
        };
        mutation.mutate(addUserData);
      }
    }
  };

  useEffect(() => {
    var records = {
      id: "",
      email_id: "",
      first_name: "",
      last_name: "",
      role_type: "",
      mobile_number: "",
    };
    if (updatestatus && oldrecord) {
      records = {
        id: oldrecord.id,
        email_id: oldrecord.email_id,
        first_name: oldrecord.first_name,
        last_name: oldrecord.last_name,
        role_type: oldrecord.role_type,
        mobile_number: oldrecord.mobile_number,
      };
    }
    form.setFieldsValue(records);
  }, [oldrecord]);
  return (
    <>
      {/* {JSON.stringify(userListData, null, 4)} */}
      <hr></hr>
      <br />
      <Form
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item name="first_name" label="First name">
              <Input placeholder="Enter your first name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="last_name" label="Last name">
              <Input placeholder="Enter your last name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="email_id" label="Email ID">
              <Input placeholder="Enter your email id" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="mobile_number" label="Phone No.">
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="role_type" label="Access">
              <Select
                placeholder="Select a Access"
                options={[
                  { value: "user", label: "User" },
                  { value: "super admin", label: "Super Admin" },
                  { value: "bot user", label: "Bot User" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="flex flex-row-reverse">
            <Form.Item>
              <Button className="add-user-icon" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button className="add-cancel-icon"> Cancel</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default Adduser;
