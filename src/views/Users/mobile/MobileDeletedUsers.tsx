// React Imports
import React from "react";
// Prime React Imports
import { FiUser } from "react-icons/fi";
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
        <div className="bg-white py-2 rounded-lg shadow-sidebar mt-6">
          <h3 className="text-[24px] text-blue font-medium">
            No deleted users
          </h3>
        </div>
      ) : (
        deletedUsers?.map((user: any) => {
          return (
            <div className="bg-white py-2 px-3 rounded-lg mt-4" key={user?.id}>
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
          );
        })
      )}
    </>
  );
};

export default MobileDeletedUsers;
