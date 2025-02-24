// Prime React imports
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
// React imports
import { useRef, useState } from "react";
// Custom Imports
import ToastAlert from "../../../components/ToastAlert";

interface BrandLogoModalProps {
  setVisibleLogo?: any;
  visibleLogo?: boolean;
  brandImage?: any;
  setBrandImage?: any;
  mobile?: boolean;
}

const dummyImage =
  "https://res.cloudinary.com/moazam05/image/upload/v1706171308/portfolio/Salman%20Muazam-logog.png-1706171308434.png";

const BrandLogoModal: React.FC<BrandLogoModalProps> = ({
  visibleLogo,
  setVisibleLogo,
  brandImage,
  setBrandImage,
  mobile,
}) => {
  const fileRef = useRef<HTMLInputElement | null | any>(null);
  // states
  const [file, setFile] = useState<any>("");

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024) {
      ToastAlert("Image size is too large (Max: 1mb)", "error");
    } else {
      setFileToBase(file);
      setFile(file);
    }
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBrandImage(reader.result);
    };
  };

  console.log("file", file);

  const handleClose = () => {
    setVisibleLogo(false);
    setBrandImage("");
    setFile("");
  };

  return (
    <Dialog
      visible={visibleLogo}
      onHide={handleClose}
      style={{
        width: "50vw",
        margin: mobile ? "16px" : "",
      }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      header="Upload Logo"
      contentClassName="p-0 theme-popup"
      draggable={false}
      resizable={false}
    >
      {!mobile ? (
        <>
          <div className="px-[104px] py-16">
            <div className="max-w-[305px] mx-auto">
              <div className="flex justify-center items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex justify-center items-center">
                  <img
                    src={brandImage || dummyImage}
                    alt="Brand"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <input
                onChange={handleImage}
                hidden
                ref={fileRef}
                type="file"
                accept="brandImage/*"
                name=""
                id=""
              />

              <div className="flex justify-center items-center">
                <Button
                  type="button"
                  className="mt-8 brand-upload"
                  label="Upload new photo"
                  onClick={() => fileRef.current.click()}
                />
              </div>

              <div className="flex items-center justify-center gap-6 mt-14">
                <Button
                  type="button"
                  className="theme-btn-default"
                  label="Cancel"
                  onClick={handleClose}
                />
                <Button
                  type="button"
                  onClick={() => {
                    setVisibleLogo(false);
                  }}
                  className="theme-btn"
                  label="Save"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6">
          <div>
            <div className="flex justify-center items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex justify-center items-center mt-6">
                <img
                  src={brandImage || dummyImage}
                  alt="Brand"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <input
              onChange={handleImage}
              hidden
              ref={fileRef}
              type="file"
              accept="brandImage/*"
              name=""
              id=""
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="button"
              className="mt-8 brand-upload"
              label="Upload new photo"
              onClick={() => fileRef.current.click()}
            />
          </div>
          <div className="flex items-center flex-col justify-center gap-6 mt-10">
            <Button
              type="button"
              className="theme-btn-default w-full"
              label="Cancel"
              onClick={handleClose}
            />
            <Button
              type="button"
              onClick={() => {
                setVisibleLogo(false);
              }}
              className="theme-btn w-full mb-4"
              label="Save"
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default BrandLogoModal;
