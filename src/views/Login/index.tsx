// React Imports
import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Prime React Imports
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// Redux
import { setUser } from "../../redux/auth/authSlice";
import { useLoginMutation } from "../../redux/api/authApiSlice";
// Icons
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";
// Assets
import LoginImage from "../../assets/images/login_image.png";
import RocketLogo from "../../assets/images/rocket_logo.svg";
// Custom
import DotLoader from "../../components/Spinner/dotLoader";
import ToastAlert from "../../components/ToastAlert";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Sign In Api Bind
  const [loginUser, { isLoading }] = useLoginMutation();

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      username: userName,
      password: password,
    };
    try {
      const user: any = await loginUser(payload);

      if (user?.data) {
        dispatch(setUser(user?.data));
        localStorage.setItem("user", JSON.stringify(user?.data));
        navigate("/brands");
      }
      if (user?.error) {
        // ToastAlert(user?.error?.data?.title, "error");
        ToastAlert("User not found", "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-3/4">
          <img
            src={LoginImage}
            alt="login"
            className="w-full h-screen object-cover"
          />
        </div>
        <div className="w-1/2 bg-orange-500">
          <div className="flex p-16 justify-center items-center bg-white h-screen">
            <form className="w-full" onSubmit={login} autoComplete="off">
              <h1 className="text-[40px] text-gray font-bold flex items-center gap-3 mb-10">
                <img src={RocketLogo} alt="rocket" className="w-14 h-14" />
                DNA Bonus Engine
              </h1>
              <div className="text-[27px] text-gray-200 font-medium mb-4">
                Welcome to our back office 👋🏻
              </div>
              <div className="text-[22px] text-gray-100">
                Please sign-in to your account to access all our
                <br />
                features
              </div>
              <div className="flex flex-col mb-6 mt-12">
                <label
                  htmlFor="username"
                  className="text-[18px] mb-3 font-semibold text-gray-200"
                >
                  USERNAME
                </label>
                <InputText
                  type="text"
                  id="username"
                  placeholder="User Name"
                  className="theme-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-8">
                <label
                  htmlFor="password"
                  className="text-[18px] mb-3 font-semibold text-gray-200"
                >
                  PASSWORD
                </label>
                <span className="p-input-icon-right w-full">
                  {showPassword ? (
                    <GoEyeClosed
                      size={24}
                      className="text-gray-400 cursor-pointer"
                      onClick={hideShowPassword}
                    />
                  ) : (
                    <MdOutlineRemoveRedEye
                      size={24}
                      className="text-gray-400 cursor-pointer"
                      onClick={hideShowPassword}
                    />
                  )}
                  <InputText
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="********"
                    className="theme-input w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </span>
              </div>

              <div className="flex cursor-pointer justify-end text-blue text-[18px] font-medium mb-8">
                ForgotPassword?
              </div>
              <div className="flex items-center justify-end gap-6">
                {isLoading ? (
                  <div
                    className="theme-btn"
                    style={{
                      height: "55px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DotLoader color="#fff" size={12} />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading || userName === "" || password === ""}
                    className="theme-btn w-full"
                    label="Sign In"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
