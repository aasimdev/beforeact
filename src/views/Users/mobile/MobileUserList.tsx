import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { FiUser } from "react-icons/fi";
import { formatDate } from "../../../utils";
import { FaEye } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "primereact/button";
import DeleteUserModal from "../components/DeleteUserModal";
import MobileEditUser from "./MobileEditUser";

interface Props {
  activeUsers: any;
}

const MobileUserList: React.FC<Props> = (props) => {
  const { activeUsers } = props;

  const [openCard, setOpenCard] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const [viewUser, setViewUser] = useState<boolean>(false);

  const handleCardToggle = (id: number) => {
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <>
      <div className="bg-white rounded-lg py-3 px-3 mb-12">
        {activeUsers?.map((user: any) => {
          return (
            <div key={user?.id}>
              <div
                className={`px-2 flex justify-between ${
                  !openCard ? "items-center" : ""
                }`}
              >
                <div className="w-full">
                  {!openCard || openCard !== user.id ? (
                    <div onClick={() => handleCardToggle(user.id)}>
                      <div className="text-gray font-normal">
                        {user?.userName}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg p-3 bg-body-2 text-gray">
                            <FiUser />
                          </div>
                          <div>
                            <div className="text-gray text-[16px] font-semibold m-0 p-0">
                              {user?.userName}
                            </div>
                            <div className="text-[16px] text-gray-100 m-0 p-0">
                              {formatDate(user?.dateJoined)}
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-200 my-1 text-[18px] font-medium">
                          {user?.email}
                        </div>

                        <div
                          className="bg-body-2 rounded-lg my-2 py-2 px-3 w-full flex flex-col text-center"
                          style={{
                            width: "100%",
                          }}
                        >
                          <div className="text-gray w-full font-black">
                            Admin'
                            <span className="font-medium">s Brands</span>
                          </div>
                          <div className="my-2">No Brands Yet!</div>
                        </div>

                        <div className="mt-4 mb-1 flex items-center gap-3">
                          <Button
                            type="button"
                            label="Delete"
                            className="theme-btn-default leading-none"
                            style={{
                              padding: "12px 24px",
                              fontSize: "16px",
                            }}
                            onClick={() => {
                              setSelectedUser(user);
                              setConfirmPopup(true);
                            }}
                          />
                          <Button
                            className="theme-btn"
                            style={{
                              padding: "7px 24px",
                              fontSize: "16px",
                              background: "#03C3EC",
                            }}
                            label="Edit"
                            onClick={() => {
                              setSelectedUser(user);
                              setViewUser(true);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-end">
                  <div className="flex justify-end">
                    <div onClick={() => handleCardToggle(user.id)}>
                      {openCard === user.id ? (
                        <div
                          className="text-gray"
                          style={{
                            position:
                              openCard === user.id ? "relative" : "static",
                            top: openCard === user.id ? "5px" : "0",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              right: "0",
                              top: "0",
                            }}
                          >
                            <IoCloseSharp />
                          </div>
                        </div>
                      ) : (
                        <div className="text-blue pointer">
                          <FaEye />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Divider className="my-3" />
            </div>
          );
        })}
      </div>
      {/* Edit User Modal */}
      <MobileEditUser
        confirmPopup={viewUser}
        setConfirmPopup={setViewUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {/* Delete User Modal */}
      <DeleteUserModal
        confirmPopup={confirmPopup}
        setConfirmPopup={setConfirmPopup}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        mobile={true}
      />
    </>
  );
};

export default MobileUserList;
