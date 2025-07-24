import React from "react";
import logo from "@/assets/main-logo.svg";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FacebookFilled } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import useAuthStore from "@/store/zustand/useAuthStore";

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const setCredential = useAuthStore((state: any) => state.setCredential);

  return (
    <div className="p-6 min-h-[100vh] content-center bg-gray-950">
      <div className="flex max-w-[1000px] border mx-auto justify-between rounded-xl overflow-hidden max-sm:flex-col">
        <div className="w-[50%] bg-blue-950 flex sm:flex-col items-center justify-between sm:justify-center gap-3 sm:p-6 px-6 py-2 max-sm:w-[100%] max-sm:bg-gray-800 ">
          <Link to={"/"}>
            <img src={logo} alt="logoImg" />
          </Link>
          <p className="text-center text-[22px] text-white max-sm:hidden">
            Welcome back to
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-[36px] text-white text-center cursor-pointer"
          >
            Movies
          </button>
        </div>

        <div className="w-[50%] max-sm:w-[100%] bg-gray-800 sm:p-6 px-6 py-3">
          <h2 className="text-white text-[30px] mb-3">Log In</h2>
          <Form form={form} autoComplete="off" layout="vertical">
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter username!" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div className="flex flex-col w-full gap-3">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const credential = credentialResponse.credential || "";
                console.log("Google Credential:", credential);

                setCredential(credential);
                localStorage.setItem("credential", credential);

                navigate("/");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <button className="border text-blue-500 h-[35px] rounded-[3px] duration-300 cursor-pointer hover:text-blue-700 font-medium flex gap-2 justify-between px-3 items-center ">
              <FacebookFilled />
              <span>Continue with Facebook</span>
              <div></div>
            </button>
          </div>
          <p className="text-white py-3">
            If you not have accaount!{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer duration-300 hover:text-blue-700 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);
