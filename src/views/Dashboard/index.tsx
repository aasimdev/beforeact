import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MobileDashboard from "./mobile/MobileDashboard";

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 ml-80 lg:block md:block sm:block  hidden">
          <Header />
          <div className="mt-6">Dashboard</div>
        </div>
      </div>

      {/* Mobile Version of Dashboard */}
      <div className="p-8 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileDashboard />
      </div>
    </>
  );
};

export default Dashboard;
