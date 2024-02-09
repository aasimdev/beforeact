import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import RolesImage from "../../../assets/images/roles_logo.svg";
import { useLocation } from "react-router-dom";

const ViewSingleGame = () => {
  const location = useLocation();
  const name = decodeURIComponent(location.pathname.split("/").pop() || "");

  return (
    <Layout>
      <Title brand={false} title={name} image={RolesImage} />

      <Breadcrumb mainLabel="Games Lists" label="Games" url="/games" />
    </Layout>
  );
};

export default ViewSingleGame;
