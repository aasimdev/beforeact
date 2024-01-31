import Header from "../../../components/Header";
import MobileSideBar from "../../../components/MobileSideBar";

const MobileDashboard = () => {
  return (
    <div>
      <MobileSideBar />
      <Header />
      <div className="my-2">Dashboard</div>
    </div>
  );
};

export default MobileDashboard;
