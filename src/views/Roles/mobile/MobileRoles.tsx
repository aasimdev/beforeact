// React Imports
import { useEffect, useState } from "react";
// Prime React Imports
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// React Icons
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
// Assets
import RolesImage from "../../../assets/images/roles_logo.svg";
// Redux
import {
  useCreateRoleMutation,
  useGetAllRolesQuery,
} from "../../../redux/api/roleApiSlice";
// Custom
import MobileSideBar from "../../../components/MobileSideBar";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import ToastAlert from "../../../components/ToastAlert";
import DotLoader from "../../../components/Spinner/dotLoader";
import DeleteRoleModal from "../components/DeleteRoleModal";

const MobileRoles = () => {
  const [roles, setRoles] = useState<any>([]);
  const [openCard, setOpenCard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [selectedRole, setSelectedRole] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);

  // GET ALL ROLES
  const { data, isLoading } = useGetAllRolesQuery({});

  useEffect(() => {
    if (data) {
      setRoles(data?.roles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // CREATE NEW ROLE API BIND
  const [createNewRole, { isLoading: createRoleLoading }] =
    useCreateRoleMutation();

  const CreateRoleHandler = async (e: any) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
    };

    try {
      const role: any = await createNewRole(payload);

      if (role?.data === null) {
        setOpenCard(false);
        setFormData({
          name: "",
        });

        ToastAlert("Role Created Successfully", "success");
      }
      if (role?.error) {
        ToastAlert(role?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Creating New Role Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  return (
    <>
      {isLoading && <OverlayLoader />}

      <MobileSideBar />
      <Header />
      <div className="my-2">
        <Title brand={false} title="Roles" image={RolesImage} />
      </div>

      <div
        className={`rounded-lg mt-4 ${openCard ? "bg-white py-4 px-3" : ""}`}
      >
        {openCard && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <form className="" onSubmit={CreateRoleHandler}>
                  <div className="mb-4">
                    <InputText
                      id="name"
                      placeholder="Role Name"
                      className="theme-input"
                      style={{
                        width: "100%",
                      }}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <Button
                    type="button"
                    label="Cancel"
                    className="theme-btn-default leading-none w-full mb-3 mt-2"
                    onClick={() => {
                      setOpenCard(false);
                      setFormData({
                        name: "",
                      });
                    }}
                  />
                  {createRoleLoading ? (
                    <div
                      className="theme-btn"
                      style={{
                        height: "45px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DotLoader color="#fff" size={12} />
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      disabled={createRoleLoading}
                      className="theme-btn w-full p-2"
                      label="Create"
                    />
                  )}
                </form>
              </div>
            </div>
          </>
        )}
        {!openCard && (
          <Button
            className="theme-btn w-full text-center flex justify-center p-2"
            onClick={() => {
              setOpenCard(true);
            }}
          >
            + New Role
          </Button>
        )}
      </div>

      {/* Table Show */}
      <div className="my-4 bg-white rounded-lg p-2 mb-12">
        <div className="m-2 rounded-lg bg-body-2 py-2 px-3">
          <div className="flex items-center justify-between">
            <div className="text-gray font-semibold text-[18px]">Name</div>

            <div className="text-gray font-semibold text-[18px]">Actions</div>
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
                  <div
                    className="text-blue text-lg"
                    onClick={() => {
                      setSelectedRole(role);
                      setConfirmPopup(true);
                    }}
                  >
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
      {/* Delete User Modal */}
      <DeleteRoleModal
        confirmPopup={confirmPopup}
        setConfirmPopup={setConfirmPopup}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        mobile={true}
      />
    </>
  );
};

export default MobileRoles;
