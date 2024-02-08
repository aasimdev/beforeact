// React Imports
import { useState } from "react";
import { useLocation } from "react-router-dom";
// Prime React
import { Button } from "primereact/button";
// Assets
import BrandImage from "../../../assets/images/brands_logo.svg";
import BalanceImage from "../../../assets/images/balance.svg";
import TurnOverImage from "../../../assets/images/turnover.svg";
import TotalWagerImage from "../../../assets/images/wager.svg";
import GGRImage from "../../../assets/images/ggr.svg";
import DepositImage from "../../../assets/images/depositAmount.svg";
import LastDeposit from "../../../assets/images/lastDeposit.svg";
import DepositCount from "../../../assets/images/depositCount.svg";
import BouncesImage from "../../../assets/images/bonuses.svg";
import SignupImage from "../../../assets/images/signUpDate.svg";
import LastBetImage from "../../../assets/images/lastBet.svg";
import TotalBetsImage from "../../../assets/images/totalBets.svg";
import SignUpCodeImage from "../../../assets/images/signUpCode.svg";
// Custom
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";

const cardsData = [
  {
    id: 1,
    title: "Balance",
    value: "$7,844.73",
    color: "#696CFF",
    image: BalanceImage,
  },
  {
    id: 2,
    title: "Turnover",
    value: "$1,090.00",
    image: TurnOverImage,
  },
  {
    id: 3,
    title: "Total Wager",
    value: "$500.00",
    image: TotalWagerImage,
  },
  {
    id: 4,
    title: "GGR",
    value: "$1,004.24",
    color: "#82E14F",
    image: GGRImage,
  },
  {
    id: 5,
    title: "Deposit Amount",
    value: "$3,475.00",
    image: DepositImage,
  },
  {
    id: 6,
    title: "Last Deposit",
    value: "$10.00",
    date: "12-01-2024",
    image: LastDeposit,
  },
  {
    id: 7,
    title: "Deposit Count",
    value: "27",
    image: DepositCount,
  },
  {
    id: 8,
    title: "Bonuses",
    value: "$50.00",
    color: "#FF3E1D",
    image: BouncesImage,
  },
  {
    id: 9,
    title: "Signup Date",
    value: "24-01-2023",
    time: "13:56:23",
    image: SignupImage,
  },
  {
    id: 10,
    title: "Last Bet",
    value: "$30.00",
    color: "#82E14F",
    image: LastBetImage,
  },
  {
    id: 11,
    title: "Total Bets",
    value: "67",
    image: TotalBetsImage,
  },
  {
    id: 12,
    title: "Signup Code",
    value: "starburst100",
    image: SignUpCodeImage,
  },
];

const ViewPlayer = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [toggleValue, setToggleValue] = useState("overview");

  return (
    <Layout>
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

      <div className="my-6 flex justify-end items-center gap-4">
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
      <div className="my-6 flex flex-wrap justify-between items-center gap-8">
        {cardsData?.map((card) => {
          return (
            <div className="p-6 rounded-lg bg-white w-[355px]" key={card?.id}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h1 className="text-[22px] text-gray-100">{card?.title}</h1>
                  <div
                    className="text-[35px] font-semibold"
                    style={{
                      color: card?.color ? card?.color : "#697A8D",
                    }}
                  >
                    {card?.value}
                  </div>
                  <div className="text-[14px] font-normal text-gray-100">
                    {card?.date}
                    {card?.time}
                  </div>
                </div>
                <img src={card?.image} alt={`${card?.title}`} />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default ViewPlayer;
