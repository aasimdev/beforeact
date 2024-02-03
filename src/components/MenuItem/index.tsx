import React from "react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
  icon: string;
  label: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, link }) => {
  return (
    <NavLink
      to={link}
      className={`p-4 rounded-md inline-flex gap-2 items-center text-base text-gray w-full sm:w-[228px] navItem`}
    >
      <i className={`bx ${icon} text-2xl`}></i>
      <span>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
