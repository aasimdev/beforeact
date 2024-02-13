import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { setNavItem } from "../../redux/navItem/navItemSlice";

interface MenuItemProps {
  label: string;
  link: string;
  icon?: string;
  image?: JSX.Element;
  child?: boolean;
  showAdminRoutes?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  link,
  image,
  child,
  showAdminRoutes,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = location.pathname === link;

  return (
    <NavLink
      to={link}
      className={`p-4 rounded-md inline-flex gap-2 items-center text-base text-gray w-full sm:w-[228px] ${
        isActive ? "navItem" : ""
      }`}
      onClick={() => {
        dispatch(setNavItem({ navItem: link }));
        localStorage.setItem("navItem", JSON.stringify(link));
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {image ? (
            <div>{image}</div>
          ) : (
            <i className={`bx ${icon} text-2xl`}></i>
          )}
          <span>{label}</span>
        </div>

        {child && (
          <div>
            {showAdminRoutes ? (
              <i className="bx bxs-chevron-down"></i>
            ) : (
              <i className="bx bxs-chevron-right"></i>
            )}
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default MenuItem;
