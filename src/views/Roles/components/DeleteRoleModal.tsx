import React from "react";
import ConfirmPopup from "../../../components/ConfirmPopup";
import { Button } from "primereact/button";

interface ConfirmPopupProps {
  confirmPopup: boolean;
  setConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRole?: any;
  setSelectedRole?: any;
}

const DeleteRoleModal: React.FC<ConfirmPopupProps> = (props) => {
  const {
    confirmPopup,
    setConfirmPopup,
    selectedRole,
    // setSelectedRole
  } = props;

  const handleDelete = async () => {};

  return (
    <>
      <ConfirmPopup
        confirmPopup={confirmPopup}
        setConfirmPopup={setConfirmPopup}
      >
        <div className="text-center">
          <h2 className="mb-6 text-4xl text-gray-200 font-semibold">
            Are you sure?
          </h2>
          <p className="text-[22px] text-gray-200">
            You are about to delete the role:{" "}
            <span className="text-blue font-semibold">
              {selectedRole?.name}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-end gap-6 mt-10">
          <Button
            type="button"
            className="theme-btn-default"
            label="Cancel"
            onClick={() => setConfirmPopup(false)}
            // disabled={deleteUserLoading}
          />
          {/* {deleteUserLoading ? (
            <div
              className="theme-btn leading-none"
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
              type="button"
              className="theme-btn"
              label="Yes, delete this user"
              onClick={handleDelete}
            />
          )} */}
          <Button
            type="button"
            className="theme-btn"
            label="Yes, delete this role"
            onClick={handleDelete}
          />
        </div>
      </ConfirmPopup>
    </>
  );
};

export default DeleteRoleModal;
