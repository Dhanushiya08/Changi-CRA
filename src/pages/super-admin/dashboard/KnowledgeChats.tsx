import { useMutation } from "@tanstack/react-query";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { LiaChartBarSolid } from "react-icons/lia";
import { TbBulb } from "react-icons/tb";
import { apiCallManager } from "../../../api/services/apiCallfunctions";
import {
  calculatePercentageChange,
  numberFormatter,
  capitalizeFirstLetter,
} from "../../../utils/helperFunctions/numberFormatter";
import { UserKnowledgeData, TotalKB } from "./_dashboardTypes";
const KnowledgeChat: React.FC = () => {
  const [totalknowlegebase, settotalknowlegebase] = useState<TotalKB>({
    number_kb: 0,
    new_kb: 0,
    new_knowledge_base7: 0,
    total_knowledge_7: 0,
  });
  const [myArray, setMyArray] = useState<UserKnowledgeData[]>([]);
  const knowledgebasemutation = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      settotalknowlegebase(data.data);
    },
  });
  const mutation_top5 = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      setMyArray(data.data);
    },
  });
  useEffect(() => {
    const totalbaseCount: any = {
      event_type: "knowledgebase-list",
    };
    knowledgebasemutation.mutate(totalbaseCount);
    const top5Count: any = {
      event_type: "top5-knowledge_base",
    };
    mutation_top5.mutate(top5Count);
  }, []);
  return (
    <>
      <Row gutter={[8, 8]}>
        <div className="flex justify-between items-center w-full p-2">
          <div className="flex flex-row">
            <div className="px-1 pt-1">
              <LiaChartBarSolid className="text-xl" />
            </div>
            <div className="text-xl font-bold px-1">
              Knowlege Based Documents Stats
            </div>
          </div>
        </div>
      </Row>
      <Row className="w-full" gutter={[16, 8]}>
        <Col span={8}>
          <div className="flex flex-col dashboard-card">
            <div className="flex flex-row p-2 px-2">
              <div className="px-2">
                <Button className="dashboard-user-button default ">
                  <TbBulb className="dashboard-user-icon" />
                </Button>
              </div>
              <div className="px-2 dashboard-user-name font-semibold">
                No.of Knowledge Base
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 dashboard-user-secondary-value-gray">
                Today
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 font-bold dashboard-user-value">
                {numberFormatter(totalknowlegebase.number_kb)}
              </div>
              <div className="px-2 p-3">
                <div
                  className={`dashboard-user-button-icon ${
                    calculatePercentageChange(
                      totalknowlegebase.number_kb,
                      totalknowlegebase.total_knowledge_7
                    ) < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="px-1">
                      {calculatePercentageChange(
                        totalknowlegebase.number_kb,
                        totalknowlegebase.total_knowledge_7
                      ) < 0 ? (
                        <BsGraphDownArrow />
                      ) : (
                        <BsGraphUpArrow />
                      )}
                    </div>
                    <div className="px-1">
                      {Math.abs(
                        calculatePercentageChange(
                          totalknowlegebase.number_kb,
                          totalknowlegebase.total_knowledge_7
                        )
                      )}
                      {""}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row  p-1 px-2">
              <div className="px-2 dashboard-user-secondary">Last 7 days</div>
              <div className="px-2 dashboard-user-secondary">|</div>
              <div className="px-2 dashboard-user-secondary-value">
                {numberFormatter(totalknowlegebase.total_knowledge_7)}
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="flex flex-col dashboard-card">
            <div className="flex flex-row p-2 px-2">
              <div className="px-2">
                <Button className="dashboard-user-button positive">
                  <GoGraph className="dashboard-user-icon" />
                </Button>
              </div>
              <div className="px-2 dashboard-user-name font-semibold">
                No.of New Knowledge Base
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 dashboard-user-secondary-value-gray">
                Today
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 font-bold dashboard-user-value ">
                {numberFormatter(totalknowlegebase.new_kb)}
              </div>
              <div className="px-2 p-3">
                <div
                  className={`dashboard-user-button-icon ${
                    calculatePercentageChange(
                      totalknowlegebase.new_kb,
                      totalknowlegebase.new_knowledge_base7
                    ) < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="px-1">
                      <BsGraphDownArrow />
                    </div>
                    <div className="px-1">
                      {Math.abs(
                        calculatePercentageChange(
                          totalknowlegebase.new_kb,
                          totalknowlegebase.new_knowledge_base7
                        )
                      )}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row  p-1 px-2">
              <div className="px-2 dashboard-user-secondary">Last 7 days</div>
              <div className="px-2 dashboard-user-secondary">|</div>
              <div className="px-2 dashboard-user-secondary-value">
                {numberFormatter(totalknowlegebase.new_knowledge_base7)}
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="flex flex-col dashboard-card max-h-full">
            <div className="flex flex-row p-2 px-2">
              <div className="px-2">
                <Button className="dashboard-user-button warning">
                  <IoArrowUpCircleOutline className="dashboard-user-icon" />
                </Button>
              </div>
              <div className="px-2 dashboard-user-name font-semibold">
                Top 5 Knowledge Base
              </div>
            </div>
            <div className="user-data-table py-1">
              {myArray.length > 0 &&
                myArray.map((userData, index) => (
                  <div key={index}>
                    <Row>
                      <Col span={8} className="user-data-id ">
                        {index + 1}
                      </Col>
                      <Col span={10} className="user-data-name ">
                        {capitalizeFirstLetter(userData.knowledge_base)}
                      </Col>
                      <Col span={6} className="user-data user-data-chat">
                        {userData.kb}
                      </Col>
                    </Row>
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default KnowledgeChat;
