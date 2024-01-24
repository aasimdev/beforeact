import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

interface DUsersDataType {
  users: any;
  actionDeletedBodyTemplate: any;
}

const DeletedUser: React.FC<DUsersDataType> = ({
  users,
  actionDeletedBodyTemplate,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sidebar mt-6">
      <h3 className="text-[22px] text-gray pb-6 px-6 font-normal">
        Deleted Users
      </h3>
      <DataTable value={users} className="theme-table">
        <Column field="username" header="USERNAME"></Column>
        <Column field="email" header="EMAIL"></Column>
        <Column field="datejoined" header="DATE JOINED"></Column>
        <Column
          body={actionDeletedBodyTemplate}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default DeletedUser;
