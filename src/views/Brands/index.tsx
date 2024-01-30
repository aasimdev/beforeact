import Header from "../../components/Header";
import Title from "../../components/Title";
import { Button } from "primereact/button";
import { useState } from "react";
import BrandList from "./components/BrandList";
import AddBrandModal from "./components/AddBrandModal";
import Sidebar from "../../components/Sidebar";
import MobileVersionBrand from "./components/MobileVersionBrand";
import BrandImage from "../../assets/images/brands_logo.svg";

const Brands = () => {
  // states
  const [addBrandVisible, setAddBrandVisible] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar />

        {/* Below 640px hidden */}
        <div className="p-8 w-full flex-1 lg:ml-80 lg:block md:block sm:block  hidden">
          <Header />
          <Title brand={false} title="Brands" image={BrandImage} />
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

      {/* Mobile Version of Brands */}
      <div className="p-8 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileVersionBrand />
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
