// React Imports
import React from "react";
// Prime React Imports
import { Button } from "primereact/button";
// Custom
import ConfirmPopup from "../../../components/ConfirmPopup";
import DotLoader from "../../../components/Spinner/dotLoader";

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
        {!mobile ? (
          <>
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
            <div className="flex items-center justify-center gap-6 mt-10">
              <Button
                type="button"
                className="theme-btn-default"
                label="Cancel"
                onClick={() => setConfirmPopup(false)}
                // disabled={deleteUserLoading}
                style={{
                  fontSize: "22px",
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
                label="Yes, delete this role"
                onClick={handleDelete}
                style={{
                  fontSize: "22px",
                }}
              />
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
                  <div>You are about to delete the: </div>
                  <div className="text-blue font-semibold">
                    {selectedRole?.name}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center flex-col justify-center gap-6 mt-10">
                  {false ? (
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
                    // disabled={deleteUserLoading}
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

export default DeleteRoleModal;
