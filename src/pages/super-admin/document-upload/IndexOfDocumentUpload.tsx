import { Col, Row } from "antd";
import Header from "./Header";
import "./documentUpload.scss";
import TableOfUploadedDocuments from "./TableOfUploadedDocuments";
function IndexOfDocumentUpload() {
  return (
    <div className="documentUpload lg:p-5">
      <Header />
      <div className="py-4"></div>
      <Row>
        <Col lg={24}>
          <div className=" border-[1.6px] p-3 border-grey">
            <TableOfUploadedDocuments />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default IndexOfDocumentUpload;
