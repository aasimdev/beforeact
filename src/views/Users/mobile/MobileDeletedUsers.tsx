// React Imports
import React from "react";
// Utils
import { formatDate } from "../../../utils";

interface Props {
  deletedUsers: any;
}

const MobileDeletedUsers: React.FC<Props> = (props) => {
  const { deletedUsers } = props;

  return (
    <>
      {deletedUsers?.length === 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-sidebar my-6">
          <h3 className="text-[27px] text-blue font-medium">
            No Deleted Users
          </h3>
        </div>
      ) : (
        deletedUsers?.map((user: any, index: number) => {
          const lastIndex = deletedUsers?.length - 1;
          return (
            <div
              className={`bg-white p-6 mt-6 rounded-lg ${
                lastIndex === index ? "mb-16" : "mb-0"
              }`}
              key={user?.id}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg w-[48px] h-[48px] flex items-center justify-center text-gray bg-body-2">
                  <div className="flex items-center justify-center">
                    <i
                      style={{
                        fontSize: "24px",
                      }}
                      className="bx bx-user"
                    ></i>
                  </div>
                </div>
                <div>
                  <div className="text-gray text-[22px] font-semibold">
                    {user?.userName}
                  </div>
                  <div className="text-[14px] text-gray-100">
                    {formatDate(user?.dateJoined)}
                  </div>
                </div>
              </div>
              <div className="text-gray-200 text-[18px] font-medium">
                {user?.email}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default MobileDeletedUsers;
