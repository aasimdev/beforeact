// React Imports
import { useState } from "react";
// Prime Imports
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// Assets
import BrandImage from "../../assets/images/brands_logo.svg";
import SortIcon from "../../assets/images/sort_icon.svg";
// Custom
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import {
  Paginator,
  PaginatorCurrentPageReportOptions,
} from "primereact/paginator";

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

const Players = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    playerId: "",
    signupDate: "",
    affiliate: "",
    lastBet: "",
    ggr: "",
    wager: "",
    lastDepositDate: "",
  });
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(1);

  return (
    <Layout>
      <Title brand={false} title="Players" image={BrandImage} />
      <div className="my-6 bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1 text-gray-200 cursor-pointer"
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
                className="bx bx-chevron-down text-[35px]"
                onClick={() => {
                  setShowFilters(false);
                }}
              ></i>
            ) : (
              <i
                className="bx bx-chevron-up text-[35px]"
                onClick={() => {
                  setShowFilters(true);
                }}
              ></i>
            )}
          </div>
        </div>
        {showFilters && (
          <div className="mt-6">
            <div className="flex justify-between items-center gap-6">
              <div className="flex flex-col gap-3 mb-8">
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
              <div className="flex flex-col gap-3 mb-8">
                <label htmlFor="signupDate" style={labelStyle}>
                  SIGNUP DATE
                </label>
                <InputText
                  id="signupDate"
                  placeholder="00-00-0000"
                  className="theme-input w-full"
                  value={filters.signupDate}
                  onChange={(e) => {
                    setFilters({ ...filters, signupDate: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-3 mb-8">
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
              <div className="flex flex-col gap-3 mb-8">
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
            </div>
            {/* 2nd Line */}
            <div className="flex justify-between items-center gap-6">
              <div className="flex flex-col gap-3 mb-8">
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
              <div className="flex flex-col gap-3 mb-8">
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
              <div className="flex flex-col gap-3 mb-8">
                <label htmlFor="lastDepositDate" style={labelStyle}>
                  LAST DEPOSIT DATE
                </label>
                <InputText
                  id="lastDepositDate"
                  placeholder="00-00-0000"
                  className="theme-input w-full"
                  value={filters.lastDepositDate}
                  onChange={(e) => {
                    setFilters({ ...filters, lastDepositDate: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-3 mb-8 w-[280px]">
                <div className="flex flex-col items-center gap-3">
                  <Button
                    type="button"
                    className="theme-btn-default h-[48px] w-full"
                    label="Cancel"
                  />
                  <Button
                    className="theme-btn h-[48px] w-full"
                    label="Search"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <Divider className={showFilters ? "mb-10" : "mt-3"} />

          <div>
            <DataTable
              value={dummyData}
              className="theme-table"
              sortIcon={() => {
                return (
                  <>
                    <img src={SortIcon} alt="Sort Icon" />
                  </>
                );
              }}
              paginator
              rows={1}
              // paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport"
              // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              paginatorLeft={(options: any) => {
                const last = Math.min(
                  options.first + options.rows,
                  options.totalRecords
                );
                return (
                  <div className="paginator-left">
                    <span>{`Showing ${options.first + 1} to ${last} of ${
                      options.totalRecords
                    } entries`}</span>
                  </div>
                );
              }}
              paginatorTemplate={{
                layout: "PrevPageLink PageLinks NextPageLink",
                PrevPageLink: (options) => (
                  <div className="paginator-nav-left">
                    <button
                      onClick={options.onClick}
                      disabled={options.disabled}
                      // className={`prev-button ${options.className}`}
                    >
                      Previous
                    </button>
                  </div>
                ),
                NextPageLink: (options) => (
                  <div className="paginator-nav-right">
                    <button
                      onClick={options.onClick}
                      disabled={options.disabled}
                      // className={`next-button ${options.className}`}
                    >
                      Next
                    </button>
                  </div>
                ),
              }}
            >
              <Column
                field="id"
                header="ID"
                body={(rowData) => {
                  return (
                    <div className="text-blue font-medium">{rowData.id}</div>
                  );
                }}
                sortable
              ></Column>
              <Column
                field="signUpDate"
                header="SIGNUP DATE"
                className="font-normal"
                sortable
              ></Column>
              <Column
                field="signUpCode"
                header="SIGNUP CODE"
                className="font-normal"
                sortable
              ></Column>
              <Column
                field="totalDeposit"
                header="TOTAL DEPOSIT"
                className="font-normal"
                sortable
              ></Column>
              <Column
                field="totalWager"
                header="TOTAL WAGER"
                className="font-normal"
                sortable
              ></Column>
              <Column
                field="totalGGR"
                header="TOTAL GGR"
                sortable
                body={(rowData) => {
                  return (
                    <div
                      className={`font-semibold ${
                        rowData.totalGGR > 0 ? "text-green" : "text-red"
                      }`}
                    >
                      £ {rowData.totalGGR}
                    </div>
                  );
                }}
              ></Column>
            </DataTable>
            {/* <Paginator
              first={first}
              rows={rows}
              totalRecords={dummyData.length}
              onPageChange={(e) => {
                setFirst(e.first);
                setRows(e.rows);
              }}
              template={{
                PrevPageLink: (options) => (
                  <button
                    onClick={options.onClick}
                    disabled={options.disabled}
                    className={`prev-button ${options.className}`}
                  >
                    {"< Prev"}
                  </button>
                ),
                NextPageLink: (options) => (
                  <button
                    onClick={options.onClick}
                    disabled={options.disabled}
                    className={`next-button ${options.className}`}
                  >
                    {"Next >"}
                  </button>
                ),

                CurrentPageReport: (options) => (
                  <span className={options.className}>
                    Showing {options.first} to {options.last} of{" "}
                    {options.totalRecords} entries
                  </span>
                ),
              }}
            /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Players;
