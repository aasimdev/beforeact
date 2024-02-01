// React Imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Prime React Imports
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
// Redux
import {
  useAddClientToRoleMutation,
  useAddUserToRoleMutation,
  useGetRoleByIdQuery,
  useRemoveClaimFromRoleMutation,
} from "../../../redux/api/roleApiSlice";
import { useGetAllUsersQuery } from "../../../redux/api/userApiSlice";
// Utils
import { formatDate } from "../../../utils";
// Custom
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import ToastAlert from "../../../components/ToastAlert";
import DotLoader from "../../../components/Spinner/dotLoader";
import DeleteUserFromRole from "./DeleteUserFromRole";
// Assets
import RolesImage from "../../../assets/images/roles_logo.svg";
import MobileEditRole from "../mobile/MobileEditRole";

const EditRole = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState(false);
  const [dropDownUser, setDropDownUser] = useState<any>("");
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: boolean;
  }>({});

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

  const addUserToRoleHandler = async () => {
    const payload = {
      id,
      name: dropDownUser?.userName,
    };

    try {
      const user: any = await addUserToRole(payload);

      if (user?.data === null) {
        setNewUser(false);
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

  const handleCheckboxChange = (permission: any) => {
    setSelectedPermissions((prevPermissions: any) => ({
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));

    // Data Send to API
    handlePermissionStatus(permission, !selectedPermissions[permission]);
  };

  // CLAIM ROLE API BIND
  const [claimRole, { isLoading: claimRoleLoading }] =
    useAddClientToRoleMutation();

  // REMOVE CLAIM ROLE API BIND
  const [removeClaimRole, { isLoading: removeClaimRoleLoading }] =
    useRemoveClaimFromRoleMutation();

  const handlePermissionStatus = async (permission: any, status: any) => {
    const payload = {
      id,
      name: permission,
    };

    if (status) {
      try {
        const role: any = await claimRole(payload);

        if (role?.data === null) {
          ToastAlert("Role Claim Successfully", "success");
        }
        if (role?.error) {
          ToastAlert(role?.error?.data?.title, "error");
        }
      } catch (error) {
        console.error("Role Claim Error:", error);
        ToastAlert("Something went wrong", "error");
      }
    }
    if (!status) {
      try {
        const role: any = await removeClaimRole(payload);

        if (role?.data === null) {
          ToastAlert("Remove Role Successfully", "success");
        }
        if (role?.error) {
          ToastAlert(role?.error?.data?.title, "error");
        }
      } catch (error) {
        console.error("Removing Role Error:", error);
        ToastAlert("Something went wrong", "error");
      }
    }
  };

  const DeleteColumn = (data: any) => (
    <Button
      label="Delete"
      text
      onClick={() => {
        setSelectedUser(data);
        setConfirmPopup(true);
      }}
    />
  );

  return (
    <>
      {(isLoading || dataLoading) && <OverlayLoader />}

      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 lg:ml-80 lg:block md:block sm:block  hidden">
          <Header />
          <Title brand={false} title={data?.role?.name} image={RolesImage} />
          <Breadcrumb mainLabel="Edit Roles" label="Roles" url="/roles" />
          <div>
            <div className="mt-4 text-gray text-[18px] font-bold">NAME</div>
            <div className="mt-2 text-gray text-[14px]">
              <InputText
                type="text"
                id="name"
                placeholder="Name"
                className="theme-input shadow-btn w-full"
                value={data?.role?.name}
                disabled
              />
            </div>
          </div>
          <div>
            <div className="bg-white p-4 rounded-lg shadow-sidebar mt-6">
              <h3 className="pl-4 text-[22px] text-blue pb-6 font-normal">
                Users in Role
              </h3>
              <DataTable value={data?.users} className="theme-table">
                <Column field="userName" header="USER NAME"></Column>
                <Column field="email" header="EMAIL"></Column>
                <Column
                  field="dateJoined"
                  header="DATE JOINED"
                  body={(data) => formatDate(data.dateJoined)}
                ></Column>
                <Column
                  field="Delete"
                  body={(data) => DeleteColumn(data)}
                ></Column>
              </DataTable>

              {newUser && (
                <div className="py-1 px-6 flex gap-8 border-b-gray-300 border-b">
                  <Dropdown
                    value={dropDownUser}
                    onChange={(e) => setDropDownUser(e.value)}
                    options={activeUsers}
                    optionLabel="userName"
                    placeholder="Select a user"
                    className="theme-input shadow-btn w-60"
                  />

                  {createUserLoading ? (
                    <div
                      className="theme-btn leading-none"
                      style={{
                        height: "45px",
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
                      label="Create"
                      className="theme-btn leading-none"
                      disabled={createUserLoading}
                    />
                  )}

                  <Button
                    type="button"
                    label="Cancel"
                    className="theme-btn-default leading-none"
                    disabled={createUserLoading}
                    onClick={() => {
                      setNewUser(false);
                      setDropDownUser("");
                    }}
                  />
                </div>
              )}

              <div className="py-4 px-6 border-b-gray-300 border-b transition-all duration-300 hover:bg-blue-200">
                <Button
                  label="New User"
                  icon="bx bx-plus"
                  text
                  className="p-0 text-lg text-blue block w-full text-left hover:bg-transparent focus:outline-0 focus:ring-0"
                  onClick={() => setNewUser(true)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white p-4 rounded-lg shadow-sidebar mt-6">
              <h3 className="pl-4 text-[22px] text-blue font-normal">
                Permissions
              </h3>
              <Divider type="solid" />

              {data?.permissions?.map((permission: any) => {
                const isClaimed = data?.claims?.some(
                  (claim: any) => claim.value === permission
                );

                return (
                  <div key={permission}>
                    <div className="pl-4 flex items-center gap-24">
                      <div className="text-gray w-36 text-[18px] font-medium">
                        {permission}
                      </div>
                      <div className="mt-2 text-gray text-[14px]">
                        <Checkbox
                          inputId={permission}
                          checked={
                            isClaimed ? true : selectedPermissions[permission]
                          }
                          onChange={() => handleCheckboxChange(permission)}
                          disabled={claimRoleLoading || removeClaimRoleLoading}
                        />
                      </div>
                    </div>
                    <Divider type="solid" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <DeleteUserFromRole
          confirmPopup={confirmPopup}
          setConfirmPopup={setConfirmPopup}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          roleId={id}
        />
      </div>
      {/* Mobile Version of Edit Role */}
      <div className="p-8 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileEditRole />
      </div>
    </>
  );
};

export default EditRole;
