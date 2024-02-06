// React Imports
import { useState } from "react";
// Prime Imports
import { Button } from "primereact/button";
// Assets
import BrandImage from "../../assets/images/brands_logo.svg";
// Custom
import Title from "../../components/Title";
import BrandList from "./components/BrandList";
import AddBrandModal from "./components/AddBrandModal";
import MobileAddBrand from "./mobile/MobileAddBrand";
import Layout from "../../components/Layout";

const Brands = () => {
  // states
  const [addBrandVisible, setAddBrandVisible] = useState(false);

  return (
    <>
      <Layout>
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
        {/* Modal */}
        <AddBrandModal
          addBrandVisible={addBrandVisible}
          setAddBrandVisible={setAddBrandVisible}
        />
      </Layout>

      {/* Mobile Version of Brands */}
      <div className="px-4 pt-4 pb-10 sm:p-8 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileAddBrand />
      </div>
    </>
  );
};

export default Brands;
