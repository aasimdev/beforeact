import React from "react";
import ConfirmPopup from "../../../components/ConfirmPopup";
import { Button } from "primereact/button";
import DotLoader from "../../../components/Spinner/dotLoader";
import { useRemoveUserFromRoleMutation } from "../../../redux/api/roleApiSlice";
import ToastAlert from "../../../components/ToastAlert";

interface ConfirmPopupProps {
  confirmPopup: boolean;
  setConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser?: any;
  setSelectedUser?: any;
  roleId?: string;
  mobile?: boolean;
}

const DeleteUserFromRole: React.FC<ConfirmPopupProps> = (props) => {
  const {
    confirmPopup,
    setConfirmPopup,
    selectedUser,
    setSelectedUser,
    roleId,
    mobile,
  } = props;

  // DELETE USER API BIND
  const [deleteUserAPI, { isLoading }] = useRemoveUserFromRoleMutation();

  const handleDelete = async () => {
    const payload = {
      userId: selectedUser?.id,
      roleId,
    };

    try {
      const user: any = await deleteUserAPI(payload);

      if (user?.data === null) {
        setConfirmPopup(false);
        setSelectedUser(null);
        ToastAlert("User Deleted Successfully", "success");
      }
      if (user?.error) {
        ToastAlert(user?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Deleting User Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

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
            You are about to delete the user:{" "}
            <span className="text-blue font-semibold">
              {selectedUser?.userName}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-6 mt-10">
          <Button
            type="button"
            className="theme-btn-default"
            label="Cancel"
            onClick={() => setConfirmPopup(false)}
            disabled={isLoading}
            style={{
              fontSize: mobile ? "14px" : "22px",
            }}
          />
          {isLoading ? (
            <div
              className="theme-btn leading-none"
              style={{
                height: "45px",
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
              label={mobile ? "Yes" : "Yes, delete this user"}
              onClick={handleDelete}
              style={{
                fontSize: mobile ? "14px" : "22px",
              }}
            />
          )}
        </div>
      </ConfirmPopup>
    </>
  );
};

export default DeleteUserFromRole;
