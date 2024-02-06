// React Imports
import { useState } from "react";
// Custom
import Layout from "../../components/Layout";
import BrandImage from "../../assets/images/brands_logo.svg";
import Title from "../../components/Title";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const labelStyle = {
  fontSize: "18px",
  color: "#566A7F",
  fontWeight: 600,
};

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
      </div>
    </Layout>
  );
};

export default Players;
