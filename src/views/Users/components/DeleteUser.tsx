// React Imports
import React, { useEffect, useState } from "react";
// Prime Imports
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
// Utils Imports
import { formatDate } from "../../../utils";
import { SortIcon } from "../../../assets";
import { Paginator } from "primereact/paginator";

interface DUsersDataType {
  users: any;
  actionDeletedBodyTemplate: any;
}

const DeletedUser: React.FC<DUsersDataType> = (props) => {
  const { users, actionDeletedBodyTemplate } = props;
  const [deletedUsers, setDeletedUsers] = useState([]);

  useEffect(() => {
    if (users) {
      setDeletedUsers(users);
    }
  }, [users]);

  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sidebar mt-6">
      <h3 className="text-[22px] text-gray pb-6 px-6 font-normal">
        Deleted Users
      </h3>
      <DataTable
        value={deletedUsers?.slice(first, first + rows)}
        className="theme-table relative"
        sortIcon={() => {
          return (
            <>
              <img src={SortIcon} alt="Sort Icon" />
            </>
          );
        }}
      >
        <Column field="userName" header="USER NAME" sortable></Column>
        <Column field="email" header="EMAIL" sortable></Column>
        <Column
          field="dateJoined"
          header="DATE JOINED"
          body={(data) => formatDate(data.dateJoined)}
          sortable
        ></Column>
        <Column
          body={actionDeletedBodyTemplate}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <div>
        <Paginator
          className="flex justify-end items-center"
          first={first}
          rows={rows}
          totalRecords={deletedUsers?.length}
          onPageChange={(e) => {
            setFirst(e.first);
            setRows(e.rows);
          }}
          template={{
            layout: "PrevPageLink PageLinks NextPageLink CurrentPageReport",
            CurrentPageReport: (options) => {
              return (
                <div className="edit-paginator-current">
                  {`Showing ${options?.first} to ${options?.last} of ${options?.totalRecords} entries`}
                </div>
              );
            },
            PrevPageLink: (options) => {
              return (
                <button
                  onClick={options.onClick}
                  disabled={options.disabled}
                  className="mr-2 h-[48px] theme-btn-default"
                >
                  Previous
                </button>
              );
            },

            NextPageLink: (options) => {
              return (
                <button
                  onClick={options.onClick}
                  disabled={options.disabled}
                  className="ml-2 h-[48px] theme-btn-default"
                >
                  Next
                </button>
              );
            },
            PageLinks: (options: any) => {
              const isActive = options.page === options.currentPage;

              return (
                <div
                  className={`p-paginator-page p-paginator-element p-link p-paginator-page-start mx-2 rounded-lg font-medium ${
                    isActive
                      ? "bg-blue text-white shadow-btn"
                      : "bg-white text-blue"
                  }`}
                  onClick={options.onClick}
                >
                  {options.page + 1}
                </div>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default DeletedUser;
