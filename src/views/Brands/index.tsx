import Header from "../../common/Header";
import Title from "../../common/Title";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import BrandList from "./components/BrandList";

// Images
// import apesIMG from "../../assets/images/apes.png";
// import sharkIMG from "../../assets/images/shark.png";
// import diceIMG from "../../assets/images/dice.png";
import { useNavigate } from "react-router-dom";
import AddBrand from "./components/AddBrand";
// import { log } from "console";
import Sidebar from "../../common/Sidebar";
import { useGetAllTenantsQuery } from "../../redux/api/brandApiSlice";
import OverlayLoader from "../../components/Spinner/OverlayLoader";

interface BrandDT {
  name: any;
  id: string | null;
  website: any;
  filterId: string | number;
}

const Brands = () => {
  const navigate = useNavigate();

  // states
  const [addBrandVisible, setAddBrandVisible] = useState(false);
  const [brands, setBrands] = useState([]);

  // GET ALL BRANDS
  const { data, isLoading } = useGetAllTenantsQuery({});

  useEffect(() => {
    if (data) {
      setBrands(data.tenants);
    }
  }, [data]);

  // View Brands
  const viewBrand = (data: BrandDT) => {
    console.log(data);
  };

  // Edit Brand
  const editBrand = (data: BrandDT) => {
    console.log(data);
    navigate(`/brands/${data.filterId}`);
  };

  // Action Body
  const actionBodyTemplate = (data: BrandDT) => {
    return (
      <>
        <Button label="View" text onClick={() => viewBrand(data)} />
        <Button label="Edit" text onClick={() => editBrand(data)} />
      </>
    );
  };

  return (
    <>
      {isLoading && <OverlayLoader />}

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

          <BrandList brands={brands} actionBodyTemplate={actionBodyTemplate} />

          <AddBrand visible={addBrandVisible} setVisible={setAddBrandVisible} />
        </div>
      </div>
    </>
  );
};

export default Brands;
