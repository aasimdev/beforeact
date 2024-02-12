// React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// PrimeReact Imports
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
// Assets
import BrandImage from "../../../assets/images/mobile_brand.svg";
import SortIcon from "../../../assets/images/sort_icon.svg";
// Custom
import Header from "../../../components/Header";
import MobileSideBar from "../../../components/MobileSideBar";
import Title from "../../../components/Title";

const labelStyle = {
  fontSize: "18px",
  color: "#566A7F",
  fontWeight: 600,
};

const dummyData = [
  {
    id: 1,
    signUpDate: "10-10-2021",
    signUpCode: "123",
    totalDeposit: "1000",
    totalWager: "2000",
    totalGGR: "500",
  },
  {
    id: 2,
    signUpDate: "10-10-2021",
    signUpCode: "456",
    totalDeposit: "2000",
    totalWager: "3000",
    totalGGR: "-1000",
  },
  {
    id: 3,
    signUpDate: "10-10-2033",
    signUpCode: "789",
    totalDeposit: "3000",
    totalWager: "4000",
    totalGGR: "1500",
  },
];

const MobilePlayerList = () => {
  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    playerId: "",
    signUpDate: "",
    affiliate: "",
    lastBet: "",
    ggr: "",
    wager: "",
    lastDepositDate: "",
  });

  return (
    <>
      <MobileSideBar />
      <Header />

      <Title brand={false} title="Players" image={BrandImage} />

      <div className="my-6 p-6 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-3 text-gray-200 cursor-pointer"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            <i className="bx bx-filter text-[28px]"></i>
            <div className="text-[22px] font-semibold">Filters</div>
          </div>
          <div className="cursor-pointer text-gray-200">
            {showFilters ? (
              <i
                className="bx bx-chevron-up text-[35px]"
                onClick={() => {
                  setShowFilters(false);
                }}
              ></i>
            ) : (
              <i
                className="bx bx-chevron-down text-[35px]"
                onClick={() => {
                  setShowFilters(true);
                }}
              ></i>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="mt-6">
            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="ggr" style={labelStyle}>
                  GGR
                </label>
                <InputText
                  id="ggr"
                  placeholder="0.00"
                  className="theme-input w-full"
                  value={filters.ggr}
                  onChange={(e) => {
                    setFilters({ ...filters, ggr: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="wager" style={labelStyle}>
                  WAGER
                </label>
                <InputText
                  id="wager"
                  placeholder="0.00"
                  className="theme-input w-full"
                  value={filters.wager}
                  onChange={(e) => {
                    setFilters({ ...filters, wager: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="playerId" style={labelStyle}>
                  ID
                </label>
                <InputText
                  id="playerId"
                  placeholder="123456"
                  className="theme-input w-full"
                  value={filters.playerId}
                  onChange={(e) => {
                    setFilters({ ...filters, playerId: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="affiliate" style={labelStyle}>
                  AFFILIATE
                </label>
                <InputText
                  id="affiliate"
                  placeholder="affiliate1"
                  className="theme-input w-full"
                  value={filters.affiliate}
                  onChange={(e) => {
                    setFilters({ ...filters, affiliate: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="signUpDate" style={labelStyle}>
                SIGNUP DATE
              </label>
              <InputText
                id="signUpDate"
                placeholder="00-00-0000"
                className="theme-input w-full"
                value={filters.signUpDate}
                onChange={(e) => {
                  setFilters({ ...filters, signUpDate: e.target.value });
                }}
              />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="lastDepositDate" style={labelStyle}>
                LAST DEPOSIT DATE
              </label>
              <InputText
                id="lastDepositDate"
                placeholder="00-00-0000"
                className="theme-input w-full"
                value={filters.lastDepositDate}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    lastDepositDate: e.target.value,
                  });
                }}
              />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="lastBet" style={labelStyle}>
                LAST BET
              </label>
              <InputText
                id="lastBet"
                placeholder="00-00-0000"
                className="theme-input w-full"
                value={filters.lastBet}
                onChange={(e) => {
                  setFilters({ ...filters, lastBet: e.target.value });
                }}
              />
            </div>
            <div className="flex mt-6 justify-between items-center gap-3">
              <Button
                type="button"
                className="theme-btn-default px-0 h-[48px]"
                label="Clear"
              />
              <Button className="theme-btn h-[48px] w-[165px]" label="Search" />
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg p-6 mb-12">
        <DataTable
          value={dummyData}
          className="theme-table"
          scrollable
          stripedRows
          sortIcon={() => {
            return (
              <>
                <img src={SortIcon} alt="Sort Icon" />
              </>
            );
          }}
        >
          <Column
            field="id"
            header="ID"
            body={(rowData) => {
              return (
                <div
                  className="text-blue font-medium cursor-pointer"
                  onClick={() => {
                    navigate(`/players/${rowData.id}`);
                  }}
                >
                  {rowData.id}
                </div>
              );
            }}
            sortable
          ></Column>
          <Column
            field="signUpDate"
            header="SIGNUP DATE"
            className="font-normal"
            sortable
            body={(rowData) => {
              return (
                <div className="font-normal min-w-40">{rowData.signUpDate}</div>
              );
            }}
          ></Column>
          <Column
            field="signUpCode"
            header="SIGNUP CODE"
            sortable
            body={(rowData) => {
              return (
                <div className="font-normal min-w-40">{rowData.signUpCode}</div>
              );
            }}
          ></Column>
          <Column
            field="totalDeposit"
            header="TOTAL DEPOSIT"
            sortable
            body={(rowData) => {
              return (
                <div className="font-normal min-w-48">
                  {rowData.totalDeposit}
                </div>
              );
            }}
          ></Column>
          <Column
            field="totalWager"
            header="TOTAL WAGER"
            sortable
            body={(rowData) => {
              return (
                <div className="font-normal min-w-40">{rowData.totalWager}</div>
              );
            }}
          ></Column>
          <Column
            field="totalGGR"
            header="TOTAL GGR"
            sortable
            body={(rowData) => {
              return (
                <div
                  className={`font-semibold min-w-40 ${
                    rowData.totalGGR > 0 ? "text-green" : "text-red"
                  }`}
                >
                  £ {rowData.totalGGR}
                </div>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default MobilePlayerList;
