import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  message,
  type FormProps,
} from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { loginApiCall } from "../../../api/services/apiCallfunctions";
import { LOG } from "../../../utils/helperFunctions/logger";
import { objectToBase64 } from "../../../utils/helperFunctions/objectToBase64";
import { stringToBase64 } from "../../../utils/helperFunctions/stringToBase64";
import { loginForm } from "./_loginType";
import "./login.scss";

const Signin: React.FC = () => {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const onFinish: FormProps<loginForm>["onFinish"] = (values) => {
    LOG("Input Values Login-->", values);
    const pass = stringToBase64(String(values?.password));
    const login: any = {
      event_type: "login",
      email_id: values.email,
      pass_word: pass,
    };
    mutation.mutate(login);
  };
  const mutation = useMutation({
    mutationFn: (mutationData) => loginApiCall(mutationData),
    onSuccess: (data) => {
      if (data.data.message == "success") {
        setCookie("user", objectToBase64(data.data));
        window.location.href = "/dashboard";
      } else {
        message.error(data.data.message);
      }
    },
  });

  return (
    <>
      <Row className="w-full min-h-full">
        <Col span={24} className="py-2 px-12 flex items-center ">
          <div className=" flex flex-col w-full">
            <div className="signin-hearder py-1">Welcome Back!</div>
            <div className="signin-sub-hearder py-1">
              Enter Your email and password.
            </div>
            <div className="p-1 py-1">
              <Form
                layout="vertical"
                onFinish={onFinish}
                className="signin-form"
              >
                <Row>
                  <Col span={24}>
                    <Form.Item<loginForm>
                      label="*E-mail"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<loginForm>
                      label="*Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<loginForm>
                      name="remember"
                      valuePropName="checked"
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<loginForm>
                      name="forgotpassword"
                      className="flex flex-row-reverse"
                    >
                      <p className="underline underline-offset-1">
                        Forgot Password
                      </p>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="signin-button bg-violet"
                        disabled={mutation.isPending}
                        loading={mutation.isPending}
                      >
                        Sign In
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              {/* <Row>
                <Col span={24} className="flex justify-center">
                  <p>Or Sign In with</p>
                </Col>
              </Row> */}
              <br></br>
              {/* <Row>
                <Col span={24} className="flex justify-center">
                  <Button className="signin-button">
                    <span className="px-1">
                      <FaMicrosoft />
                    </span>{" "}
                    <span className="px-1"> Microsoft</span>
                  </Button>
                </Col>
              </Row> */}
              <br></br>
              {/* <Row>
                <Col span={24} className="flex justify-center">
                  <span>Don't have an account?</span>
                  <span className="underline underline-offset-1 sign-in-sign-up-link">
                    Sign Up
                  </span>
                </Col>
              </Row> */}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Signin;
