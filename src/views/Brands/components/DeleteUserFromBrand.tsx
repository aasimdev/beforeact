import React from "react";
import { Button } from "primereact/button";
import DotLoader from "../../../components/Spinner/dotLoader";
import { useRemoveUserFromTenantMutation } from "../../../redux/api/brandApiSlice";
import ToastAlert from "../../../components/ToastAlert";
import ConfirmPopup from "../../../components/ConfirmPopup";

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
      <ConfirmPopup
        confirmPopup={visible}
        setConfirmPopup={setVisible}
        mobile={mobile}
      >
        {!mobile ? (
          <>
            <div>
              <div className="text-center">
                <h2 className="mb-6 text-4xl text-gray-200 font-semibold">
                  Are you sure?
                </h2>
                <p className="text-[22px] text-gray-200">
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
                  />

                  {removeUserLoading ? (
                    <div
                      className="theme-btn leading-none"
                      style={{
                        height: "55px",
                        fontSize: "22px",
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
                      onClick={() => removeUser(selectedUser)}
                      style={{
                        fontSize: "22px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-lg bg-white">
              <div
                className="flex justify-end cursor-pointer"
                onClick={() => setVisible(false)}
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
                  <div>You are about to delete: </div>
                  <div className="text-blue font-semibold">
                    {selectedUser?.userName}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div>You are about to delete: </div>
                  <div className="text-blue font-semibold ml-1">{title}</div>
                </div>
              </div>
              <div>
                <div className="flex items-center flex-col justify-center gap-6 mt-10">
                  {removeUserLoading ? (
                    <div className="theme-btn h-[48px] flex items-center justify-center w-full">
                      <DotLoader color="#fff" size={12} />
                    </div>
                  ) : (
                    <Button
                      type="button"
                      className="theme-btn w-full h-[48px]"
                      label="Yes, delete this user"
                      onClick={() => removeUser(selectedUser)}
                      style={{
                        fontSize: "20px",
                      }}
                    />
                  )}

                  <Button
                    type="button"
                    className="theme-btn-default leading-none w-full text-gray-100 h-[48px] font-normal text-[22px] rounded-lg mb-[50px]"
                    label="Cancel"
                    onClick={() => setVisible(false)}
                    disabled={removeUserLoading}
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

export default DeleteUserFromBrand;
