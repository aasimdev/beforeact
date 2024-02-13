// React Imports
import React from "react";
// Custom
import MobileSideBar from "../MobileSideBar";
import Header from "../Header";

interface mobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<mobileLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <MobileSideBar />
      <Header />
      <div>{children}</div>
    </>
  );
};

export default MobileLayout;
