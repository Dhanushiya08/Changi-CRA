import { Col, Row } from "antd";
import Header from "./Header";
import DashboardChat from "./DashboardChat";
import BotuserChat from "./BotuserChat";
import KnowledgeChat from "./KnowledgeChats";

const IndexOfDashboard: React.FC = () => {
  return (
    <>
      <Row className="w-full  min-h-full" gutter={[8, 8]}>
        <Col span={24}>
          <Header />
        </Col>
        <Col span={24}>
          <DashboardChat />
        </Col>
        <Col span={24}>
          <BotuserChat />
        </Col>
        <Col span={24}>
          <KnowledgeChat />
        </Col>
      </Row>
    </>
  );
};
export default IndexOfDashboard;
