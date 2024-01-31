import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { FiUser } from "react-icons/fi";
import { formatDate } from "../../../utils";
import { FaEye } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  activeUsers: any;
}

const MobileUserList: React.FC<Props> = (props) => {
  const { activeUsers } = props;

  const [openCard, setOpenCard] = useState<any>(false);

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
                <div>
                  {!openCard || openCard !== user.id ? (
                    <div onClick={() => handleCardToggle(user.id)}>
                      {user?.userName}
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
                        <div className="text-gray-200 text-[18px] font-medium">
                          {user?.email}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-end">
                  <div className="flex justify-end">
                    <div onClick={() => handleCardToggle(user.id)}>
                      {openCard === user.id ? (
                        <div className="text-gray pointer">
                          <IoCloseSharp />
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
    </>
  );
};

export default MobileUserList;
