// React Imports
import React from "react";
// Prime React Imports
import { Button } from "primereact/button";
// Custom
import ConfirmPopup from "../../../components/ConfirmPopup";

interface ConfirmPopupProps {
  confirmPopup: boolean;
  setConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRole?: any;
  setSelectedRole?: any;
  mobile?: boolean;
}

const DeleteRoleModal: React.FC<ConfirmPopupProps> = (props) => {
  const {
    confirmPopup,
    setConfirmPopup,
    selectedRole,
    // setSelectedRole
    mobile,
  } = props;

  const handleDelete = async () => {};

  return (
    <>
      <ConfirmPopup
        confirmPopup={confirmPopup}
        setConfirmPopup={setConfirmPopup}
        mobile={mobile}
      >
        <div className="text-center">
          <h2
            className={`mb-6 ${
              mobile ? "text-3xl" : "text-4xl"
            } text-gray-200 font-semibold`}
          >
            Are you sure?
          </h2>
          <p
            className={`${
              mobile ? "text-[14px]" : "text-[22px]"
            } text-gray-200`}
          >
            You are about to delete the role:{" "}
            <span className="text-blue font-semibold">
              {selectedRole?.name}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-6 mt-10">
          <Button
            type="button"
            className="theme-btn-default"
            label="Cancel"
            onClick={() => setConfirmPopup(false)}
            // disabled={deleteUserLoading}
            style={{
              fontSize: mobile ? "14px" : "22px",
            }}
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
            label={mobile ? "Yes" : "Yes, delete this role"}
            onClick={handleDelete}
            style={{
              fontSize: mobile ? "14px" : "22px",
            }}
          />
        </div>
      </ConfirmPopup>
    </>
  );
};

export default DeleteRoleModal;
