import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import RolesImage from "../../../assets/images/roles_logo.svg";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import SortIcon from "../../../assets/images/sort_icon.svg";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

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

  return (
    <Layout>
      <Title brand={false} title="Games Lists" image={RolesImage} />

      <Breadcrumb mainLabel="Games Lists" label="Games" url="/games" />

      <div className="my-6 flex justify-end">
        <Button
          label="Add New Game List"
          icon="bx bx-plus"
          className="theme-btn"
        />
      </div>
      <div className="my-6 p-6 rounded-lg bg-white">
        <DataTable
          value={GamesListData}
          className="theme-table relative"
          sortIcon={() => {
            return (
              <>
                <img src={SortIcon} alt="Sort Icon" />
              </>
            );
          }}
          paginator
          rows={2}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorTemplate={{
            layout: "PrevPageLink PageLinks NextPageLink CurrentPageReport",

            PrevPageLink: (options) => {
              return (
                <div className="paginator-nav-left">
                  <button
                    onClick={options.onClick}
                    disabled={options.disabled}
                    className="mr-2 h-[48px] theme-btn-default"
                  >
                    Previous
                  </button>
                </div>
              );
            },
            NextPageLink: (options) => {
              return (
                <div className="paginator-nav-right">
                  <button
                    onClick={options.onClick}
                    disabled={options.disabled}
                    className="ml-2 h-[48px] theme-btn-default"
                  >
                    Next
                  </button>
                </div>
              );
            },
            PageLinks: (options: any) => {
              const isActive = options.page === options.currentPage;

              return (
                <div
                  className={`p-paginator-page p-paginator-element p-link p-paginator-page-start mx-2 ${
                    isActive
                      ? "bg-blue text-white shadow-btn"
                      : "bg-gray-500 text-gray-100"
                  } rounded-lg font-medium`}
                  onClick={options.onClick}
                >
                  {options?.page + 1}
                </div>
              );
            },
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
                  View {rowData?.name}
                </div>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </Layout>
  );
};

export default GameList;
