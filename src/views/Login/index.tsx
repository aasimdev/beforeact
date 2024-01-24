import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { setUser } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import DotLoader from "../../components/Spinner/dotLoader";
import ToastAlert from "../../components/Toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl text-black">Login</h1>
          <form className="mt-8" onSubmit={login} autoComplete="off">
            <div className="flex flex-col gap-3 mb-8">
              <InputText
                type="text"
                id="username"
                placeholder="User Name"
                className="theme-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 mb-8">
              <InputText
                type="password"
                id="password"
                placeholder="Password"
                className="theme-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                  className="theme-btn"
                  label="Login"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
