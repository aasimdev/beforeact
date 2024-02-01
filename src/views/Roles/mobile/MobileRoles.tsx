import MobileSideBar from "../../../components/MobileSideBar";
import Header from "../../../components/Header";
import RolesImage from "../../../assets/images/roles_logo.svg";
import Title from "../../../components/Title";
import { useEffect, useState } from "react";
import { useGetAllRolesQuery } from "../../../redux/api/roleApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { Divider } from "primereact/divider";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const MobileRoles = () => {
  const [roles, setRoles] = useState<any>([]);

  // GET ALL ROLES
  const { data, isLoading } = useGetAllRolesQuery({});

  useEffect(() => {
    if (data) {
      setRoles(data?.roles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {isLoading && <OverlayLoader />}

      <MobileSideBar />
      <Header />
      <div className="my-2">
        <Title brand={false} title="Roles" image={RolesImage} />
      </div>
      <div className="my-4 bg-white rounded-lg p-2 mb-12">
        <div className="m-2 rounded-lg bg-body-2 py-2 px-3">
          <div className="flex items-center justify-between">
            <div>Name</div>

            <div>Actions</div>
          </div>
        </div>
        {roles?.map((role: any) => {
          return (
            <div key={role?.id}>
              <div className="p-2 flex items-center justify-between">
                <div className="pl-2">{role?.name}</div>
                <div className="flex items-center gap-8 pr-2">
                  <div className="text-blue text-lg">
                    <CiEdit />
                  </div>
                  <div className="text-blue text-lg">
                    <RiDeleteBinLine />
                  </div>
                </div>
              </div>
              <div className="px-4">
                <Divider className="my-1" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MobileRoles;
