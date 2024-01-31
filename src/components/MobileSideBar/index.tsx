import { Image } from "primereact/image";
import { useState } from "react";
import LogoImg from "../../assets/images/logo.svg";
import MenuItem from "../../components/MenuItem";
import { IoMenu } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";

interface NavItem {
  icon: string;
  label: string;
  to: string;
}

const BottomBar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: "60px",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 1,
    }}
  >
    <span
      onClick={onMenuClick}
      style={{ cursor: "pointer", marginRight: "20px" }}
    >
      <IoMenu />
    </span>
    <span>Search Icon</span>
    <span>Profile Icon</span>
  </div>
);

const MobileSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems: NavItem[] = [
    { icon: "bx-home", label: "Dashboard", to: "/" },
    { icon: "bx-planet", label: "Brands", to: "/brands" },
    { icon: "bx-user", label: "Users", to: "/users" },
    { icon: "bx-group", label: "Roles", to: "/roles" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <BottomBar onMenuClick={toggleSidebar} />
      {isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "75%",
            height: "100%",
            background: "#fff",
            boxShadow: "2px 0px 5px 0px rgba(0,0,0,0.1)",
            zIndex: 11,
          }}
        >
          <div className="relative">
            <div
              className="absolute bg-white w-10 h-10 flex items-center justify-center text-white text-sm font-bold"
              style={{
                top: "20px",
                left: "250px",
                borderRadius: "50%",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                onClick={toggleSidebar}
                className="bg-blue pointer"
                style={{
                  padding: "6px",
                  borderRadius: "50%",
                }}
              >
                <FaChevronLeft />
              </div>
            </div>
          </div>
          <div className="space-y-2 px-4">
            <div className="my-4">
              <Image src={LogoImg} alt="Image" width="204" />
            </div>
            {navItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                label={item.label}
                link={item.to}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSideBar;
