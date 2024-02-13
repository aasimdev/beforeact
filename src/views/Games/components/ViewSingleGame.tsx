// React Imports
import { useState } from "react";
import { useLocation } from "react-router-dom";
// Prime React Imports
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// Custom
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import { CustomLabel } from "../../../components/Typography";
import { DesktopRoles, SortIcon } from "../../../assets";
import { Paginator } from "primereact/paginator";

const SingleGameData = [
  {
    id: 1,
    name: "Book of Shadows 1",
    provider: DesktopRoles,
    gameID: "123",
    category: "Slots",
  },
  {
    id: 2,
    name: "Book of Shadows 2",
    provider: DesktopRoles,
    gameID: "456",
    category: "Multiple",
  },
  {
    id: 3,
    name: "Book of Shadows 3",
    provider: DesktopRoles,
    gameID: "789",
    category: "Live",
  },
];

const ViewSingleGame = () => {
  const location = useLocation();
  const name = decodeURIComponent(location.pathname.split("/").pop() || "");

  const [addGame, setAddGame] = useState("");
  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  return (
    <Layout>
      <Title brand={false} title={name} image={DesktopRoles} />

      <Breadcrumb
        label="Games"
        url="/games"
        childLabel="Games List"
        childUrl="/games/game-list"
        mainLabel={name}
      />

      <div className="my-6 p-6 rounded-lg bg-white">
        <div className="flex flex-col gap-3 w-full">
          <CustomLabel htmlFor="listName">LIST NAME</CustomLabel>
          <InputText
            type="text"
            id="listName"
            placeholder="Name"
            className="theme-input shadow-none w-full"
            value={name}
            disabled={true}
          />
        </div>

        <div className="flex flex-col mt-6 mb-8">
          <label
            htmlFor="addGame"
            className="text-[18px] mb-3 font-semibold text-gray-200"
          >
            Add Game
          </label>

          <span className="p-input-icon-left">
            <i className="bx bx-search-alt-2" />
            <InputText
              type="text"
              id="addGame"
              placeholder="ADD GAME"
              className="theme-input w-full"
              style={{
                paddingLeft: "40px",
              }}
              value={addGame}
              onChange={(e) => setAddGame(e.target.value)}
            />
          </span>
        </div>

        <div>
          <DataTable
            value={SingleGameData?.slice(first, first + rows)}
            className="theme-table relative"
            sortIcon={() => {
              return (
                <>
                  <img src={SortIcon} alt="Sort Icon" />
                </>
              );
            }}
          >
            <Column
              field="name"
              header="NAME"
              className="font-normal"
              sortable
            ></Column>
            <Column
              field="provider"
              header="PROVIDER"
              className="font-normal"
              sortable
              body={(rowData) => {
                return (
                  <div>
                    <img
                      className="h-12 w-12"
                      src={rowData?.provider}
                      alt={rowData?.name}
                    />
                  </div>
                );
              }}
            ></Column>
            <Column
              field="gameID"
              header="ID"
              className="font-normal"
              sortable
            ></Column>

            <Column
              field="category"
              header=""
              className="font-normal"
              body={(rowData) => {
                return (
                  <div className="flex items-center gap-1">
                    <img
                      className="h-8 w-8"
                      src={rowData?.provider}
                      alt={rowData?.name}
                    />
                    <div>{rowData?.category}</div>
                  </div>
                );
              }}
            ></Column>

            <Column
              field="remove"
              header=""
              className="font-normal"
              body={() => {
                return (
                  <div className="flex items-center gap-1">
                    <button className="text-blue font-medium text-[18px]">
                      Remove
                    </button>
                  </div>
                );
              }}
            ></Column>
          </DataTable>
        </div>
        <div>
          <Paginator
            className="flex justify-end items-center"
            first={first}
            rows={rows}
            totalRecords={SingleGameData?.length}
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
    </Layout>
  );
};

export default ViewSingleGame;
