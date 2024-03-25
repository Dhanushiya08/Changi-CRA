import { Col, Row } from "antd";
import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MainNavbar from "../components/navbar/MainNavbar";

// Define type for props
type LayoutProp = {
  layoutIdentifier: string | null; // Ensure layoutIdentifier is of type PageType
  children?: ReactNode; // Ensure children prop is of type ReactNode
};

function LayoutWrapper({ layoutIdentifier, children }: LayoutProp) {
  switch (layoutIdentifier) {
    case "TWO_COLUMN":
      return (
        <Row>
          <Col lg={4} xs={24}>
            <Sidebar />
          </Col>
          <Col lg={20} xs={24}>
            <MainNavbar />
            <div className="lg:p-5">{children}</div>
          </Col>
        </Row>
      );
    default:
      return <div>{children}</div>;
  }
}

export default LayoutWrapper;
