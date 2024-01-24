import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";

const BrandLogo: React.FC<{ setVisibleLogo?: any; visibleLogo?: boolean }> = ({
  visibleLogo,
  setVisibleLogo,
}) => {
  const itemTemplate = (inFile: any) => {
    const file = inFile as File;
    console.log(inFile);

    console.log(file);

    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          {/* <img alt={file.name} role="presentation" src={file.objectURL} width={100} /> */}
        </div>
      </div>
    );
  };

  const onTemplateUpload = (e: any) => {
    console.log(e);
  };

  // const chooseOptions = {
  //   icon: "pi pi-fw pi-images",
  //   iconOnly: true,
  //   className: "custom-choose-btn p-button-rounded p-button-outlined",
  // };

  return (
    <Dialog
      visible={visibleLogo}
      onHide={() => setVisibleLogo(false)}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      header="Upload Logo"
      contentClassName="p-0 theme-popup"
      draggable={false}
      resizable={false}
    >
      <div className="px-[104px] py-16">
        <div className="max-w-[305px] mx-auto">
          <div className="text-center relative">
            <div className="w-40 h-40 rounded-full bg-black mx-auto">
              <Image src="" alt="Brand" />
            </div>
          </div>
          <FileUpload
            mode="basic"
            name="brand"
            url="/api/upload"
            accept="image/*"
            maxFileSize={1000000}
            className="mt-8 brand-upload"
            chooseLabel="Upload new photo"
            itemTemplate={itemTemplate}
            onUpload={onTemplateUpload}
          />

          <div className="flex items-center justify-center gap-6 mt-14">
            <Button
              type="button"
              className="theme-btn-default"
              label="Cancel"
              onClick={() => setVisibleLogo(false)}
            />
            <Button type="button" className="theme-btn" label="Save" />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BrandLogo;
