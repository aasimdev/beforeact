// React Imports
import { useEffect, useState } from "react";
import Title from "../../components/Title";
// Prime React Imports
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
// Redux
import { useGetAllRolesQuery } from "../../redux/api/roleApiSlice";
// Custom
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import { InputText } from "primereact/inputtext";

interface RolesDT {
  name: string;
  users: number;
  manageUsers: boolean;
  manageRoles: boolean;
  manageTenants: boolean;
}

const Roles = () => {
  const [roles, setRoles] = useState<RolesDT[]>([]);

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

  const textEditor = (options: any, type: string) => {
    return (
      <InputText
        type={type}
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback!(e.target.value)
        }
      />
    );
  };

  const onRowEditComplete = async (event: any) => {
    let _products = [...roles];
    let { newData, index } = event;

    _products[index] = newData as RolesDT;

    console.log("newData", newData);
  };

  return (
    <>
      {isLoading && <OverlayLoader />}

      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 lg:ml-80">
          <Header />
          <Title brand={false} title="Roles" />
          <div className="bg-white p-6 rounded-lg shadow-sidebar mt-6">
            <DataTable
              value={roles}
              editMode="row"
              dataKey="name"
              onRowEditComplete={onRowEditComplete}
              className="theme-table"
              rowEditorInitIcon={
                <button
                  style={{
                    color: "#696cff",
                    fontSize: "18px",
                    lineHeight: "28px",
                    fontWeight: 500,
                  }}
                >
                  Edit
                </button>
              }
            >
              <Column
                field="name"
                header="NAME"
                editor={(options) => textEditor(options, "text")}
              ></Column>
              <Column
                field="users"
                header="USERS"
                editor={(options) => textEditor(options, "number")}
              ></Column>
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
              <Column rowEditor></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;
