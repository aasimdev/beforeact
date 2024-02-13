// React Imports
import { useEffect, useState } from "react";
// Prime React Imports
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// Redux
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/api/userApiSlice";
// Custom
import Title from "../../../components/Title";
import DotLoader from "../../../components/Spinner/dotLoader";
import ToastAlert from "../../../components/ToastAlert";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import MobileDeletedUsers from "./MobileDeletedUsers";
import MobileUserList from "./MobileUserList";
import MobileLayout from "../../../components/Layout/MobileLayout";
import { MobileUser } from "../../../assets";

const MobileUsers = () => {
  const [openCard, setOpenCard] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
  });
  const [toggleValue, setToggleValue] = useState("users");
  const [activeUsers, setActiveUsers] = useState<any>([]);
  const [deletedUsers, setDeletedUsers] = useState<any>([]);

  // GET ALL USERS
  const { data, isLoading: usersLoading } = useGetAllUsersQuery({});

  useEffect(() => {
    if (data) {
      // ACTIVE USERS
      const activeUsers = data?.users?.filter((user: any) => !user.deleted);
      setActiveUsers(activeUsers);

      // DELETED USERS
      const deletedUsers = data?.users?.filter((user: any) => user.deleted);
      setDeletedUsers(deletedUsers);
    }
  }, [data]);

  // CREATE USER API BIND
  const [createNewUser, { isLoading }] = useCreateUserMutation();

  const CreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      userName: formData.userName,
      email: formData.email,
    };

    try {
      const userResponse: any = await createNewUser(payload);

      if (userResponse?.data) {
        setOpenCard(false);
        setFormData({
          userName: "",
          email: "",
        });
        ToastAlert("User Created Successfully", "success");
      }
      if (userResponse?.error) {
        ToastAlert(userResponse?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Creating User Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  return (
    <MobileLayout>
      {usersLoading && <OverlayLoader />}

      <div>
        <Title brand={false} title="Users" image={MobileUser} />

        <div className="flex items-center my-6">
          <Button
            className="shadow-none border-0 text-[16px] font-normal rounded-lg"
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
              setToggleValue("deletedUsers");
            }}
            className="shadow-none border-0 text-[16px] font-normal rounded-lg"
            style={{
              backgroundColor:
                toggleValue === "deletedUsers" ? "#696CFF" : "transparent",
              color: toggleValue === "deletedUsers" ? "#fff" : "#697A8D",
            }}
          >
            Deleted Users
          </Button>
        </div>

        <div className="my-4">
          {toggleValue === "users" ? (
            <>
              <MobileUserList activeUsers={activeUsers} />

              <div className={`${openCard ? "mt-6" : "my-0"}`}>
                <div
                  className={`${
                    openCard
                      ? "p-4 bg-white mb-12"
                      : "pt-6 pb-12 bg-transparent"
                  } rounded-lg`}
                >
                  {openCard && (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <form className="" onSubmit={CreateUser}>
                            <div className="mb-4">
                              <InputText
                                id="brandId"
                                placeholder="User Name"
                                className="theme-input"
                                style={{
                                  width: "100%",
                                }}
                                value={formData.userName}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    userName: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="mb-6">
                              <InputText
                                id="website"
                                placeholder="Email Address"
                                className="theme-input"
                                style={{
                                  width: "100%",
                                }}
                                value={formData.email}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
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
                                  userName: "",
                                  email: "",
                                });
                              }}
                            />
                            {isLoading ? (
                              <div className="theme-btn h-[48px] flex items-center justify-center">
                                <DotLoader color="#fff" size={12} />
                              </div>
                            ) : (
                              <Button
                                type="submit"
                                disabled={isLoading}
                                className="theme-btn w-full h-[48px]"
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
                      className="theme-btn w-full text-center flex justify-center"
                      onClick={() => {
                        setOpenCard(true);
                      }}
                    >
                      + New User
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <MobileDeletedUsers deletedUsers={deletedUsers} />
            </>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileUsers;
