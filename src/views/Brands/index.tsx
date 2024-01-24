import Header from "../../common/Header";
import Title from "../../common/Title";
import { Button } from "primereact/button";
import { FormEvent, useEffect, useState } from "react";
import BrandList from "./components/BrandList";

// Images
// import apesIMG from "../../assets/images/apes.png";
// import sharkIMG from "../../assets/images/shark.png";
// import diceIMG from "../../assets/images/dice.png";
import { useNavigate } from "react-router-dom";
import AddBrand from "./components/AddBrand";
import api from "../../api/api";
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
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    filterId: "",
    website: "",
  });

  // GET ALL BRANDS
  const { data, isLoading } = useGetAllTenantsQuery({});

  useEffect(() => {
    if (data) {
      setBrands(data.tenants);
    }
  }, [data]);

  // // Get Brands
  // const fetchData = async () => {
  //   try {
  //     const response = await api.tenants.getTenants();
  //     setBrands(response.data.tenants);
  //   } catch (error) {
  //     // Handle error
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // // Get Brands Call
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Create Brand
  const createBrand = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.tenants.createTenant(
        formData.name,
        formData.filterId,
        formData.website
      );
      if (response.status === 200) {
        setVisible(false);
        // fetchData();
      }
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  // Create Brand onChange Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

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
            <Button className="theme-btn" onClick={() => setVisible(true)}>
              + Create Brand
            </Button>
          </div>

          <BrandList brands={brands} actionBodyTemplate={actionBodyTemplate} />

          <AddBrand
            setVisible={setVisible}
            visible={visible}
            createBrand={createBrand}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Brands;
