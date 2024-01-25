import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import React, { ReactNode } from "react";
import closeIcon from "../assets/images/close-icon.svg";
import { Button } from "primereact/button";

interface ConfirmPopupProps {
  setConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  confirmPopup: boolean;
  children: ReactNode;
  onDelete: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  setConfirmPopup,
  confirmPopup,
  children,
  onDelete,
}) => {
  // Close Popup Icon
  const closeIconTemplate = <Image src={closeIcon} alt="close icon" />;
  return (
    <Dialog
      visible={confirmPopup}
      onHide={() => setConfirmPopup(false)}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      headerStyle={{ padding: 0 }}
      closeIcon={closeIconTemplate}
      contentClassName="p-0"
    >
      <div className="px-[104px] py-16">
        {children}
        <div className="flex items-center justify-end gap-6 mt-10">
          <Button
            type="button"
            className="theme-btn-default"
            label="Cancel"
            onClick={() => setConfirmPopup(false)}
          />
          <Button
            type="button"
            className="theme-btn"
            label="Yes, delete this user"
            onClick={onDelete}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmPopup;
