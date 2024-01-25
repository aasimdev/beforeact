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
  manageusers: boolean;
  manageroles: boolean;
  managetenants: boolean;
}

const Roles = () => {
  const [roles, setRoles] = useState<RolesDT[]>([]);
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    setRoles([
      {
        name: "admin",
        users: 2,
        manageusers: true,
        manageroles: true,
        managetenants: true,
      },
      {
        name: "operator",
        users: 2,
        manageusers: true,
        manageroles: true,
        managetenants: false,
      },
      {
        name: "support",
        users: 2,
        manageusers: true,
        manageroles: false,
        managetenants: false,
      },
    ]);
  }, []);

  useEffect(() => {
    // Initialize checked states for each role
    const initialCheckedStates: { [key: string]: boolean } = {};
    roles.forEach((role) => {
      initialCheckedStates[role.name] = false;
    });
    setCheckedStates(initialCheckedStates);
  }, [roles]);

  const actionBodyTemplate = (data: RolesDT) => {
    return (
      <>
        <Button label="Edit" text />
        <Button label="Delete" text />
      </>
    );
  };

  const checkboxTemplate = (data: RolesDT) => {
    return (
      <Checkbox
        onChange={() => handleCheckboxChange(data)}
        checked={checkedStates[data.name]}
      />
    );
  };

  const handleCheckboxChange = (clickedRole: RolesDT) => {
    setCheckedStates((prevCheckedStates) => ({
      ...prevCheckedStates,
      [clickedRole.name]: !prevCheckedStates[clickedRole.name],
    }));
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
                field="manageusers"
                header="MANAGE USERS"
                body={checkboxTemplate}
              ></Column>
              <Column
                field="manageroles"
                header="MANAGE ROLES"
                body={checkboxTemplate}
              ></Column>
              <Column
                field="managetenants"
                header="MANAGE TENANTS"
                body={checkboxTemplate}
              ></Column>
              <Column body={actionBodyTemplate}></Column>
            </DataTable>

            <div className="py-4 px-6 border-b-gray-300 border-b transition-all duration-300 hover:bg-blue-200">
              <Button
                label="New Role"
                icon="bx bx-plus"
                text
                className="p-0 text-lg text-blue block w-full text-left hover:bg-transparent focus:outline-0 focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;
