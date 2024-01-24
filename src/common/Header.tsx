import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import profilePhoro from "../assets/images/1.png";
import { Menu } from "primereact/menu";
// import api from "../api/api";
// import { useAuth } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";

const Header: React.FC = () => {
  const [value, setValue] = useState("");
  const menuLeft = useRef<Menu>(null);
  const navigate = useNavigate();
  // const authStore = useAuth();
  const dispatch = useDispatch();

  let items = [
    {
      label: "Settings",
      icon: "bx bx-cog",
    },
    {
      label: "Logout",
      icon: "bx bx-exit",
      command: () => logoutHandler(),
    },
  ];

  async function logoutHandler() {
    // console.log("asdfasdf");
    // const response = await api.auth.logout();
    // if (response.status == 200) {
    //   authStore.logout();
    //   navigate("/login");
    // }
    dispatch(setUser(null));
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className="shadow-sidebar pr-28 pl-4 relative bg-white rounded-lg">
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex items-center gap-4">
        <Button
          icon="bx bx-bell text-2xl"
          className="text-gray-100 p-0 w-8 h-8 focus:outline-0 focus:ring-0 focus:bg-transparent"
          rounded
          text
        />
        <Menu model={items} popup ref={menuLeft} />
        <Button
          className="rounded-full static p-0 w-10 h-10 bg-transparent border-0 focus:outline-0 focus:ring-0"
          onClick={(event) => menuLeft.current?.toggle(event)}
        >
          <Image src={profilePhoro} />
          <span className="w-2 h-2 rounded-full bg-green shadow-[0px_0px_0px_2px_white] inline-block absolute right-0.5 bottom-0.5"></span>
        </Button>
      </div>
      <span className="p-input-icon-left w-full">
        <i className="bx bx-search text-gray text-2xl mt-0 top-1/2 -translate-y-1/2 left-0" />
        <InputText
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="w-full text-base text-gray border-0 py-4 bg-transparent placeholder:text-gray-100 focus:ring-0 focus:outline-0"
        />
      </span>
    </div>
  );
};

export default Header;
