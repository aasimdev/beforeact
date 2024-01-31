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
import MobileSideBar from "../../../components/MobileSideBar";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import DotLoader from "../../../components/Spinner/dotLoader";
import ToastAlert from "../../../components/ToastAlert";
// Assets
import RoundImage from "../../../assets/images/users_logo.svg";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import MobileDeletedUsers from "./MobileDeletedUsers";

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
    <>
      {usersLoading && <OverlayLoader />}

      <MobileSideBar />
      <Header />

      <div className="my-2">
        <Title brand={false} title="Users" image={RoundImage} />
        <div className={`${openCard ? "mt-6" : "my-0"}`}>
          <div
            className={` ${openCard ? "p-4" : "pt-4 pb-4"} ${
              openCard ? "bg-white" : "bg-transparent"
            } rounded-lg  ${openCard ? "mb-6" : ""}`}
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
                      <div className="mb-2">
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
                        className="theme-btn-default leading-none w-full my-4"
                        onClick={() => {
                          setOpenCard(false);
                          setFormData({
                            userName: "",
                            email: "",
                          });
                        }}
                      />
                      {isLoading ? (
                        <div
                          className="theme-btn"
                          style={{
                            height: "55px",
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
                          disabled={isLoading}
                          className="theme-btn w-full"
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
        <div className="flex justify-between items-center">
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
              setToggleValue("deletedUsers");
            }}
            className="shadow-none border-0 font-medium"
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
            "USERS LIST"
          ) : (
            <>
              <MobileDeletedUsers deletedUsers={deletedUsers} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileUsers;
