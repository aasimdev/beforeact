// React Imports
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// Prime React Imports
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
// Assets
import BrandImage from "../../../assets/images/brands_logo.svg";
// Utils
import {
  capitalizeFirstLetter,
  formatDate,
  generateColor,
} from "../../../utils";
// Redux
import {
  useAddUsersToTenantMutation,
  useGetTenantUsersQuery,
} from "../../../redux/api/brandApiSlice";
import { useGetAllUsersQuery } from "../../../redux/api/userApiSlice";
// Custom
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import DotLoader from "../../../components/Spinner/dotLoader";
import ToastAlert from "../../../components/ToastAlert";
import DeleteUserFromBrand from "../components/DeleteUserFromBrand";
import MobileSideBar from "../../../components/MobileSideBar";

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
      <MobileSideBar />
      <div className="w-full flex-1">
        <Title brand={BrandImage} title={title} mobile={true} />
        <Breadcrumb mainLabel="Manage Brands" label="Brands" url="/brands" />
        <div className="bg-white p-4 rounded-lg shadow-sidebar">
          <h3 className="text-[27px] text-blue font-medium">Users in Brand</h3>
        </div>

        {tenantUsers?.length === 0 ? (
          <div className="bg-white p-4 rounded-lg shadow-sidebar my-6">
            <h3 className="text-[27px] text-blue font-medium">
              No Users in Brand
            </h3>
          </div>
        ) : (
          tenantUsers?.map((user,) => {
            const randomColor = generateColor(data?.userName);

            return (
              <div className="bg-white p-6 mt-6 rounded-lg" key={user?.id}>
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-lg w-[48px] h-[48px] flex items-center justify-center"
                    style={{
                      backgroundColor: randomColor.background,
                      color: randomColor.color,
                    }}
                  >
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
                    <div
                      className="text-[22px] font-semibold"
                      style={{
                        color: randomColor.color,
                      }}
                    >
                      {user?.userName}
                    </div>
                    <div className="text-[14px] text-gray-100 font-normal">
                      {formatDate(user?.dateJoined)}
                    </div>
                  </div>
                </div>
                <div className="text-gray-200 text-[20px] font-medium my-4">
                  {user?.email}
                </div>
                <Button
                  label="Delete"
                  text
                  className="rounded-lg py-[6px] px-[14px] h-[40px]"
                  style={{
                    backgroundColor: randomColor.background,
                    color: randomColor.color,
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                  onClick={() => deleteUser(user)}
                />
              </div>
            );
          })
        )}
      </div>
      <div className={`${openCard ? "mt-6 mb-16" : "mb-16"}`}>
        <div
          className={` ${openCard ? "p-4" : "pt-6"} ${
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
                  className="theme-input shadow-btn w-full mb-6"
                />

                <Button
                  type="button"
                  label="Cancel"
                  className="theme-btn-default leading-none w-full mb-4 text-gray-100 h-[48px] font-normal text-[22px] rounded-lg"
                  onClick={() => {
                    setOpenCard(false);
                    setDropDownUser("");
                  }}
                />

                {createUserLoading ? (
                  <div className="theme-btn h-[48px] flex items-center justify-center">
                    <DotLoader color="#fff" size={12} />
                  </div>
                ) : (
                  <Button
                    onClick={addUserToRoleHandler}
                    disabled={createUserLoading}
                    className="theme-btn w-full h-[48px]"
                    label="Add"
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
