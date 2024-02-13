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
import { InputText } from "primereact/inputtext";
import { CgGames } from "react-icons/cg";
import { Logo } from "../../assets";

interface NavItem {
  label: string;
  to: string;
  icon?: string;
  image?: JSX.Element;
}

const SearchBar = ({ onSearchClick }: { onSearchClick: () => void }) => (
  <div className="fixed bottom-3.5 left-4 right-4 z-20 shadow-input bg-white rounded-lg h-12">
    <InputText
      id="search"
      placeholder="Search..."
      className="theme-input border-0 w-full h-full text-base"
    />
    <button type="button" onClick={onSearchClick}>
      <i className="bx bx-x text-gray text-2xl absolute right-3 top-1/2 -translate-y-1/2 "></i>
    </button>
  </div>
);

const BottomBar = ({
  onMenuClick,
  onSearchClick,
}: {
  onMenuClick: () => void;
  onSearchClick: () => void;
}) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white shadow-closeSBtn z-10">
    <div className="flex justify-between items-center px-8 py-6 text-[20px] text-gray-100">
      <span onClick={onMenuClick} className="text-3xl">
        <IoMenu />
      </span>
      <span onClick={onSearchClick} className="text-3xl">
        <CiSearch />
      </span>
      <span className="text-3xl">
        <CgProfile />
      </span>
    </div>
  </div>
);

const MobileSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems: NavItem[] = [
    { icon: "bx-home", label: "Dashboard", to: "/" },
    { icon: "bx-user", label: "Players", to: "/players" },
    { icon: "bx-planet", label: "Brands", to: "/brands" },
    { image: <CgGames fontSize={25} />, label: "Games", to: "/games" },
    { icon: "bx-user", label: "Users", to: "/users" },
    { icon: "bx-group", label: "Roles", to: "/roles" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const searchHandler = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="relative">
      <BottomBar onMenuClick={toggleSidebar} onSearchClick={searchHandler} />
      {showSearch && <SearchBar onSearchClick={searchHandler} />}
      <div
        className={`fixed top-0 left-0 w-60 h-full bg-white z-20 shadow-mobileSidebar transition-all duration-300 ${
          isSidebarOpen ? "-translate-x-0" : "-translate-x-[calc(100%_+_16px)]"
        }`}
      >
        <div className="relative">
          <div className="absolute bg-white w-8 h-8 flex items-center justify-center text-white text-sm font-bold top-5 -right-4 rounded-full shadow-closeSBtn">
            <div
              onClick={toggleSidebar}
              className="bg-blue pointer p-1.5 rounded-full"
            >
              <FaChevronLeft />
            </div>
          </div>
        </div>
        <div className="space-y-2 px-4">
          <div className="my-4">
            <Image src={Logo} alt="Image" width="162" />
          </div>
          {navItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item?.icon}
              image={item?.image}
              label={item.label}
              link={item.to}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
