// React Imports
import React from "react";
// Prime Imports
import { Button } from "primereact/button";
// Redux
import { useDeleteUserMutation } from "../../../redux/api/userApiSlice";
// Custom
import ConfirmPopup from "../../../components/ConfirmPopup";
import DotLoader from "../../../components/Spinner/dotLoader";
import ToastAlert from "../../../components/ToastAlert";

interface ConfirmPopupProps {
  confirmPopup: boolean;
  setConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser?: any;
  setSelectedUser?: any;
  mobile?: boolean;
}

const DeleteUserModal: React.FC<ConfirmPopupProps> = (props) => {
  const {
    confirmPopup,
    setConfirmPopup,
    selectedUser,
    setSelectedUser,
    mobile,
  } = props;

  // DELETE USER API BIND
  const [deleteUserAPI, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();

  const handleDelete = async () => {
    const payload = {
      id: selectedUser?.id,
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
        mobile={true}
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
            </span>{" "}
          </p>
        </div>
        <div className="flex items-center justify-center gap-6 mt-10 mb-5">
          <Button
            type="button"
            className="theme-btn-default"
            label="Cancel"
            onClick={() => setConfirmPopup(false)}
            disabled={deleteUserLoading}
            style={{
              fontSize: mobile ? "14px" : "22px",
            }}
          />
          {deleteUserLoading ? (
            <div
              className="theme-btn leading-none"
              style={{
                height: mobile ? "45px" : "55px",
                fontSize: mobile ? "14px" : "22px",
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

export default DeleteUserModal;
