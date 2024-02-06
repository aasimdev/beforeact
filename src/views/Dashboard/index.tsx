// Custom
import Layout from "../../components/Layout";
import MobileDashboard from "./mobile/MobileDashboard";

const Dashboard = () => {
  return (
    <>
      <Layout>Dashboard</Layout>
      {/* Mobile Version of Dashboard */}
      <div className="p-8 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileDashboard />
      </div>
    </>
  );
};

export default Dashboard;
