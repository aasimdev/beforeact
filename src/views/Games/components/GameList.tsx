import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { DesktopRoles, SortIcon } from "../../../assets";
import { useState } from "react";
import { Paginator } from "primereact/paginator";

const GamesListData = [
  {
    id: 1,
    name: "Game 1",
  },
  {
    id: 2,
    name: "Game 2",
  },
  {
    id: 3,
    name: "Game 3",
  },
];

const GameList = () => {
  const navigate = useNavigate();

  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  return (
    <Layout>
      <Title brand={false} title="Games Lists" image={DesktopRoles} />

      <Breadcrumb mainLabel="Games Lists" label="Games" url="/games" />

      <div className="my-6 flex justify-end">
        <Button
          label="Add New Game List"
          icon="bx bx-plus"
          className="theme-btn"
          onClick={() => {
            navigate("/games/create-game-list");
          }}
        />
      </div>
      <div className="my-6 p-6 rounded-lg bg-white">
        <DataTable
          value={GamesListData?.slice(first, first + rows)}
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
            header="LIST NAME"
            className="font-normal"
            sortable
          ></Column>

          <Column
            body={(rowData) => {
              return (
                <div
                  className="text-blue text-[18px] font-medium cursor-pointer"
                  onClick={() => {
                    navigate(`/games/game-list/${rowData?.name}`);
                  }}
                >
                  View
                </div>
              );
            }}
          ></Column>
        </DataTable>
        <div>
          <Paginator
            className="flex justify-end items-center"
            first={first}
            rows={rows}
            totalRecords={GamesListData?.length}
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

export default GameList;
