// React Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Prime React Imports
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
// Redux
import {
  useCreateRoleMutation,
  useGetAllRolesQuery,
} from "../../redux/api/roleApiSlice";
// Custom
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import ToastAlert from "../../components/ToastAlert";
import DotLoader from "../../components/Spinner/dotLoader";
import Title from "../../components/Title";
import DeleteRoleModal from "./components/DeleteRoleModal";
// Assets
import RoundImage from "../../assets/images/roles_logo.svg";
import MobileRoles from "./mobile/MobileRoles";
import Layout from "../../components/Layout";

interface RolesDT {
  name: string;
  users: number;
  manageUsers: boolean;
  manageRoles: boolean;
  manageTenants: boolean;
}

const Roles = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<RolesDT[]>([]);
  const [newRole, setNewRole] = useState(false);
  const [newUserCheckBox, setNewUserCheckBox] = useState({
    manageUsers: false,
    manageRoles: false,
    manageTenants: false,
  });
  const [selectedRole, setSelectedRole] = useState<RolesDT | null>(null);
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);

  // GET ALL ROLES
  const { data, isLoading } = useGetAllRolesQuery({});

  useEffect(() => {
    if (data) {
      const roles = data?.roles?.map((role: any) => ({
        ...role,
        users: 3,
        manageUsers: false,
        manageRoles: true,
        manageTenants: false,
      }));

      setRoles(roles);
    }
  }, [data]);

  // CREATE NEW ROLE API BIND
  const [createNewRole, { isLoading: createRoleLoading }] =
    useCreateRoleMutation();

  const CreateRoleHandler = async (e: any) => {
    e.preventDefault();

    const payload = {
      name: e.currentTarget.name.value,
      users: e.currentTarget.users.value,
      manageUsers: newUserCheckBox.manageUsers,
      manageRoles: newUserCheckBox.manageRoles,
      manageTenants: newUserCheckBox.manageTenants,
    };

    try {
      const role: any = await createNewRole(payload);

      if (role?.data === null) {
        setNewRole(false);
        setNewUserCheckBox({
          manageUsers: false,
          manageRoles: false,
          manageTenants: false,
        });
        ToastAlert("Role Created Successfully", "success");
      }
      if (role?.error) {
        ToastAlert(role?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Creating New Role Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  const DeleteColumn = (data: RolesDT) => (
    <Button
      label="Delete"
      text
      style={{
        width: "5rem",
      }}
      onClick={() => {
        setSelectedRole(data);
        setConfirmPopup(true);
      }}
    />
  );

  const handleCheckboxChange = (clickedRole: RolesDT, field: any) => {
    setRoles((prevRoles) =>
      prevRoles.map((role: any) =>
        role.name === clickedRole.name
          ? { ...role, [field]: !role[field] }
          : role
      )
    );
  };

  const checkboxTemplate = (field: string) => (data: any) => {
    return (
      <Checkbox
        onChange={() => handleCheckboxChange(data, field)}
        checked={data[field]}
      />
    );
  };

  return (
    <>
      <Layout>
        {isLoading && <OverlayLoader />}

        <Title brand={false} title="Roles" image={RoundImage} />
        <div className="bg-white p-6 rounded-lg shadow-sidebar mt-6">
          <DataTable value={roles} className="theme-table">
            <Column field="name" header="NAME"></Column>
            <Column field="users" header="USERS"></Column>
            <Column
              field="manageUsers"
              header="MANAGE USERS"
              body={checkboxTemplate("manageUsers")}
            ></Column>
            <Column
              field="manageRoles"
              header="MANAGE ROLES"
              body={checkboxTemplate("manageRoles")}
            ></Column>
            <Column
              field="manageTenants"
              header="MANAGE TENANTS"
              body={checkboxTemplate("manageTenants")}
            ></Column>
            <Column
              field="Edit"
              body={(data) => (
                <Button
                  label="Edit"
                  text
                  style={{
                    width: "5rem",
                  }}
                  onClick={() => {
                    navigate(`/roles/${data.id}`);
                  }}
                />
              )}
            ></Column>
            <Column field="Delete" body={(data) => DeleteColumn(data)}></Column>
          </DataTable>

          {/* NEW Role ADD */}
          {newRole && (
            <div className="py-1 px-6 border-b-gray-300 border-b">
              <form
                className="flex items-center gap-5"
                onSubmit={CreateRoleHandler}
                autoComplete="off"
              >
                <InputText
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="theme-input shadow-btn w-56"
                />
                <InputText
                  type="number"
                  id="users"
                  placeholder="Users"
                  className="theme-input shadow-btn w-32"
                />
                <Checkbox
                  inputId="manageUsers"
                  checked={newUserCheckBox.manageUsers}
                  onChange={() =>
                    setNewUserCheckBox((prev) => ({
                      ...prev,
                      manageUsers: !prev.manageUsers,
                    }))
                  }
                />
                <label htmlFor="manageUsers">Users</label>
                <Checkbox
                  inputId="manageRoles"
                  checked={newUserCheckBox.manageRoles}
                  onChange={() =>
                    setNewUserCheckBox((prev) => ({
                      ...prev,
                      manageRoles: !prev.manageRoles,
                    }))
                  }
                />
                <label htmlFor="manageRoles">Roles</label>

                <Checkbox
                  inputId="manageTenants"
                  checked={newUserCheckBox.manageTenants}
                  onChange={() =>
                    setNewUserCheckBox((prev) => ({
                      ...prev,
                      manageTenants: !prev.manageTenants,
                    }))
                  }
                />
                <label htmlFor="manageTenants">Tenants</label>

                <div className="flex items-center gap-2 ml-2">
                  {createRoleLoading ? (
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
                      type="submit"
                      label="Create"
                      className="theme-btn leading-none"
                      disabled={createRoleLoading}
                    />
                  )}

                  <Button
                    type="button"
                    label="Cancel"
                    className="theme-btn-default leading-none"
                    disabled={createRoleLoading}
                    onClick={() => {
                      setNewRole(false);
                      setNewUserCheckBox({
                        manageUsers: false,
                        manageRoles: false,
                        manageTenants: false,
                      });
                    }}
                  />
                </div>
              </form>
            </div>
          )}

          <div className="py-4 px-6 border-b-gray-300 border-b transition-all duration-300 hover:bg-blue-200">
            <Button
              label="New Role"
              icon="bx bx-plus"
              text
              className="p-0 text-lg text-blue block w-full text-left hover:bg-transparent focus:outline-0 focus:ring-0"
              onClick={() => setNewRole(true)}
            />
          </div>
        </div>
        {/* Delete Role Modal */}
        <DeleteRoleModal
          confirmPopup={confirmPopup}
          setConfirmPopup={setConfirmPopup}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      </Layout>

      {/* Mobile Version of Roles */}
      <div className="px-4 pt-4 pb-10 sm:p-8 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileRoles />
      </div>
    </>
  );
};

export default Roles;
