import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { FormEvent, useState } from "react";
import BrandLogoModal from "./BrandLogoModal";
import DotLoader from "../../../components/Spinner/dotLoader";
import ToastAlert from "../../../components/ToastAlert";
import { useCreateTenantMutation } from "../../../redux/api/brandApiSlice";
// import api from "../../api/api";

interface AddBrandDataType {
  addBrandVisible?: boolean;
  setAddBrandVisible?: any;
}

const AddBrandModal: React.FC<AddBrandDataType> = (props) => {
  const { addBrandVisible, setAddBrandVisible } = props;

  const [formData, setFormData] = useState({
    name: "",
    brandId: "",
    website: "",
  });
  const [visibleLogo, setVisibleLogo] = useState(false);
  const [brandImage, setBrandImage] = useState<any>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // CREATE BRAND API BIND
  const [createBrandAPI, { isLoading }] = useCreateTenantMutation();

  const createBrand = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      filterId: formData.brandId,
      website: formData.website,
    };

    try {
      const brand: any = await createBrandAPI(payload);

      if (brand?.data === null) {
        setAddBrandVisible(false);
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

  const handleClose = () => {
    setAddBrandVisible(false);
    setBrandImage("");
    setFormData({
      ...formData,
      name: "",
      brandId: "",
      website: "",
    });
  };

  return (
    <>
      <Dialog
        visible={addBrandVisible}
        onHide={handleClose}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        header="Create Brand"
        contentClassName="p-0 theme-popup"
        draggable={false}
        resizable={false}
      >
        <div className="px-[104px] py-16">
          <div className="text-center relative">
            <div className="w-40 h-40 rounded-full bg-purple-100 mx-auto">
              {brandImage ? (
                <>
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex justify-center items-center">
                    <img
                      src={brandImage}
                      alt="Brand"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="text-blue text-[108px] font-semibold">
                    A
                  </span>
                </>
              )}

              <Button
                icon="bx bx-edit-alt"
                rounded
                className="bg-gray w-12 h-12 rounded-full p-0 border-0 focus:outline-0 focus:ring-0 absolute bottom-0 left-[calc(50%_+_36px)] flex justify-center text-[32px]"
                onClick={() => {
                  // setAddBrandVisible(false);
                  setVisibleLogo(true);
                }}
              />
            </div>
          </div>
          <form className="mt-10" onSubmit={createBrand}>
            <div className="flex flex-col gap-3 mb-8">
              <label
                htmlFor="name"
                className="text-lg text-gray-200 font-semibold"
              >
                NAME
              </label>
              <InputText
                id="name"
                placeholder="Brand Casino"
                className="theme-input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3 mb-8">
              <label
                htmlFor="brandId"
                className="text-lg text-gray-200 font-semibold"
              >
                ID
              </label>
              <InputText
                id="brandId"
                placeholder="brand"
                className="theme-input"
                value={formData.brandId}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="website"
                className="text-lg text-gray-200 font-semibold"
              >
                WEBSITE
              </label>
              <InputText
                id="website"
                placeholder="brandcasino.com"
                className="theme-input"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-end gap-6 mt-10">
              <Button
                type="button"
                className="theme-btn-default"
                label="Cancel"
                onClick={handleClose}
                disabled={isLoading}
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
                  className="theme-btn"
                  label="Create"
                />
              )}
            </div>
          </form>
        </div>
      </Dialog>

      <BrandLogoModal
        visibleLogo={visibleLogo}
        setVisibleLogo={setVisibleLogo}
        brandImage={brandImage}
        setBrandImage={setBrandImage}
      />
    </>
  );
};

export default AddBrandModal;
