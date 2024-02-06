// React Imports
import React, { ReactNode } from "react";
// Prime Imports
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
// Local Imports
import closeIcon from "../../assets/images/close-icon.svg";

interface ConfirmPopupProps {
  confirmPopup: boolean;
  setConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  mobile?: boolean;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = (props) => {
  const { confirmPopup, setConfirmPopup, children, mobile } = props;

  // Close Popup Icon
  const closeIconTemplate = <Image src={closeIcon} alt="close icon" />;

  return (
    <Dialog
      visible={confirmPopup}
      onHide={() => setConfirmPopup(false)}
      style={{
        width: "50vw",
        boxShadow: mobile ? "none" : "0 1px 3px rgba(0, 0, 0, 0.3)",
      }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      headerStyle={{ padding: 0, display: mobile ? "none" : "block" }}
      closeIcon={closeIconTemplate}
      contentClassName={mobile ? "m-4 p-0 rounded-lg" : "p-0"}
    >
      <div
        className={`${mobile ? "px-[30px]" : "px-[104px]"} ${
          mobile ? "py-4" : "py-16"
        }`}
      >
        {children}
      </div>
    </Dialog>
  );
};

export default ConfirmPopup;
