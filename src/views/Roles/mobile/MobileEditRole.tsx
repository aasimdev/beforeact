// React Imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Prime React Imports
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
// Redux
import {
  useAddUserToRoleMutation,
  useGetRoleByIdQuery,
} from "../../../redux/api/roleApiSlice";
import { useGetAllUsersQuery } from "../../../redux/api/userApiSlice";
// React Icons
import { RiDeleteBinLine } from "react-icons/ri";
// Assets
import RolesImage from "../../../assets/images/mobile_roles.svg";
// Custom
import MobileSideBar from "../../../components/MobileSideBar";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import DotLoader from "../../../components/Spinner/dotLoader";
import ToastAlert from "../../../components/ToastAlert";
import DeleteUserFromRole from "../components/DeleteUserFromRole";
import MobileEditPermission from "./MobileEditPermission";

const MobileEditRole = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [toggleValue, setToggleValue] = useState("users");
  const [openCard, setOpenCard] = useState(false);
  const [dropDownUser, setDropDownUser] = useState<any>("");
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>({});

  // GET ROLE
  const { data, isLoading } = useGetRoleByIdQuery(id);

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
  const [addUserToRole, { isLoading: createUserLoading }] =
    useAddUserToRoleMutation();

  const addUserToRoleHandler = async (e: any) => {
    e.preventDefault();

    const payload = {
      id,
      name: dropDownUser?.userName,
    };

    try {
      const user: any = await addUserToRole(payload);

      if (user?.data === null) {
        setOpenCard(false);
        setDropDownUser("");
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
  return (
    <>
      {(isLoading || dataLoading) && <OverlayLoader />}

      <MobileSideBar />
      <Header />

      <div>
        <Title brand={false} title={data?.role?.name} image={RolesImage} />
        <Breadcrumb mainLabel="Edit Roles" label="Roles" url="/roles" />
      </div>

      <div className="flex items-center my-6">
        <Button
          className="shadow-none border-0 text-[16px] font-normal rounded-lg"
          style={{
            backgroundColor:
              toggleValue === "users" ? "#696CFF" : "transparent",
            color: toggleValue === "users" ? "#fff" : "#697A8D",
          }}
          onClick={() => {
            setToggleValue("users");
          }}
        >
          Users
        </Button>
        <Button
          onClick={() => {
            setToggleValue("permissions");
          }}
          className="shadow-none border-0 text-[16px] font-normal rounded-lg"
          style={{
            backgroundColor:
              toggleValue === "permissions" ? "#696CFF" : "transparent",
            color: toggleValue === "permissions" ? "#fff" : "#697A8D",
          }}
        >
          Permissions
        </Button>
      </div>

      <div className="mb-20">
        {toggleValue === "users" ? (
          <>
            {/* All User Show */}
            <div
              className={`bg-white rounded-lg pt-4 px-4 ${
                openCard ? "" : "pb-4"
              }`}
            >
              <h3 className="text-[27px] text-blue p-2 font-medium">
                Users in Role
              </h3>
              <Divider className="my-1" />
              {data?.users?.length === 0 ? (
                <h3 className="text-[27px] text-blue py-4 px-2 font-medium">
                  No Users in Role
                </h3>
              ) : (
                data?.users?.map((user: any) => {
                  return (
                    <div className="mt-4" key={user?.id}>
                      <div className="flex items-center justify-between my-4 px-2">
                        <div className="text-[18px] font-normal text-gray">
                          {user?.userName}
                        </div>
                        <div
                          className="text-blue text-lg"
                          onClick={() => {
                            setSelectedUser(user);
                            setConfirmPopup(true);
                          }}
                        >
                          <RiDeleteBinLine />
                        </div>
                      </div>
                      <Divider className="my-1" />
                    </div>
                  );
                })
              )}
              <div
                className={` ${openCard ? "" : "pb-4"} ${
                  openCard ? "bg-white" : "bg-transparent"
                } rounded-lg  ${openCard ? "mb-12 mt-6" : ""}`}
              >
                {openCard && (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <form className="" onSubmit={addUserToRoleHandler}>
                          <div className="mb-6">
                            <Dropdown
                              value={dropDownUser}
                              onChange={(e) => setDropDownUser(e.value)}
                              options={activeUsers}
                              optionLabel="userName"
                              placeholder="Select a user"
                              className="theme-input shadow-btn w-full"
                            />
                          </div>
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
                              type="submit"
                              disabled={createUserLoading}
                              className="theme-btn w-full h-[48px]"
                              label="Create"
                            />
                          )}
                        </form>
                        <Divider className="my-6" />
                      </div>
                    </div>
                  </>
                )}
                {!openCard && (
                  <div className="py-4 pl-4 border-b-gray-300 border-b transition-all duration-300 hover:bg-blue-200">
                    <Button
                      label="New User"
                      icon="bx bx-plus"
                      text
                      className="p-0 text-lg text-blue block w-full text-left hover:bg-transparent focus:outline-0 focus:ring-0"
                      onClick={() => setOpenCard(true)}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <MobileEditPermission
              permissions={data?.permissions}
              claims={data?.claims}
              id={id}
            />
          </>
        )}
      </div>

      <DeleteUserFromRole
        confirmPopup={confirmPopup}
        setConfirmPopup={setConfirmPopup}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        roleId={id}
        mobile={true}
      />
    </>
  );
};

export default MobileEditRole;
