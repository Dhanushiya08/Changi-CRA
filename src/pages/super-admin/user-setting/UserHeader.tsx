import { Col, Row } from "antd";
import { useProfileStore } from "../../../zustand/useProfileStore";
import { LOCAL_IMAGE } from "../../../assets/images/ImagesJson";

function UserHeader() {
  const userProfileData = useProfileStore(
    (state: any) => state.userProfileData
  );
  return (
    <>
      {/* {JSON.stringify(getUserCookie())} */}
      <div className="bg-[#F4F4F4] py-10"></div>
      <div className="flex justify-center ">
        <img
          src={LOCAL_IMAGE.userIcon}
          // src="https://images01.nicepagecdn.com/c461c07a441a5d220e8feb1a/9c2f170f91135fe8828ea68b/fgggf.jpg"
          className=" w-32 rounded-[100%] bg-gray-900 mt-[-50px]"
        />
      </div>
      <div className=" text-center py-4">
        <h3>
          {userProfileData ? userProfileData.first_name : ""}{" "}
          {userProfileData ? userProfileData.last_name.toUpperCase( ) : ""}
        </h3>
        <small>{userProfileData ? userProfileData.email_id : ""}</small>
      </div>
      <div className="p-5">
        <Row className=" text-center">
          <Col span={12}>
            <div className="border-[1.6px]  border-grey me-3 p-3">
              <h3 className=" font-semibold">Storage Used</h3>
              <small>59.4MB / 4 TB</small>
            </div>
          </Col>
          <Col span={12}>
            <div className="border-[1.6px]  border-grey p-3">
              <h3 className=" font-semibold">Your Role</h3>
              <small>{userProfileData ? userProfileData.role_type : ""}</small>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserHeader;
