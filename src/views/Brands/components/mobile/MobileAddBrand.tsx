// React Imports
import { useState } from "react";
// Prime React Imports
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// Redux
import { useCreateTenantMutation } from "../../../../redux/api/brandApiSlice";
// Custom
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import DotLoader from "../../../../components/Spinner/dotLoader";
import ToastAlert from "../../../../components/ToastAlert";
// Assets
import BrandImage from "../../../../assets/images/brands_logo.svg";
import MobileBrandList from "./MobileBrandList";

const MobileAddBrand = () => {
  const [openCard, setOpenCard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brandId: "",
    website: "",
  });

  // CREATE BRAND API BIND
  const [createBrandAPI, { isLoading }] = useCreateTenantMutation();

  const createBrand = async (e: any) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      filterId: formData.brandId,
      website: formData.website,
    };

    try {
      const brand: any = await createBrandAPI(payload);

      if (brand?.data === null) {
        setOpenCard(false);
        ToastAlert("Brand created successfully", "success");
        setFormData({
          name: "",
          brandId: "",
          website: "",
        });
      }

      if (brand?.error) {
        ToastAlert(brand?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Create Brand Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  return (
    <>
      <Header />

      <Title brand={false} title="Brands" image={BrandImage} />
      <div className="my-6">
        <div
          className={` ${openCard ? "p-4" : "pt-4 pb-4"} ${
            openCard ? "bg-white" : "bg-transparent"
          } rounded-lg`}
        >
          {openCard && (
            <>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <form className="" onSubmit={createBrand}>
                    <div className="mb-4">
                      <InputText
                        id="name"
                        placeholder="Brand Name"
                        className="theme-input"
                        style={{
                          width: "100%",
                        }}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <InputText
                        id="brandId"
                        placeholder="Brand ID"
                        className="theme-input"
                        style={{
                          width: "100%",
                        }}
                        value={formData.brandId}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            brandId: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <InputText
                        id="website"
                        placeholder="Website"
                        className="theme-input"
                        style={{
                          width: "100%",
                        }}
                        value={formData.website}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            website: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      label="Cancel"
                      className="theme-btn-default leading-none w-full my-4"
                      onClick={() => {
                        setOpenCard(false);
                      }}
                    />
                    {isLoading ? (
                      <div
                        className="theme-btn"
                        style={{
                          height: "55px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <DotLoader color="#fff" size={12} />
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="theme-btn w-full"
                        label="Create"
                      />
                    )}
                  </form>
                </div>
              </div>
            </>
          )}
          {!openCard && (
            <Button
              className="theme-btn w-full text-center flex justify-center"
              onClick={() => {
                setOpenCard(true);
              }}
            >
              + Create Brand
            </Button>
          )}
        </div>
        <div>
          <MobileBrandList />
        </div>
      </div>
    </>
  );
};

export default MobileAddBrand;
