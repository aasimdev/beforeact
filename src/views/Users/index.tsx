// React Imports
import React, { useEffect, useState } from "react";
// Prime React Imports
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// Redux
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
// Utils
import { formatDate } from "../../utils";
// Custom
import Title from "../../components/Title";
import DeletedUsers from "./components/DeleteUser";
import ViewUserModal from "./components/ViewUserModal";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import ToastAlert from "../../components/ToastAlert";
import DotLoader from "../../components/Spinner/dotLoader";
import DeleteUserModal from "./components/DeleteUserModal";
// Assets
import MobileUsers from "./mobile/MobileUsers";
import Layout from "../../components/Layout";
import { DesktopUser, SortIcon } from "../../assets";
import { Paginator } from "primereact/paginator";

interface UserDT {
  userName: any;
  email: string | null;
  dateJoined: any;
  id: string;
}

const Users = () => {
  const [newUser, setNewUser] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDT | null>(null);
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const [activeUsers, setActiveUsers] = useState<UserDT[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<UserDT[]>([]);
  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  // GET ALL USERS
  const { data, isLoading } = useGetAllUsersQuery({});

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

  // CREATE NEW USER API BIND
  const [createNewUser, { isLoading: createUserLoading }] =
    useCreateUserMutation();

  const CreateUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      userName: e.currentTarget.userName.value,
      email: e.currentTarget.email.value,
    };

    try {
      const userResponse: any = await createNewUser(payload);

      if (userResponse?.data) {
        ToastAlert("User Created Successfully", "success");
        setNewUser(false);
      }
      if (userResponse?.error) {
        ToastAlert(userResponse?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Creating User Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  // Deleted Users View Information
  const actionDeletedBodyTemplate = (data: UserDT) => {
    return (
      <>
        <Button
          label="View"
          text
          onClick={() => {
            setVisible(true);
            setSelectedUser(data);
          }}
        />
      </>
    );
  };

  // UPDATE USER API BIND
  const [updateUser] = useUpdateUserMutation();

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    let _products = [...activeUsers];
    let { newData, index } = e;

    _products[index] = newData as UserDT;

    const payload = {
      id: newData.id,
      userName: newData.userName,
      email: newData.email,
    };

    try {
      const user: any = await updateUser(payload);

      if (user?.data === null) {
        ToastAlert("User Updated Successfully", "success");
      }
      if (user?.error) {
        ToastAlert(user?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Update User Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  const ViewColumn = (data: UserDT) => (
    <Button
      label="View"
      text
      onClick={() => {
        setSelectedUser(data);
        setVisible(true);
      }}
    />
  );

  const DeleteColumn = (data: UserDT) => (
    <Button
      label="Delete"
      text
      onClick={() => {
        setSelectedUser(data);
        setConfirmPopup(true);
      }}
    />
  );

  const textEditor = (options: any) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback!(e.target.value)
        }
      />
    );
  };

  return (
    <>
      <Layout>
        {isLoading && <OverlayLoader />}

        <Title brand={false} title="Users" image={DesktopUser} />

        {/* Active Users Table */}
        <div className="bg-white p-6 rounded-lg shadow-sidebar mt-6">
          <DataTable
            value={activeUsers?.slice(first, first + rows)}
            editMode="row"
            dataKey="userName"
            onRowEditComplete={onRowEditComplete}
            className="theme-table relative"
            sortIcon={() => {
              return (
                <>
                  <img src={SortIcon} alt="Sort Icon" />
                </>
              );
            }}
            rowEditorInitIcon={
              <button
                style={{
                  color: "#696cff",
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: 500,
                }}
              >
                Edit
              </button>
            }
          >
            <Column
              field="userName"
              header="USER NAME"
              editor={(options) => textEditor(options)}
              sortable
            ></Column>
            <Column
              field="email"
              header="EMAIL"
              editor={(options) => textEditor(options)}
              sortable
            ></Column>
            <Column
              field="dateJoined"
              body={(data) => formatDate(data.dateJoined)}
              header="DATE JOINED"
              sortable
            ></Column>
            <Column field="View" body={(data) => ViewColumn(data)}></Column>
            <Column rowEditor></Column>
            <Column field="Delete" body={(data) => DeleteColumn(data)}></Column>
          </DataTable>

          {newUser && (
            <div className="py-1 px-6 border-b-gray-300 border-b">
              <form
                className="flex items-center gap-8"
                onSubmit={CreateUserHandler}
                autoComplete="off"
              >
                <InputText
                  type="text"
                  id="userName"
                  placeholder="User Name"
                  className="theme-input shadow-btn w-56"
                />
                <InputText
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="theme-input shadow-btn w-56"
                />
                <div className="flex items-center gap-2">
                  {createUserLoading ? (
                    <div
                      className="theme-btn leading-none"
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
                      label="Create"
                      className="theme-btn leading-none"
                      disabled={createUserLoading}
                    />
                  )}
                  <Button
                    type="button"
                    label="Cancel"
                    className="theme-btn-default leading-none"
                    disabled={createUserLoading}
                    onClick={() => setNewUser(false)}
                  />
                </div>
              </form>
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
          <div>
            <Paginator
              className="flex justify-end items-center"
              first={first}
              rows={rows}
              totalRecords={activeUsers?.length}
              onPageChange={(e) => {
                setFirst(e.first);
                setRows(e.rows);
              }}
              template={{
                layout: "PrevPageLink PageLinks NextPageLink CurrentPageReport",
                CurrentPageReport: (options) => {
                  return (
                    <div className="edit-paginator-current">
                      {`Showing ${options?.first} to ${options?.last} of ${options?.totalRecords} entries`}
                    </div>
                  );
                },
                PrevPageLink: (options) => {
                  return (
                    <button
                      onClick={options.onClick}
                      disabled={options.disabled}
                      className="mr-2 h-[48px] theme-btn-default"
                    >
                      Previous
                    </button>
                  );
                },

                NextPageLink: (options) => {
                  return (
                    <button
                      onClick={options.onClick}
                      disabled={options.disabled}
                      className="ml-2 h-[48px] theme-btn-default"
                    >
                      Next
                    </button>
                  );
                },
                PageLinks: (options: any) => {
                  const isActive = options.page === options.currentPage;

                  return (
                    <div
                      className={`p-paginator-page p-paginator-element p-link p-paginator-page-start mx-2 rounded-lg font-medium ${
                        isActive
                          ? "bg-blue text-white shadow-btn"
                          : "bg-white text-blue"
                      }`}
                      onClick={options.onClick}
                    >
                      {options.page + 1}
                    </div>
                  );
                },
              }}
            />
          </div>
        </div>
        {/* Deleted Users List */}
        <DeletedUsers
          actionDeletedBodyTemplate={actionDeletedBodyTemplate}
          users={deletedUsers}
        />
        {/* Delete User Modal */}
        <DeleteUserModal
          confirmPopup={confirmPopup}
          setConfirmPopup={setConfirmPopup}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        {/* View User Modal */}
        <ViewUserModal
          visible={visible}
          setVisible={setVisible}
          selectedUser={selectedUser}
        />
      </Layout>

      {/* Mobile Version of Dashboard */}
      <div className="px-4 pt-4 pb-10 sm:p-8 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileUsers />
      </div>
    </>
  );
};

export default Users;
