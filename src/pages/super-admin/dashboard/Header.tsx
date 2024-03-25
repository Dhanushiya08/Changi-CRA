import { Col, Row } from "antd";
import "./dashboard.scss";

const Header = () => {
  // const onChange = () => {
  //    console.log(date, dateString);
  // };
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="flex justify-end">
            {/* <DatePicker onChange={onChange} picker="month" /> */}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Header;
