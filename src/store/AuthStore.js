import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [userName, setUserName] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [tenantId, setTenantId] = useState("");
  const [tenantName, setTenantName] = useState("");

  useEffect(() => {
    loginFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function login(data) {
    setUserName(data.user.userName);
    setDateJoined(data.user.dateJoined);
    setEmail(data.user.email);
    setEmailConfirmed(data.user.emailConfirmed);
    setTfaEnabled(data.user.tfaEnabled);
    setLoggedIn(true);

    localStorage.setItem("authToken", data.jwt);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    axios.defaults.headers.common["Authorization"] = `bearer ${data.jwt}`;
  }

  async function loginFromStorage() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const jwt = localStorage.getItem("authToken");
      if (jwt) {
        const decodedJwt = jwtDecode(jwt);
        if (Date.now() >= decodedJwt.exp * 1000) {
          try {
            const response = await axios.post("/user/refresh-token", {
              refreshToken: refreshToken,
            });

            if (response.status === 200) {
              localStorage.setItem("authToken", response.data.jwt);
            } else {
              logout();
              return;
            }
          } catch (error) {
            logout();
            return;
          }
        }

        axios.defaults.headers.common["Authorization"] = `bearer ${jwt}`;
        setLoggedIn(true);

        const tenantDetails = localStorage.getItem("tenant");
        if (tenantDetails) {
          const parsedTenantDetails = JSON.parse(tenantDetails);
          setTenantId(parsedTenantDetails.id);
          setTenantName(parsedTenantDetails.name);
          axios.defaults.headers.common["Tenant"] = parsedTenantDetails.id;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        setUserName(user.userName);
        setDateJoined(user.dateJoined);
        setEmail(user.email);
        setEmailConfirmed(user.emailConfirmed);
        setTfaEnabled(user.tfaEnabled);
      }
    }
  }

  function logout() {
    setUserName("");
    setDateJoined("");
    setEmail("");
    setEmailConfirmed(false);
    setTfaEnabled(false);
    setLoggedIn(false);

    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    axios.defaults.headers.common["Authorization"] = "";
    axios.defaults.headers.common["Tenant"] = "";
  }

  function toggleTfa() {
    setTfaEnabled((prevValue) => !prevValue);
    const user = JSON.parse(localStorage.getItem("user"));
    user.tfaEnabled = !user.tfaEnabled;
    localStorage.setItem("user", JSON.stringify(user));
  }

  function setTenant(id, name) {
    setTenantId(id);
    setTenantName(name);
    axios.defaults.headers.common["Tenant"] = id;
    localStorage.setItem("tenant", JSON.stringify({ id, name }));
  }

  return {
    userName,
    dateJoined,
    email,
    emailConfirmed,
    tfaEnabled,
    loggedIn,
    tenantId,
    tenantName,
    login,
    logout,
    loginFromStorage,
    toggleTfa,
    setTenant,
  };
}
