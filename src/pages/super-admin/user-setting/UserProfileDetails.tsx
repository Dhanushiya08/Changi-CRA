import { useMutation } from "@tanstack/react-query";
import { Col, Row, message } from "antd";
import { useState } from "react";
import { apiCallManager } from "../../../api/services/apiCallfunctions";
import { LOCAL_IMAGE } from "../../../assets/images/ImagesJson";
import { useProfileStore } from "../../../zustand/useProfileStore";
import UpdateUserProfile from "./UpdateUserProfile";

function UserProfileDetails() {
  const userProfileData = useProfileStore(
    (state: any) => state.userProfileData
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Update");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const mutation_update = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: () => {
      message.success("Updated Successfully!");
    },
  });
  const updateUserData: any = {
    event_type: "update_users",
    id_value: " oldrecord && oldrecord.id",
    first_name: " values.first_name",
    last_name: " values.last_name",
    email_id: " values.email_id",
    role_type: " values.role_type",
    created_by: " email_id",
    mobile_number: " values.mobile_number",
    user_type: "admin",
    updated_by: "",
    active_status: "",
  };
  // mutation_update.mutate(updateUserData);
  const onEdit = (title: any) => {
    setIsModalOpen(true);
    if (title == "name") {
      setModalTitle("Edit Your Name");
    }
    if (title == "email") {
      setModalTitle("Edit Your Email");
    }
    if (title == "password") {
      setModalTitle("Change Your Password");
    }
  };
  const renderProfile = [
    {
      title: "Name",
      titleData: userProfileData
        ? userProfileData.first_name
        : "" + " " + userProfileData
        ? userProfileData.last_name
        : "",
      action: (
        <u onClick={() => onEdit("name")} role="button">
          Edit
        </u>
      ),
    },
    {
      title: "Email",
      titleData: userProfileData ? userProfileData.email_id : "",
      action: (
        <u onClick={() => onEdit("email")} role="button">
          Edit
        </u>
      ),
    },
    {
      title: "Password",
      titleData: userProfileData.pass_word ? "******" : "",
      action: (
        <u onClick={() => onEdit("password")} role="button">
          Change Password
        </u>
      ),
    },
    {
      title: "Account",
      titleData: "Delete your account",
      action: <u className="text-red-500">Delete Account</u>,
    },
  ];

  return (
    <div>
      <hr></hr>

      {/* {JSON.stringify(getUserCookie())} */}
      <UpdateUserProfile
        // isModalOpen={isModalOpen}
        // showModal={showModal}
        // handleCancel={handleCancel}
        // modalTitle={modalTitle}
      />

      <div className=" px-24  py-5">
        {renderProfile?.map((item) => (
          <Row className="my-5">
            <Col span={6}>{item.title}</Col>
            <Col span={12}>
              <span className=" font-medium">{item.titleData}</span>
            </Col>
            <Col span={6} className=" text-end">
              {item.action}
            </Col>
          </Row>
        ))}
      </div>
      <hr></hr>
      <div className="flex justify-center mt-[-29px]">
        <div className="bg-white p-5 object-cover">
          <img src={LOCAL_IMAGE.logo_dark} />
        </div>
      </div>

      <div className="pb-1"></div>
    </div>
  );
}

export default UserProfileDetails;
