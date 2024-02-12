// React Imports
import { useState } from "react";
import { useLocation } from "react-router-dom";
// Prime React Imports
import { Button } from "primereact/button";
// Assets
import BrandImage from "../../../assets/images/mobile_brand.svg";
import BalanceImage from "../../../assets/images/balance.svg";
import TurnOverImage from "../../../assets/images/turnover.svg";
import TotalWagerImage from "../../../assets/images/wager.svg";
import GGRImage from "../../../assets/images/ggr.svg";
// Custom
import MobileSideBar from "../../../components/MobileSideBar";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";

const MobileViewPlayer = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [toggleValue, setToggleValue] = useState("overview");

  return (
    <>
      <MobileSideBar />
      <Title brand={false} title={`Player: ${id}`} image={BrandImage} />

      <Breadcrumb mainLabel={`Player: ${id}`} label="Players" url="/players" />

      <div className="flex items-center my-6">
        <Button
          className={`shadow-none border-0 text-lg font-normal rounded-lg ${
            toggleValue === "overview"
              ? "bg-blue text-white"
              : "bg-transparent text-gray"
          }`}
          onClick={() => {
            setToggleValue("overview");
          }}
        >
          OVERVIEW
        </Button>
        <Button
          onClick={() => {
            setToggleValue("bets");
          }}
          className={`shadow-none border-0 text-lg font-normal rounded-lg ${
            toggleValue === "bets"
              ? "bg-blue text-white"
              : "bg-transparent text-gray"
          }`}
        >
          BETS
        </Button>
        <Button
          onClick={() => {
            setToggleValue("payments");
          }}
          className={`shadow-none border-0 text-lg font-normal rounded-lg ${
            toggleValue === "payments"
              ? "bg-blue text-white"
              : "bg-transparent text-gray"
          }`}
        >
          PAYMENTS
        </Button>
      </div>

      <div className="my-6 flex flex-col gap-4">
        <Button
          type="button"
          className="theme-btn"
          label="Actions"
          icon="bx bx-chevron-down text-2xl"
          iconPos="right"
        />
        <Button
          type="button"
          className="theme-btn"
          label="Add Bonus"
          icon="bx bx-plus text-2xl"
        />
      </div>
      <div className="mb-6 mt-12">
        <div className="py-4 px-2 rounded-lg bg-white">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-[22px] text-gray-100">Balance</h1>
              <div className="text-[35px] font-semibold text-blue">
                $7,844.73
              </div>
            </div>
            <img src={BalanceImage} alt="Balance" />
          </div>
        </div>
      </div>
      {/* 2nd row */}
      <div className="my-6 flex justify-end items-center gap-4">
        <div className="py-4 px-2 rounded-lg bg-white w-full">
          <div className="flex justify-between">
            <h1 className="text-[16px] text-gray-100">Turnover</h1>
            <img src={TurnOverImage} alt="Balance" className="w-10 h-10" />
          </div>
          <div className="text-[22px] mt-3 font-semibold text-gray-200">
            $1,090.00
          </div>
        </div>
        <div className="py-4 px-2 rounded-lg bg-white w-full">
          <div className="flex justify-between">
            <h1 className="text-[16px] text-gray-100">Total Wager</h1>
            <img src={TotalWagerImage} alt="Balance" className="w-10 h-10" />
          </div>
          <div className="text-[22px] mt-3 font-semibold text-gray-200">
            $500.00
          </div>
        </div>
      </div>
      {/* 3rd row */}
      <div className="mt-6 mb-14">
        <div className="py-4 px-2 rounded-lg bg-white">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-[22px] text-gray-100">GGR</h1>
              <div className="text-[35px] font-semibold text-green">
                $1,004.24
              </div>
            </div>
            <img src={GGRImage} alt="Balance" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileViewPlayer;
