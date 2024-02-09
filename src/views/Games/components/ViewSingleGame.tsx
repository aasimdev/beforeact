import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import RolesImage from "../../../assets/images/roles_logo.svg";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Index";

const ViewSingleGame = () => {
  const location = useLocation();
  const name = decodeURIComponent(location.pathname.split("/").pop() || "");

  return (
    <Layout>
      <Title brand={false} title={name} image={RolesImage} />

      <Breadcrumb
        label="Games"
        url="/games"
        childLabel="Games List"
        childUrl="/games/game-list"
        mainLabel={name}
      />
    </Layout>
  );
};

export default ViewSingleGame;
