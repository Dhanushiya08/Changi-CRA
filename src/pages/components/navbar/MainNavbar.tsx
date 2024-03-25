import type { MenuProps } from "antd";
import { Col, Dropdown, Row } from "antd";
import React from "react";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { LOCAL_IMAGE } from "../../../assets/images/ImagesJson";
import {
  getUserCookie,
  removeUserCookie,
} from "../../../utils/helperFunctions/getCookie";
import { LOG } from "../../../utils/helperFunctions/logger";
import { toPascalCase } from "../../../utils/helperFunctions/numberFormatter";
import { capitalizeFirstLetter } from "../../../utils/helperFunctions/numberFormatter";
import "./navbar.scss";

const MainNavbar: React.FC = () => {
  const { role_type } = getUserCookie();
  const { first_name } = getUserCookie();
  const { last_name } = getUserCookie();
  const { jwt_token } = getUserCookie();
  LOG(jwt_token);
  const navigate = useNavigate();
  const logout = () => {
    removeUserCookie("user");
    navigate("/sign-in");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p>
          {capitalizeFirstLetter(first_name)}
          {"  "}
          {last_name.toUpperCase()}
        </p>
      ),
    },
    {
      key: "2",
      label: <a onClick={() => logout()}>Logout</a>,
    },
  ];

  return (
    <>
      {" "}
      <Row>
        <Col span={24}>
          <div className=" bg-navbar   navbar-bg flex justify-end items-center w-full h-16">
            <div className="flex flex-row pe-4">
              <div className="items-center px-2 py-8 pt-7">
                <img src={LOCAL_IMAGE.userIcon} className="h-8 w-8" />
              </div>
              <div className="items-center py-8 pt-7">
                <div className="text-sm font-semibold">
                  {capitalizeFirstLetter(first_name)}
                </div>
                <div className="text-xs">{toPascalCase(role_type)}</div>
              </div>
              <div className="flex items-center px-2">
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <TfiArrowCircleDown className="text-xl" />
                </Dropdown>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default MainNavbar;
