// React Imports
import { useEffect, useState } from "react";
// Prime React Imports
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// React Icons
import { RiDeleteBinLine } from "react-icons/ri";
// Redux
import {
  useCreateRoleMutation,
  useGetAllRolesQuery,
} from "../../../redux/api/roleApiSlice";
// Custom
import Title from "../../../components/Title";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import ToastAlert from "../../../components/ToastAlert";
import DotLoader from "../../../components/Spinner/dotLoader";
import DeleteRoleModal from "../components/DeleteRoleModal";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../../../components/Layout/MobileLayout";
import { MobileBrand } from "../../../assets";

const MobileRoles = () => {
  const navigate = useNavigate();

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
    <MobileLayout>
      {isLoading && <OverlayLoader />}

      <div>
        <Title brand={false} title="Roles" image={MobileBrand} />
      </div>

      {/* Table Show */}
      <div className="mt-6 mb-12 bg-white rounded-lg p-4">
        <div className="mt-2 rounded-lg bg-body-2 py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-200 font-semibold text-[18px]">Name</div>

            <div className="text-gray-200 font-semibold text-[18px]">
              Actions
            </div>
          </div>
        </div>
        {roles?.map((role: any) => {
          return (
            <div key={role?.id}>
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="pl-2 text-[18px] font-normal text-gray">
                  {role?.name}
                </div>
                <div className="flex items-center gap-8 pr-2">
                  <div
                    className="text-blue text-[24px]"
                    onClick={() => {
                      navigate(`/roles/${role?.id}`);
                    }}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </div>
                  <div
                    className="text-blue text-[24px]"
                    onClick={() => {
                      setSelectedRole(role);
                      setConfirmPopup(true);
                    }}
                  >
                    <RiDeleteBinLine />
                  </div>
                </div>
              </div>
              <Divider className="my-1" />
            </div>
          );
        })}

        <div className="mt-5 mb-2">
          <div className={`rounded-lg ${openCard ? "bg-white pt-4 px-3" : ""}`}>
            {openCard && (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <form className="" onSubmit={CreateRoleHandler}>
                      <div className="mb-6">
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
                        className="theme-btn-default leading-none w-full mb-4 text-gray-100 h-[48px] font-normal text-[22px] rounded-lg"
                        onClick={() => {
                          setOpenCard(false);
                          setFormData({
                            name: "",
                          });
                        }}
                      />
                      {createRoleLoading ? (
                        <div className="theme-btn h-[48px] flex items-center justify-center">
                          <DotLoader color="#fff" size={12} />
                        </div>
                      ) : (
                        <Button
                          type="submit"
                          disabled={createRoleLoading}
                          className="theme-btn w-full h-[48px]"
                          label="Create"
                        />
                      )}
                    </form>
                    <Divider className="mt-6" />
                  </div>
                </div>
              </>
            )}
            {!openCard && (
              <div className="pb-5 pt-1 pl-4 border-b-gray-300 border-b transition-all duration-300 hover:bg-blue-200">
                <Button
                  label="New Role"
                  icon="bx bx-plus"
                  text
                  className="p-0 text-lg text-blue block w-full text-left hover:bg-transparent focus:outline-0 focus:ring-0"
                  onClick={() => setOpenCard(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Delete User Modal */}
      <DeleteRoleModal
        confirmPopup={confirmPopup}
        setConfirmPopup={setConfirmPopup}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        mobile={true}
      />
    </MobileLayout>
  );
};

export default MobileRoles;
