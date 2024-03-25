import { useMutation } from "@tanstack/react-query";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { BiQuestionMark } from "react-icons/bi";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { HiUsers } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { apiCallManager } from "../../../api/services/apiCallfunctions";
import {
  calculatePercentageChange,
  numberFormatter,
} from "../../../utils/helperFunctions/numberFormatter";
import { TotalConvo } from "./_dashboardTypes";
import "./dashboard.scss";
const DashboardChat: React.FC = () => {
  // const [totalconvo, settotalconvo] = useState<number>(0);
  const [totalconvo, settotalconvo] = useState<TotalConvo>({
    convo: 0,
    number_ques_ans: 0,
    number_ques_unans: 0,
    last7days_convo: 0,
    last7days_ans: 0,
    last7days_unans: 0,
  });
  const mutation = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      settotalconvo(data.data);
    },
  });

  useEffect(() => {
    const totalUserCount: any = {
      event_type: "conversation-list",
    };
    mutation.mutate(totalUserCount);
  }, []);
  return (
    <>
      <Row gutter={[8, 8]}>
        <div className="flex justify-between items-center w-full p-2">
          <div className="flex flex-row">
            <div className="px-1 pt-1">
              <IoChatbubbleEllipsesOutline className="text-xl" />
            </div>
            <div className="text-xl font-bold px-1">Chat Stats</div>
          </div>
        </div>
      </Row>
      <Row className="w-full" gutter={[16, 8]}>
        <Col span={8}>
          <div className="flex flex-col dashboard-card">
            <div className="flex flex-row p-2 px-2">
              <div className="px-2">
                <Button className="dashboard-user-button default">
                  <HiUsers className="dashboard-user-icon" />
                </Button>
              </div>
              <div className="px-2 dashboard-user-name font-semibold">
                No.of Conversation
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 dashboard-user-secondary-value-gray">
                Today
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 font-bold dashboard-user-value">
                {numberFormatter(totalconvo.convo)}
              </div>
              <div className="px-2 p-3">
                <div
                  className={`dashboard-user-button-icon ${
                    calculatePercentageChange(
                      totalconvo.convo,
                      totalconvo.last7days_convo
                    ) < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="px-1">
                      {calculatePercentageChange(
                        totalconvo.convo,
                        totalconvo.last7days_convo
                      ) < 0 ? (
                        <BsGraphDownArrow />
                      ) : (
                        <BsGraphUpArrow />
                      )}
                    </div>
                    <div className="px-1">
                      {" "}
                      {Math.abs(
                        calculatePercentageChange(
                          totalconvo.convo,
                          totalconvo.last7days_convo
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
                {numberFormatter(totalconvo.last7days_convo)}
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
                No.of Questions Answerd
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 dashboard-user-secondary-value-gray">
                Today
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 font-bold dashboard-user-value ">
                {numberFormatter(totalconvo.number_ques_ans)}
              </div>
              <div className="px-2 p-3">
                <div
                  className={`dashboard-user-button-icon ${
                    calculatePercentageChange(
                      totalconvo.number_ques_ans,
                      totalconvo.last7days_ans
                    ) < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="px-1">
                      {calculatePercentageChange(
                        totalconvo.number_ques_ans,
                        totalconvo.last7days_ans
                      ) < 0 ? (
                        <BsGraphDownArrow />
                      ) : (
                        <BsGraphUpArrow />
                      )}
                    </div>
                    <div className="px-1">
                      {" "}
                      {Math.abs(
                        calculatePercentageChange(
                          totalconvo.number_ques_ans,
                          totalconvo.last7days_ans
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
                {numberFormatter(totalconvo.last7days_ans)}
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="flex flex-col dashboard-card">
            <div className="flex flex-row p-2 px-2">
              <div className="px-2">
                <Button className="dashboard-user-button warning">
                  <BiQuestionMark className="dashboard-user-icon" />
                </Button>
              </div>
              <div className="px-2 dashboard-user-name font-semibold">
                No.of Questions Unanswerd
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 dashboard-user-secondary-value-gray">
                Today
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 font-bold dashboard-user-value ">
                {numberFormatter(totalconvo.number_ques_unans)}
              </div>
              <div className="px-2 p-3">
                <div
                  className={`dashboard-user-button-icon ${
                    calculatePercentageChange(
                      totalconvo.number_ques_unans,
                      totalconvo.last7days_unans
                    ) < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  <div className="flex flex-row px-1">
                    <div className="px-1">
                      {calculatePercentageChange(
                        totalconvo.number_ques_unans,
                        totalconvo.last7days_unans
                      ) < 0 ? (
                        <BsGraphDownArrow />
                      ) : (
                        <BsGraphUpArrow />
                      )}
                    </div>
                    <div className="px-1">
                      {" "}
                      {Math.abs(
                        calculatePercentageChange(
                          totalconvo.number_ques_unans,
                          totalconvo.last7days_unans
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
                {numberFormatter(totalconvo.last7days_unans)}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default DashboardChat;
