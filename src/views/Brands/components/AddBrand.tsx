import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import DotLoader from "../../../components/Spinner/dotLoader";
// import api from "../../api/api";

interface AddBrandDataType {
  setVisible?: any;
  visible?: boolean;
  createBrand?: any;
  formData?: any;
  setFormData?: any;
  handleChange?: any;
  loading?: boolean;
}

const AddBrand: React.FC<AddBrandDataType> = (props) => {
  const {
    setVisible,
    visible,
    createBrand,
    setFormData,
    formData,
    handleChange,
    loading,
  } = props;
  const [visibleLogo, setVisibleLogo] = useState(false);

  return (
    <>
      <Dialog
        visible={visible}
        onHide={() => {
          setVisible(false);
          setFormData({
            name: "",
            filterId: "",
            website: "",
          });
        }}
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
              <span className="text-blue text-[108px] font-semibold">A</span>
              <Button
                icon="bx bx-edit-alt"
                rounded
                className="bg-gray w-12 h-12 rounded-full p-0 border-0 focus:outline-0 focus:ring-0 absolute bottom-0 left-[calc(50%_+_36px)] flex justify-center text-[32px]"
                onClick={() => {
                  setVisible(false);
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
                htmlFor="filterId"
                className="text-lg text-gray-200 font-semibold"
              >
                ID
              </label>
              <InputText
                id="filterId"
                placeholder="brand"
                className="theme-input"
                value={formData.filterId}
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
                onClick={() => {
                  setVisible(false);
                  setFormData({
                    name: "",
                    filterId: "",
                    website: "",
                  });
                }}
                disabled={loading}
              />
              {loading ? (
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
                  disabled={loading}
                  className="theme-btn"
                  label="Create"
                />
              )}
            </div>
          </form>
        </div>
      </Dialog>

      <BrandLogo setVisibleLogo={setVisibleLogo} visibleLogo={visibleLogo} />
    </>
  );
};

export default AddBrand;
