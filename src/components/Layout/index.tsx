// React Imports
import React from "react";
// Custom
import Sidebar from "../Sidebar";
import Header from "../Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <div className="flex">
        <Sidebar />
        <div className="p-8 w-full flex-1 ml-80 lg:block md:block sm:block  hidden">
          <Header />
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
