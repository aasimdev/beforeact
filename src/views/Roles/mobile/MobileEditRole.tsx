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
import RolesImage from "../../../assets/images/roles_logo.svg";
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

      <div className="my-2">
        <Title brand={false} title={data?.role?.name} image={RolesImage} />
        <Breadcrumb mainLabel="Edit Roles" label="Roles" url="/roles" />
      </div>
      <div
        className={` ${openCard ? "p-4" : "pb-4"} ${
          openCard ? "bg-white" : "bg-transparent"
        } rounded-lg  ${openCard ? "mb-6" : ""}`}
      >
        {openCard && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <form className="" onSubmit={addUserToRoleHandler}>
                  <div className="mb-2">
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
                      type="submit"
                      disabled={createUserLoading}
                      className="theme-btn w-full p-2"
                      label="Create"
                    />
                  )}
                </form>
              </div>
            </div>
          </>
        )}
        {!openCard && (
          <Button
            className="theme-btn w-full p-2 text-center flex justify-center"
            onClick={() => {
              setOpenCard(true);
            }}
          >
            + New User
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          className="shadow-none border-0 font-medium"
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
          className="shadow-none border-0 font-medium"
          style={{
            backgroundColor:
              toggleValue === "permissions" ? "#696CFF" : "transparent",
            color: toggleValue === "permissions" ? "#fff" : "#697A8D",
          }}
        >
          Permissions
        </Button>
      </div>

      <div className="my-4 mb-10">
        {toggleValue === "users" ? (
          <>
            {/* All User Show */}
            <div className="bg-white rounded-lg py-2 px-3">
              <h3 className="text-[28px] text-blue px-2 pb-2 font-medium">
                Users in Role
              </h3>
              <Divider className="my-1" />

              {data?.users?.length === 0 ? (
                <h3 className="text-[16px] flex text-gray-200 justify-center items-center py-2">
                  No Users in Role
                </h3>
              ) : (
                data?.users?.map((user: any) => {
                  return (
                    <div className="mt-4" key={user?.id}>
                      <div className="flex items-center justify-between my-2 px-2">
                        <div>{user?.userName}</div>
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
                      <Divider className="mt-1" />
                    </div>
                  );
                })
              )}
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
