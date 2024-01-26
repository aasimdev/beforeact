import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import Sidebar from "../../components/Sidebar";

interface RolesDT {
  name: string;
  users: number;
  manageUsers: boolean;
  manageRoles: boolean;
  manageTenants: boolean;
}

const Roles = () => {
  const [roles, setRoles] = useState<RolesDT[]>([]);

  useEffect(() => {
    setRoles([
      {
        name: "admin",
        users: 2,
        manageUsers: true,
        manageRoles: true,
        manageTenants: true,
      },
      {
        name: "operator",
        users: 2,
        manageUsers: true,
        manageRoles: true,
        manageTenants: false,
      },
      {
        name: "support",
        users: 2,
        manageUsers: true,
        manageRoles: false,
        manageTenants: false,
      },
    ]);
  }, []);

  const handleCheckboxChange = (clickedRole: RolesDT, field: any) => {
    setRoles((prevRoles) =>
      prevRoles.map((role: any) =>
        role.name === clickedRole.name
          ? { ...role, [field]: !role[field] }
          : role
      )
    );
  };

  const actionBodyTemplate = () => {
    return (
      <>
        <Button label="Edit" text />
        <Button label="Delete" text />
      </>
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
      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 lg:ml-80">
          <Header />
          <Title brand={false} title="Roles" />
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
              <Column body={actionBodyTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;
