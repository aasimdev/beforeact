import Layout from "../../components/Layout";
import Title from "../../components/Title";
import RolesImage from "../../assets/images/roles_logo.svg";
import { Button } from "primereact/button";

const Games = () => {
  return (
    <Layout>
      <Title brand={false} title="Games" image={RolesImage} />
      <div className="my-6 flex justify-end">
        <Button label="Game List" icon="bx bx-list-ul" className="theme-btn" />
      </div>
      <div className="my-6 p-6 rounded-lg bg-white">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque maiores
        nostrum sed quas laudantium quia error totam fugit aliquam tempora
        corrupti consectetur, perspiciatis vitae minima repellendus dolores?
        Excepturi, ratione tempora.
      </div>
    </Layout>
  );
};

export default Games;
