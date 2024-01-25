import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { formatDate } from "../../../utils";

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
        <Column field="userName" header="USER NAME"></Column>
        <Column field="email" header="EMAIL"></Column>
        <Column
          field="dateJoined"
          header="DATE JOINED"
          body={(data) => formatDate(data.dateJoined)}
        ></Column>
        <Column
          body={actionDeletedBodyTemplate}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default DeletedUser;
