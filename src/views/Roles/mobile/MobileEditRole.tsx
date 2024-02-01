// React Imports
import { useState } from "react";
import { useLocation } from "react-router-dom";
// Prime React Imports
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
// Redux
import { useGetRoleByIdQuery } from "../../../redux/api/roleApiSlice";
// React Icons
import { RiDeleteBinLine } from "react-icons/ri";
// Assets
import RolesImage from "../../../assets/images/roles_logo.svg";
// Custom
import MobileSideBar from "../../../components/MobileSideBar";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";

const MobileEditRole = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [toggleValue, setToggleValue] = useState("users");

  // GET ROLE
  const { data, isLoading } = useGetRoleByIdQuery(id);

  return (
    <>
      {isLoading && <OverlayLoader />}

      <MobileSideBar />
      <Header />

      <div className="my-2">
        <Title brand={false} title={data?.role?.name} image={RolesImage} />
        <Breadcrumb mainLabel="Edit Roles" label="Roles" url="/roles" />
      </div>
      <div className="flex items-center">
        <Button
          className="shadow-none border-0 font-medium"
          style={{
            backgroundColor:
              toggleValue === "users" ? "#696CFF" : "transparent",
            color: toggleValue === "users" ? "#fff" : "#697A8D",
          }}
          onClick={() => {
            setToggleValue("users");
          }}
        >
          Users
        </Button>
        <Button
          onClick={() => {
            setToggleValue("permissions");
          }}
          className="shadow-none border-0 font-medium"
          style={{
            backgroundColor:
              toggleValue === "permissions" ? "#696CFF" : "transparent",
            color: toggleValue === "permissions" ? "#fff" : "#697A8D",
          }}
        >
          Permissions
        </Button>
      </div>

      <div className="my-4">
        {toggleValue === "users" ? (
          <>
            <div className="bg-white rounded-lg py-2 px-3">
              <h3 className="text-[28px] text-blue px-2 pb-2 font-medium">
                Users in Role
              </h3>
              <Divider className="my-1" />

              {data?.users?.length === 0 ? (
                <h3 className="text-[16px] flex text-gray-200 justify-center items-center py-2">
                  No Users in Role
                </h3>
              ) : (
                data?.users?.map((user: any) => {
                  return (
                    <div className="mt-4" key={user?.id}>
                      <div className="flex items-center justify-between my-2 px-2">
                        <div>{user?.userName}</div>
                        <div
                          className="text-blue text-lg"
                          onClick={() => {
                            //   setSelectedRole(role);
                            //   setConfirmPopup(true);
                          }}
                        >
                          <RiDeleteBinLine />
                        </div>
                      </div>
                      <Divider className="mt-1" />
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          <>Permissions</>
        )}
      </div>
    </>
  );
};

export default MobileEditRole;
