import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { useLocation, useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";

import closeIcon from "../../../assets/images/close-icon.svg";
import BrandLogoImg from "../../../assets/images/banana.png";
import { Image } from "primereact/image";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import Sidebar from "../../../components/Sidebar";
import {
  useGetTenantUsersQuery,
  useRemoveUserFromTenantMutation,
} from "../../../redux/api/brandApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { capitalizeFirstLetter, formatDate } from "../../../utils";
import ToastAlert from "../../../components/ToastAlert";
import DotLoader from "../../../components/Spinner/dotLoader";

interface UserDT {
  userName: any;
  email: string | null;
  dateJoined: any;
  id: any;
  deleted: boolean;
}

const EditBrand = () => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  // states
  const [users, setUsers] = useState<UserDT[]>([]);
  const [title, setTitle] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDT | null>(null);

  // GET TENANT USERS
  const { data, isLoading } = useGetTenantUsersQuery(id);

  useEffect(() => {
    if (data) {
      // Find all users who are not deleted
      const allUsers: UserDT[] = data.users;
      const activeUsers: UserDT[] = allUsers.filter((user) => !user.deleted);
      setUsers(activeUsers);
    }
  }, [data]);

  useEffect(() => {
    const lastSegment = pathname.split("/").pop();
    const capitalizedLastSegment = lastSegment
      ? capitalizeFirstLetter(lastSegment)
      : "";
    setTitle(capitalizedLastSegment);
  }, [pathname]);

  const sUsers = [
    { name: "Option A", code: "1" },
    { name: "Option B", code: "2" },
    { name: "Option C", code: "3" },
  ];

  // REMOVE USER API BIND
  const [removeUserApi, { isLoading: removeUserLoading }] =
    useRemoveUserFromTenantMutation();

  const removeUser = async (user: any) => {
    const payload = {
      userId: user.id,
      tenantId: id,
    };

    try {
      const user: any = await removeUserApi(payload);

      if (user?.data === null) {
        ToastAlert("User Deleted Successfully", "success");
        setVisible(false);
      }

      if (user?.error) {
        ToastAlert(user?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Deleting User Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  // Table body templates
  const actionBodyTemplate = (data: UserDT) => {
    // console.log(data);

    return <Button label="Delete" text onClick={() => deleteUser(data)} />;
  };

  // Close Popup Icon
  const closeIconTemplate = <Image src={closeIcon} alt="close icon" />;

  // Handlers
  const deleteUser = (data: UserDT) => {
    setSelectedUser(data);
    setVisible(true);
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 lg:ml-80">
          <Header />
          <Title brand={BrandLogoImg} title={title} />
          <Breadcrumb />
          <div className="bg-white p-6 rounded-lg shadow-sidebar mt-6">
            <h3 className="text-[28px] text-blue pt-2 pb-8 px-6 font-medium">
              Users in Brand
            </h3>

            <DataTable value={users} className="theme-table">
              <Column field="userName" header="USER NAME"></Column>
              <Column
                field="email"
                header="EMAIL"
                body={(rowData) => (rowData.email ? rowData.email : "N/A")}
              ></Column>
              <Column
                field="dateJoined"
                header="DATE JOINED"
                body={(rowData) => formatDate(rowData.dateJoined)}
              ></Column>
              <Column
                body={actionBodyTemplate}
                style={{ minWidth: "12rem" }}
              ></Column>
            </DataTable>

            {newUser && (
              <div className="py-1 px-6 border-b-gray-300 border-b">
                <Dropdown
                  value={selectUser}
                  onChange={(e) => setSelectUser(e.value)}
                  options={sUsers}
                  optionLabel="name"
                  placeholder="Select a user"
                  className="theme-input shadow-btn w-60"
                />
              </div>
            )}

            <div className="py-4 px-6 border-b-gray-300 border-b transition-all duration-300 hover:bg-blue-200">
              <Button
                label="New User"
                icon="bx bx-plus"
                text
                className="p-0 text-lg text-blue block w-full text-left hover:bg-transparent focus:outline-0 focus:ring-0"
                onClick={() => setNewUser(true)}
              />
            </div>
          </div>

          {/* Confirm Popup */}
          <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            style={{ width: "50vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            headerStyle={{ padding: 0 }}
            closeIcon={closeIconTemplate}
            contentClassName="p-0"
          >
            <div className="px-[104px] py-16">
              <div className="text-center">
                <h2 className="mb-6 text-4xl text-gray-200 font-semibold">
                  Are you sure?
                </h2>
                <p className="text-[22px] text-gray-200">
                  You are about to delete the user:{" "}
                  <span className="text-blue font-semibold">
                    {selectedUser?.userName}
                  </span>{" "}
                  <br />
                  from the brand{" "}
                  <span className="text-blue font-semibold">{title}</span>
                </p>
              </div>

              <div>
                <div className="flex items-center justify-end gap-6 mt-10">
                  <Button
                    type="button"
                    className="theme-btn-default"
                    label="Cancel"
                    onClick={() => setVisible(false)}
                    disabled={removeUserLoading}
                  />

                  {removeUserLoading ? (
                    <div
                      className="theme-btn leading-none"
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
                      type="button"
                      className="theme-btn"
                      label="Yes, delete this user"
                      onClick={() => removeUser(selectedUser)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default EditBrand;
