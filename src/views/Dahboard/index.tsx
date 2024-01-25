import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 lg:ml-80">
          <Header />
          <div className="mt-6">Dashboard</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
