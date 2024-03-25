import { useMutation } from "@tanstack/react-query";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { HiUsers } from "react-icons/hi2";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { PiUserList } from "react-icons/pi";
import { apiCallManager } from "../../../api/services/apiCallfunctions";
import {
  calculatePercentageChange,
  capitalizeFirstLetter,
  numberFormatter,
} from "../../../utils/helperFunctions/numberFormatter";
import { TotalUser, UserBotData } from "./_dashboardTypes";
import "./dashboard.scss";
const BotuserChat: React.FC = () => {
  const [totalconvo, settotalconvo] = useState<TotalUser>({
    total_users: 0,
    active_users: 0,
    new_users_last_7_days: 0,
    query_total_last_7_days: 0,
  });
  const [myArray, setMyArray] = useState<UserBotData[]>([]);

  const chatmutation = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      settotalconvo(data.data);
    },
  });
  const mutation_top5 = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      setMyArray(data.data);
    },
  });
  useEffect(() => {
    const totalUserCount: any = {
      event_type: "user-list",
    };
    chatmutation.mutate(totalUserCount);
    const top5Count: any = {
      event_type: "top5-usercount",
    };
    mutation_top5.mutate(top5Count);
  }, []);
  return (
    <>
      <Row gutter={[8, 8]}>
        <div className="flex justify-between items-center w-full p-2">
          <div className="flex flex-row">
            <div className="px-1 pt-1">
              <PiUserList className="text-xl" />
            </div>
            <div className="text-xl font-bold px-1">Bot User Stats</div>
          </div>
        </div>
      </Row>
      <Row className="w-full" gutter={[16, 8]}>
        <Col span={8}>
          <div className="flex flex-col dashboard-card">
            <div className="flex flex-row p-2 px-2">
              <div className="px-2">
                <Button className="dashboard-user-button default ">
                  <HiUsers className="dashboard-user-icon" />
                </Button>
              </div>
              <div className="px-2 dashboard-user-name font-semibold">
                No.of Total Active Users
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 dashboard-user-secondary-value-gray">
                Today
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 font-bold dashboard-user-value">
                {numberFormatter(totalconvo.total_users)}
              </div>
              <div className="px-2 p-3">
                <div
                  className={`dashboard-user-button-icon ${
                    calculatePercentageChange(
                      totalconvo.total_users,
                      totalconvo.query_total_last_7_days
                    ) < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="px-1">
                      {calculatePercentageChange(
                        totalconvo.total_users,
                        totalconvo.query_total_last_7_days
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
                          totalconvo.total_users,
                          totalconvo.query_total_last_7_days
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
                {numberFormatter(totalconvo.query_total_last_7_days)}
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
                No.of New Users
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 dashboard-user-secondary-value-gray">
                Today
              </div>
            </div>
            <div className="flex flex-row  px-2">
              <div className="px-2 font-bold dashboard-user-value ">
                {numberFormatter(totalconvo.active_users)}
              </div>
              <div className="px-2 p-3">
                <div
                  className={`dashboard-user-button-icon ${
                    calculatePercentageChange(
                      totalconvo.active_users,
                      totalconvo.new_users_last_7_days
                    ) < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="px-1">
                      {calculatePercentageChange(
                        totalconvo.active_users,
                        totalconvo.new_users_last_7_days
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
                          totalconvo.active_users,
                          totalconvo.new_users_last_7_days
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
                {numberFormatter(totalconvo.new_users_last_7_days)}
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
                Top 5 Users
              </div>
            </div>
            <div className="user-data-table py-1">
              {myArray.length > 0 &&
                myArray.map((userData, index) => (
                  <div key={userData.user_id}>
                    <Row>
                      <Col span={8} className="user-data-id ">
                        {index + 1}
                      </Col>
                      <Col span={10} className="user-data-name ">
                        {capitalizeFirstLetter(userData.first_name)}
                      </Col>
                      <Col span={6} className="user-data user-data-chat">
                        {userData.answer_count}
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
export default BotuserChat;
