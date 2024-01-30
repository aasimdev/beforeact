import { useEffect, useState } from "react";
import BrandImage from "../../../../assets/images/brands_logo.svg";
import Title from "../../../../components/Title";
import {
  capitalizeFirstLetter,
  formatDate,
  generateColor,
} from "../../../../utils";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../../../components/Breadcrumb/Index";
import {
  useAddUsersToTenantMutation,
  useGetTenantUsersQuery,
} from "../../../../redux/api/brandApiSlice";
import OverlayLoader from "../../../../components/Spinner/OverlayLoader";
import { FiUser } from "react-icons/fi";
import { useGetAllUsersQuery } from "../../../../redux/api/userApiSlice";
import { Button } from "primereact/button";
import DotLoader from "../../../../components/Spinner/dotLoader";
import { Dropdown } from "primereact/dropdown";
import ToastAlert from "../../../../components/ToastAlert";
import DeleteUserFromBrand from "../DeleteUserFromBrand";

interface UserDT {
  userName: any;
  email: string | null;
  dateJoined: any;
  id: any;
  deleted: boolean;
}

const MobileEditBrand = () => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  // states
  const [title, setTitle] = useState("");
  const [tenantUsers, setTenantUsers] = useState<UserDT[]>([]);
  const [dropDownUser, setDropDownUser] = useState<any>("");
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [openCard, setOpenCard] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDT | null>(null);

  useEffect(() => {
    const lastSegment = pathname.split("/").pop();
    const capitalizedLastSegment = lastSegment
      ? capitalizeFirstLetter(lastSegment)
      : "";
    setTitle(capitalizedLastSegment);
  }, [pathname]);

  // GET TENANT USERS
  const { data, isLoading } = useGetTenantUsersQuery(id);

  useEffect(() => {
    if (data) {
      // Find all users who are not deleted
      const allUsers: UserDT[] = data?.users;
      const activeUsers: UserDT[] = allUsers.filter((user) => !user.deleted);
      setTenantUsers(activeUsers);
    }
  }, [data]);

  // GET ALL USERS
  const { data: usersData, isLoading: dataLoading } = useGetAllUsersQuery({});

  useEffect(() => {
    if (usersData?.users) {
      // Find all users who are not deleted
      const users = usersData?.users?.filter((user: any) => !user.deleted);
      setActiveUsers(users);
    }
  }, [usersData]);

  // ADD USER TO ROLE API BIND
  const [addUserToBrand, { isLoading: createUserLoading }] =
    useAddUsersToTenantMutation();

  const addUserToRoleHandler = async () => {
    const payload = {
      tenantId: id,
      userName: dropDownUser?.userName,
    };

    try {
      const user: any = await addUserToBrand(payload);

      if (user?.data === null) {
        setDropDownUser("");
        setOpenCard(false);
        ToastAlert("User Created Successfully", "success");
      }
      if (user?.error) {
        ToastAlert(user?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Creating User Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  const deleteUser = (data: UserDT) => {
    setSelectedUser(data);
    setVisible(true);
  };

  return (
    <>
      {(isLoading || dataLoading) && <OverlayLoader />}

      <div className="w-full flex-1">
        <Title brand={BrandImage} title={title} mobile={true} />
        <Breadcrumb mainLabel="Manage Brands" label="Brands" url="/brands" />
        <div className="bg-white p-3 rounded-lg shadow-sidebar mt-6">
          <h3 className="text-[24px] text-blue font-medium">Users in Brand</h3>
        </div>
        <div className={`${openCard ? "my-6" : "mb-6"}`}>
          <div
            className={` ${openCard ? "p-4" : "pt-4 pb-4"} ${
              openCard ? "bg-white" : "bg-transparent"
            } rounded-lg`}
          >
            {openCard && (
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Dropdown
                    value={dropDownUser}
                    onChange={(e) => setDropDownUser(e.value)}
                    options={activeUsers}
                    optionLabel="userName"
                    placeholder="Select a user"
                    className="theme-input shadow-btn w-full"
                  />

                  <Button
                    type="button"
                    label="Cancel"
                    className="theme-btn-default leading-none w-full my-4"
                    onClick={() => {
                      setOpenCard(false);
                      setDropDownUser("");
                    }}
                  />

                  {createUserLoading ? (
                    <div
                      className="theme-btn"
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
                      onClick={addUserToRoleHandler}
                      disabled={createUserLoading}
                      className="theme-btn w-full"
                      label="Create"
                    />
                  )}
                </div>
              </div>
            )}

            {!openCard && (
              <Button
                type="button"
                label="+ New User"
                className="theme-btn w-full text-center flex justify-center"
                disabled={createUserLoading}
                onClick={() => {
                  setOpenCard(true);
                }}
              />
            )}
          </div>
        </div>

        {tenantUsers?.length === 0 ? (
          <div className="bg-white p-3 rounded-lg shadow-sidebar mt-6">
            <h3 className="text-[24px] text-blue font-medium">
              No users in brand
            </h3>
          </div>
        ) : (
          tenantUsers?.map((user) => {
            const randomColor = generateColor(data?.userName);

            return (
              <div className="bg-white p-2 rounded-lg mt-4" key={user?.id}>
                <div className="flex items-center gap-3 my-2">
                  <div
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: randomColor.background,
                      color: randomColor.color,
                    }}
                  >
                    <FiUser />
                  </div>
                  <div>
                    <div
                      style={{
                        color: randomColor.color,
                        fontWeight: 600,
                        fontSize: "18px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
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
                <Button
                  label="Delete"
                  text
                  className="rounded-lg py-[6px] px-[14px] my-2"
                  style={{
                    backgroundColor: randomColor.background,
                    color: randomColor.color,
                  }}
                  onClick={() => deleteUser(user)}
                />
              </div>
            );
          })
        )}
      </div>
      {/* Delete User Modal */}
      <DeleteUserFromBrand
        visible={visible}
        setVisible={setVisible}
        selectedUser={selectedUser}
        title={title}
        id={id}
        mobile={true}
      />
    </>
  );
};

export default MobileEditBrand;
