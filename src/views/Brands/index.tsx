import Header from "../../components/Header";
import Title from "../../components/Title";
import { Button } from "primereact/button";
import { useState } from "react";
import BrandList from "./components/BrandList";
import AddBrandModal from "./components/AddBrandModal";
import Sidebar from "../../components/Sidebar";

const Brands = () => {
  // states
  const [addBrandVisible, setAddBrandVisible] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 lg:ml-80">
          <Header />
          <Title brand={false} title="Brands" />
          <div className="my-6 text-right">
            <Button
              className="theme-btn"
              onClick={() => setAddBrandVisible(true)}
            >
              + Create Brand
            </Button>
          </div>

          <BrandList />
        </div>
      </div>
      {/* Modal */}
      <AddBrandModal
        addBrandVisible={addBrandVisible}
        setAddBrandVisible={setAddBrandVisible}
      />
    </>
  );
};

export default Brands;
