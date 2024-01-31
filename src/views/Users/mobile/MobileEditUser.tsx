// React Imports
import React from "react";
// Prime Imports
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// Redux
import { useUpdateUserMutation } from "../../../redux/api/userApiSlice";
// Custom
import ToastAlert from "../../../components/ToastAlert";
import DotLoader from "../../../components/Spinner/dotLoader";

interface Props {
  confirmPopup: boolean;
  setConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser?: any;
  setSelectedUser?: any;
}

const MobileEditUser: React.FC<Props> = (props) => {
  const { confirmPopup, setConfirmPopup, selectedUser, setSelectedUser } =
    props;

  // UPDATE USER API BIND
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const updateUserHandler = async () => {
    const payload = {
      id: selectedUser?.id,
      userName: selectedUser?.userName,
      email: selectedUser?.email,
    };

    try {
      const user: any = await updateUser(payload);

      if (user?.data === null) {
        ToastAlert("User Updated Successfully", "success");
        setConfirmPopup(false);
      }
      if (user?.error) {
        ToastAlert(user?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Update User Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  return (
    <>
      <Dialog
        visible={confirmPopup}
        onHide={() => setConfirmPopup(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        header="Edit User"
        contentClassName="p-0 theme-popup"
        draggable={false}
        resizable={false}
      >
        <div className="m-4">
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1">
                Name
              </label>
              <InputText
                type="text"
                id="name"
                placeholder="User Name"
                className="theme-input shadow-btn w-32"
                value={selectedUser?.userName}
                onChange={(event) => {
                  setSelectedUser({
                    ...selectedUser,
                    userName: event?.target?.value,
                  });
                }}
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">
                Email Address
              </label>
              <InputText
                type="text"
                id="email"
                placeholder="Email Address"
                className="theme-input shadow-btn w-32"
                value={selectedUser?.email}
                onChange={(event) => {
                  setSelectedUser({
                    ...selectedUser,
                    email: event?.target?.value,
                  });
                }}
                style={{ width: "100%" }}
              />
            </div>

            <div className="mt-5 mb-3 w-full">
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
                  className="shadow-none border-0 text-[20px] p-2 font-medium bg-blue w-full flex items-center justify-center"
                  onClick={updateUserHandler}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MobileEditUser;
