import { Image } from "primereact/image";
import LogoImg from "../../assets/images/logo.svg";
import MenuItem from "../../components/MenuItem";

interface NavItem {
  icon: string;
  label: string;
  to: string;
}

const Sidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: "bx-home", label: "Dashboard", to: "/" },
    { icon: "bx-planet", label: "Brands", to: "/brands" },
    { icon: "bx-user", label: "Users", to: "/users" },
    { icon: "bx-group", label: "Roles", to: "/roles" },
  ];
  return (
    <aside className="pt-2 w-80 bg-white shadow-sidebar h-screen z-10 fixed -translate-x-full lg:translate-x-0">
      <div className="py-2 px-8">
        {/* <a href="#"> */}
        <Image src={LogoImg} alt="Image" width="204" />
        {/* </a> */}
      </div>
      <div className="pt-6 space-y-2 px-4">
        {navItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            link={item.to}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
