import MobileSideBar from "../../../components/MobileSideBar";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import RolesImage from "../../../assets/images/mobile_roles.svg";
import FreeSpinImage from "../../../assets/images/freeSpin.svg";
import NotFreeSpinImage from "../../../assets/images/noFreeSpin.svg";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
// import { useNavigate } from "react-router-dom";
import GameLogo from "../../../assets/images/Game_logo.svg";
import { useGetAllUsersQuery } from "../../../redux/api/userApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const GamesData = [
  {
    id: 1,
    name: "Game 1",
    provider: RolesImage,
    gameID: "123",
    freeSpins: FreeSpinImage,
    minimumBet: "£0.1",
    category: "Slots",
  },
  {
    id: 2,
    name: "Game 2",
    provider: RolesImage,
    gameID: "456",
    freeSpins: NotFreeSpinImage,
    minimumBet: "£0.2",
    category: "Multiple",
  },
  {
    id: 3,
    name: "Game 3",
    provider: RolesImage,
    gameID: "789",
    freeSpins: FreeSpinImage,
    minimumBet: "£0.3",
    category: "Live",
  },
];

const MobileGameList = () => {
  // const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState(false);

  const [activeUsers, setActiveUsers] = useState([]);
  const [dropDownUser, setDropDownUser] = useState("");
  const [nameSearch, setNameSearch] = useState("");

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
      {isLoading && <OverlayLoader />}

      <MobileSideBar />
      <Header />

      <Title brand={false} title="Games" image={RolesImage} />

      <div className="my-6">
        <div className="flex items-center gap-4 cursor-pointer">
          <div
            onClick={() => {
              setShowFilters(!showFilters);
            }}
            className="flex items-center bg-blue text-white rounded-lg p-3 h-[56px] w-fit"
          >
            <i className="bx bx-filter text-[28px]"></i>
          </div>

          <Button className="theme-btn w-full flex justify-center items-center">
            <i className="bx bx-list-ul text-[28px] mr-2"></i>
            Game List
          </Button>
        </div>
        {showFilters && (
          <div className="my-6 p-3 bg-white rounded-lg">
            <div className="flex flex-col gap-6 items-center">
              <div className="w-full">
                <Dropdown
                  value={dropDownUser}
                  onChange={(e) => setDropDownUser(e.value)}
                  options={activeUsers}
                  optionLabel="userName"
                  placeholder="Select a Provider"
                  className="theme-input shadow-none w-full"
                />
              </div>
              <div className="w-full">
                <InputText
                  type="text"
                  id="nameSearch"
                  placeholder="Name"
                  className="theme-input shadow-none w-full"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col items-center gap-6">
                <Button
                  label="Clear"
                  className="theme-btn-default h-[46px] w-full"
                  onClick={() => {
                    setDropDownUser("");
                    setNameSearch("");
                    setShowFilters(false);
                  }}
                />
                <Button
                  label="Search"
                  className="theme-btn h-[46px] w-full mb-1"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 mb-14">
          {GamesData.map((game) => {
            return (
              <div className="bg-white rounded-lg p-6 mb-6" key={game?.id}>
                <div className="text-[28px] font-semibold text-gray-200 mb-6">
                  {game?.name}
                </div>
                <img src={GameLogo} alt="brand" className="mb-6" />
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray mb-6">
                  Game ID:
                  <span className="text-[#03C3EC] font-normal">
                    {game?.gameID}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray mb-6">
                  Minimum Bet
                  <span className="text-[#FFAB00] font-normal">
                    {game?.minimumBet}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray">
                  Free Spins Available:
                  <img src={game?.freeSpins} alt="free spin" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileGameList;
