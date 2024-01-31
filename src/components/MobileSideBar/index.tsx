// React Imports
import { useState } from "react";
// PrimeReact Imports
import { Image } from "primereact/image";
// React Icons
import { IoMenu } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
// Custom
import MenuItem from "../../components/MenuItem";
// Assets
import LogoImg from "../../assets/images/logo.svg";

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
      backgroundColor: "#fff",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 1,
    }}
  >
    <div className="flex justify-between items-center p-4 text-[20px] text-gray-100">
      <span onClick={onMenuClick}>
        <IoMenu />
      </span>
      <span>
        <CiSearch />
      </span>
      <span>
        <CgProfile />
      </span>
    </div>
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
              className="absolute bg-white w-8 h-8 flex items-center justify-center text-white text-sm font-bold"
              style={{
                top: "20px",
                left: "255px",
                borderRadius: "50%",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                onClick={toggleSidebar}
                className="bg-blue pointer"
                style={{
                  padding: "5px",
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
