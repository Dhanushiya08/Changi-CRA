import { Col, Row } from "antd";
import { LOCAL_IMAGE } from "../../../assets/images/ImagesJson";
import Signin from "./Signin";
const IndexOfSignin: React.FC = () => {
  return (
    <>
      <Row className="w-full ">
        <Col span={12} className="login-background">
          <div className="flex flex-row-reverse">
            <img
              src={LOCAL_IMAGE.loginimage}
              className="object-contain login-img "
            />
          </div>
        </Col>
        <Col span={12}>
          <Signin />
        </Col>
      </Row>
    </>
  );
};
export default IndexOfSignin;
