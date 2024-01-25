import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import ApesLogo from "../../../assets/images/logo-apes.png";
import SharkLogo from "../../../assets/images/logo-shark.png";
import DiceLogo from "../../../assets/images/logo-dice.png";
import { formatDate } from "../../../utils";

interface ViewUserDT {
  visible: boolean;
  setVisible: any;
  selectedUser: any;
}

const ViewUserModal: React.FC<ViewUserDT> = (props) => {
  const { visible, setVisible, selectedUser } = props;

  return (
    <Dialog
      visible={visible}
      onHide={() => setVisible(false)}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      header="User Information"
      contentClassName="p-0 theme-popup"
      draggable={false}
      resizable={false}
    >
      <div className="px-[104px] py-16">
        <div className="max-w-[632px] mx-auto">
          <div className="flex justify-between px-10">
            <div className="text-center">
              <div className="bg-purple-100 w-[120px] h-[120px] mx-auto rounded-lg flex items-center justify-center mb-1">
                <i className="bx bx-user text-6xl text-blue"></i>
              </div>
              <p className="my-2.5 text-gray-200 text-[20px] leading-none">
                Username
              </p>
              <span className="text-gray text-lg mt-2">
                {selectedUser?.userName}
              </span>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-[120px] h-[120px] mx-auto rounded-lg flex items-center justify-center mb-1">
                <i className="bx bx-envelope text-6xl text-blue"></i>
              </div>
              <p className="my-2.5 text-gray-200 text-[20px] leading-none">
                Email Address
              </p>
              <span className="text-gray text-lg">{selectedUser?.email}</span>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-[120px] h-[120px] mx-auto rounded-lg flex items-center justify-center mb-1">
                <i className="bx bx-calendar text-6xl text-blue"></i>
              </div>
              <p className="my-2.5 text-gray-200 text-[20px] leading-none">
                Date Joined
              </p>
              <span className="text-gray text-lg mt-2">
                {formatDate(selectedUser?.dateJoined)}
              </span>
            </div>
          </div>
          <Divider type="solid" className="my-10" />
          <div className="shadow-sidebar p-4 rounded-lg text-center">
            <p className="text-gray text-[22px]">
              <span className="font-semibold">Admin</span>’s brands
            </p>

            {/* Brands */}
            {selectedUser?.brands ? (
              <>
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  <div>
                    <div className="mb-2">
                      <img src={ApesLogo} alt="logo" />
                    </div>
                    <span className="text-gray text-lg">Apes</span>
                  </div>
                  <div>
                    <div className="mb-2">
                      <img src={SharkLogo} alt="logo" />
                    </div>
                    <span className="text-gray text-lg">Shark</span>
                  </div>
                  <div>
                    <div className="mb-2">
                      <img src={DiceLogo} alt="logo" />
                    </div>
                    <span className="text-gray text-lg">Dice</span>
                  </div>
                  <div>
                    <div className="mb-2 w-14 h-14 rounded-full flex items-center justify-center text-4xl font-semibold bg-purple-100">
                      <span className="text-blue">A</span>
                    </div>
                    <span className="text-gray text-lg">Abrand</span>
                  </div>
                </div>
              </>
            ) : (
              "No brands yet"
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewUserModal;
