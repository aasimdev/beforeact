import React from "react";
import ConfirmPopup from "../../../components/ConfirmPopup";
import DotLoader from "../../../components/Spinner/dotLoader";
import { Button } from "primereact/button";
import { useDeleteUserMutation } from "../../../redux/api/userApiSlice";
import ToastAlert from "../../../components/Toast";

interface ConfirmPopupProps {
  confirmPopup: boolean;
  setConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser?: any;
  setSelectedUser?: any;
}

const DeleteUserModal: React.FC<ConfirmPopupProps> = (props) => {
  const { confirmPopup, setConfirmPopup, selectedUser, setSelectedUser } =
    props;

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
      >
        <div className="text-center">
          <h2 className="mb-6 text-4xl text-gray-200 font-semibold">
            Are you sure?
          </h2>
          <p className="text-[22px] text-gray-200">
            You are about to delete the user:{" "}
            <span className="text-blue font-semibold">
              {selectedUser?.userName}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-end gap-6 mt-10">
          <Button
            type="button"
            className="theme-btn-default"
            label="Cancel"
            onClick={() => setConfirmPopup(false)}
            disabled={deleteUserLoading}
          />
          {deleteUserLoading ? (
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
          )}
        </div>
      </ConfirmPopup>
    </>
  );
};

export default DeleteUserModal;
