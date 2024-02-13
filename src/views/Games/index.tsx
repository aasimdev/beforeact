// React Imports
import { useEffect, useState } from "react";
// Prime React Imports
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
// Redux
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
// Custom
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import { CustomLabel } from "../../components/Typography";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import MobileGameList from "./mobile/MobileGameList";
import {
  DesktopBrand,
  DesktopRoles,
  FreeSpin,
  NotFreeSpin,
  SortIcon,
} from "../../assets";
import { Paginator } from "primereact/paginator";

const GamesData = [
  {
    id: 1,
    name: "Game 1",
    provider: DesktopRoles,
    gameID: "123",
    freeSpins: FreeSpin,
    minimumBet: "£0.1",
    category: "Slots",
  },
  {
    id: 2,
    name: "Game 2",
    provider: DesktopRoles,
    gameID: "456",
    freeSpins: NotFreeSpin,
    minimumBet: "£0.2",
    category: "Multiple",
  },
  {
    id: 3,
    name: "Game 3",
    provider: DesktopRoles,
    gameID: "789",
    freeSpins: FreeSpin,
    minimumBet: "£0.3",
    category: "Live",
  },
];

const Games = () => {
  const navigate = useNavigate();

  const [activeUsers, setActiveUsers] = useState([]);
  const [dropDownUser, setDropDownUser] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  // GET ALL USERS
  const { data, isLoading } = useGetAllUsersQuery({});

  useEffect(() => {
    if (data) {
      // ACTIVE USERS
      const activeUsers = data?.users?.filter(
        (user: { deleted: boolean }) => !user.deleted
      );
      setActiveUsers(activeUsers);
    }
  }, [data]);

  return (
    <>
      <Layout>
        {isLoading && <OverlayLoader />}

        <Title brand={false} title="Games" image={DesktopBrand} />
        <div className="my-6 flex justify-end gap-6">
          <Button
            label="Add Game"
            icon="bx bx-plus"
            className="theme-btn"
            onClick={() => navigate("/games/add-game")}
          />
          <Button
            label="Game List"
            icon="bx bx-list-ul"
            className="theme-btn"
            onClick={() => navigate("/games/game-list")}
          />
        </div>
        <div className="my-6 p-6 rounded-lg bg-white">
          <div className="flex gap-6 items-center">
            <div className="flex flex-col gap-3 w-full">
              <CustomLabel htmlFor="userName">PROVIDER</CustomLabel>
              <Dropdown
                value={dropDownUser}
                onChange={(e) => setDropDownUser(e.value)}
                options={activeUsers}
                optionLabel="userName"
                placeholder="Select a Provider"
                className="theme-input shadow-none w-full"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <CustomLabel htmlFor="nameSearch">NAME</CustomLabel>
              <InputText
                type="text"
                id="nameSearch"
                placeholder="Name"
                className="theme-input shadow-none w-full"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
              />
            </div>
            <div className="mt-9 flex items-center gap-6">
              <Button label="Clear" className="theme-btn-default h-[46px]" />
              <Button label="Search" className="theme-btn h-[46px]" />
            </div>
          </div>
          <Divider className="my-6" />
          <div>
            <DataTable
              value={GamesData?.slice(first, first + rows)}
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
                field="freeSpins"
                header="FREE SPINS"
                className="font-normal"
                sortable
                body={(rowData) => {
                  return (
                    <div>
                      <img
                        className="h-6 w-6"
                        src={rowData?.freeSpins}
                        alt={rowData?.name}
                      />
                    </div>
                  );
                }}
              ></Column>
              <Column
                field="minimumBet"
                header="MINIMUM BET"
                className="font-normal"
                sortable
              ></Column>
              <Column
                field="category"
                header="CATEGORY"
                className="font-normal"
                sortable
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
                field=""
                header=""
                className="font-normal"
                body={(rowData) => {
                  return (
                    <div
                      className="text-blue font-medium cursor-pointer"
                      onClick={() =>
                        navigate(`/games/update-game/${rowData?.id}`)
                      }
                    >
                      Edit
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
              totalRecords={GamesData?.length}
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

      {/* Mobile Version of Games */}
      <div className="px-4 pt-4 pb-10 sm:p-8 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileGameList />
      </div>
    </>
  );
};

export default Games;
