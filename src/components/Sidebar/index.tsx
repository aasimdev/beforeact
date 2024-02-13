import { Image } from "primereact/image";
import MenuItem from "../../components/MenuItem";
import { CgGames } from "react-icons/cg";
import { Logo } from "../../assets";
import {
  adminRoutes,
  setNavItem,
  setShowAdminRoutes,
} from "../../redux/navItem/navItemSlice";
import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  to: string;
  icon?: string;
  image?: JSX.Element;
}

const Sidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: "bx-home", label: "Dashboard", to: "/" },
    { icon: "bx-user", label: "Players", to: "/players" },
    { icon: "bx-planet", label: "Brands", to: "/brands" },
  ];

  const nestedNavItems: NavItem[] = [
    { image: <CgGames fontSize={25} />, label: "Games", to: "/games" },
    { icon: "bx-user", label: "Users", to: "/users" },
    { icon: "bx-group", label: "Roles", to: "/roles" },
  ];

  const dispatch = useDispatch();
  const showAdminRoutes = useTypedSelector(adminRoutes);
  const location = useLocation();

  return (
    <aside className="pt-2 w-80 bg-white shadow-sidebar h-screen z-10 fixed hidden sm:block">
      <div className="py-2 px-8">
        <Image src={Logo} alt="Image" width="204" />
      </div>
      <div className="pt-6 space-y-2 px-4">
        {navItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item?.icon}
            image={item?.image}
            label={item.label}
            link={item.to}
            onClick={() => {
              dispatch(setNavItem(item?.to));
              localStorage.setItem("navItem", JSON.stringify(item?.to));
              dispatch(setShowAdminRoutes(false));
              localStorage.setItem("showAdminRoutes", JSON.stringify(false));
            }}
          />
        ))}

        <div>
          <MenuItem
            icon="bx-group"
            label="Admin"
            link={
              location.pathname.startsWith("/roles")
                ? "/roles"
                : location.pathname.startsWith("/users")
                ? "/users"
                : location.pathname.startsWith("/games")
                ? "/games"
                : "/games"
            }
            child={true}
            showAdminRoutes={showAdminRoutes}
            onClick={() => {
              dispatch(setNavItem("/games"));
              localStorage.setItem("navItem", JSON.stringify("/games"));
              dispatch(setShowAdminRoutes(!showAdminRoutes));
              localStorage.setItem(
                "showAdminRoutes",
                JSON.stringify(!showAdminRoutes)
              );
            }}
          />
        </div>

        {showAdminRoutes &&
          nestedNavItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item?.icon}
              image={item?.image}
              label={item.label}
              link={item.to}
              onClick={() => {
                dispatch(setNavItem({ navItem: item?.to }));
                localStorage.setItem("navItem", JSON.stringify(item?.to));
              }}
            />
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;
