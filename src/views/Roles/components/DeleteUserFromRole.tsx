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
        {!mobile ? (
          <>
            <div className="text-center">
              <h2 className="mb-6 text-4xl text-gray-200 font-semibold">
                Are you sure?
              </h2>
              <p className="text-gray-200 text-[22px]">
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
                  fontSize: "22px",
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
                  label="Yes, delete this user"
                  onClick={handleDelete}
                  style={{
                    fontSize: "22px",
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="rounded-lg bg-white">
              <div
                className="flex justify-end cursor-pointer"
                onClick={() => setConfirmPopup(false)}
              >
                <i
                  style={{
                    fontSize: "32px",
                    color: "#8E9BAA",
                  }}
                  className="bx bx-x"
                ></i>
              </div>
              <div className="flex justify-center items-center flex-col">
                <h2 className="my-10 text-4xl text-gray-200 font-semibold">
                  Are you sure?
                </h2>
                <div className="flex flex-col justify-center items-center">
                  <div>You are about to delete this user: </div>
                  <div className="text-blue font-semibold">
                    {selectedUser?.userName}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center flex-col justify-center gap-6 mt-10">
                  {isLoading ? (
                    <div className="theme-btn h-[48px] flex items-center justify-center w-full">
                      <DotLoader color="#fff" size={12} />
                    </div>
                  ) : (
                    <Button
                      type="button"
                      className="theme-btn w-full h-[48px]"
                      label="Yes, delete this user"
                      onClick={handleDelete}
                      style={{
                        fontSize: "20px",
                      }}
                    />
                  )}

                  <Button
                    type="button"
                    className="theme-btn-default leading-none w-full text-gray-100 h-[48px] font-normal text-[22px] rounded-lg mb-[50px]"
                    label="Cancel"
                    onClick={() => setConfirmPopup(false)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </ConfirmPopup>
    </>
  );
};

export default DeleteUserFromRole;
