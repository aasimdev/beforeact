// React Imports
import { useState } from "react";
import { useLocation } from "react-router-dom";
// Prime React Imports
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// Assets
import RolesImage from "../../../assets/images/roles_logo.svg";
// Custom
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import { CustomLabel } from "../../../components/Typography";

const AddGame = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [formData, setFormData] = useState({
    gameId: "",
    provider: "",
    name: "",
    category: "",
  });

  return (
    <Layout>
      <Title
        brand={false}
        title={id ? "Update Game" : "Add New Game"}
        image={RolesImage}
      />

      <Breadcrumb
        mainLabel={id ? "Update Game" : "Add New Game"}
        label="Games"
        url="/games"
      />

      <div className="my-6 p-6 bg-white rounded-lg flex flex-col gap-6">
        <div className="flex flex-col gap-3 w-full">
          <CustomLabel htmlFor="gameId">ID</CustomLabel>
          <InputText
            type="text"
            id="gameId"
            placeholder="ID"
            className="theme-input shadow-none w-full"
            value={formData.gameId}
            onChange={(e) =>
              setFormData({ ...formData, gameId: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <CustomLabel htmlFor="provider">PROVIDER</CustomLabel>
          <InputText
            type="text"
            id="provider"
            placeholder="Provider"
            className="theme-input shadow-none w-full"
            value={formData.provider}
            onChange={(e) =>
              setFormData({ ...formData, provider: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <CustomLabel htmlFor="name">NAME</CustomLabel>
          <InputText
            type="text"
            id="name"
            placeholder="Name"
            className="theme-input shadow-none w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <CustomLabel htmlFor="category">CATEGORY</CustomLabel>
          <InputText
            type="text"
            id="category"
            placeholder="Category"
            className="theme-input shadow-none w-full"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button label={id ? "Update" : "Create"} className="theme-btn" />
      </div>
    </Layout>
  );
};

export default AddGame;
