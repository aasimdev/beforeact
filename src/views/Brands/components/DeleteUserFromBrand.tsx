import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import React from "react";
import closeIcon from "../../../assets/images/close-icon.svg";
import { Button } from "primereact/button";
import DotLoader from "../../../components/Spinner/dotLoader";
import { useRemoveUserFromTenantMutation } from "../../../redux/api/brandApiSlice";
import ToastAlert from "../../../components/ToastAlert";

interface DeleteUserFromBrandProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: any;
  title: string;
  id: any;
  mobile?: boolean;
}

const DeleteUserFromBrand: React.FC<DeleteUserFromBrandProps> = (props) => {
  const { visible, setVisible, selectedUser, title, id, mobile } = props;

  // Close Popup Icon
  const closeIconTemplate = <Image src={closeIcon} alt="close icon" />;

  // REMOVE USER API BIND
  const [removeUserApi, { isLoading: removeUserLoading }] =
    useRemoveUserFromTenantMutation();

  const removeUser = async (user: any) => {
    const payload = {
      userId: user.id,
      tenantId: id,
    };

    try {
      const user: any = await removeUserApi(payload);

      if (user?.data === null) {
        ToastAlert("User Deleted Successfully", "success");
        setVisible(false);
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
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        headerStyle={{ padding: 0 }}
        closeIcon={closeIconTemplate}
        contentClassName="p-0"
      >
        <div
          className={`${mobile ? "px-[30px]" : "px-[104px]"} ${
            mobile ? "py-4" : "py-16"
          }`}
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
              <br />
              from the brand{" "}
              <span className="text-blue font-semibold">{title}</span>
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-6 mt-10">
              <Button
                type="button"
                className="theme-btn-default"
                label="Cancel"
                onClick={() => setVisible(false)}
                disabled={removeUserLoading}
                style={{
                  fontSize: mobile ? "14px" : "22px",
                }}
              />

              {removeUserLoading ? (
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
                  onClick={() => removeUser(selectedUser)}
                  style={{
                    fontSize: mobile ? "14px" : "22px",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteUserFromBrand;
