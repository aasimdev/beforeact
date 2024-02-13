// React Imports
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// Prime Imports
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
// Redux
import {
  useAddUsersToTenantMutation,
  useGetTenantUsersQuery,
} from "../../../redux/api/brandApiSlice";
// Utils
import { capitalizeFirstLetter, formatDate } from "../../../utils";
// Custom
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import DeleteUserFromBrand from "./DeleteUserFromBrand";
import { useGetAllUsersQuery } from "../../../redux/api/userApiSlice";
import ToastAlert from "../../../components/ToastAlert";
import DotLoader from "../../../components/Spinner/dotLoader";
import MobileEditBrand from "../mobile/MobileEditBrand";
import Layout from "../../../components/Layout";
import { Banana, SortIcon } from "../../../assets";
import { Paginator } from "primereact/paginator";

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
  const [tenantUsers, setTenantUsers] = useState<UserDT[]>([]);
  const [title, setTitle] = useState("");
  const [dropDownUser, setDropDownUser] = useState<any>("");
  const [newUser, setNewUser] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDT | null>(null);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  useEffect(() => {
    const lastSegment = pathname.split("/").pop();
    const capitalizedLastSegment = lastSegment
      ? capitalizeFirstLetter(lastSegment)
      : "";
    setTitle(capitalizedLastSegment);
  }, [pathname]);

  // GET TENANT USERS
  const { data, isLoading } = useGetTenantUsersQuery(id);

  useEffect(() => {
    if (data) {
      // Find all users who are not deleted
      const allUsers: UserDT[] = data?.users;
      const activeUsers: UserDT[] = allUsers.filter((user) => !user.deleted);
      setTenantUsers(activeUsers);
    }
  }, [data]);

  // GET ALL USERS
  const { data: usersData, isLoading: dataLoading } = useGetAllUsersQuery({});

  useEffect(() => {
    if (usersData?.users) {
      // Find all users who are not deleted
      const users = usersData?.users?.filter((user: any) => !user.deleted);
      setActiveUsers(users);
    }
  }, [usersData]);

  // ADD USER TO ROLE API BIND
  const [addUserToBrand, { isLoading: createUserLoading }] =
    useAddUsersToTenantMutation();

  const addUserToRoleHandler = async () => {
    const payload = {
      tenantId: id,
      userName: dropDownUser?.userName,
    };

    try {
      const user: any = await addUserToBrand(payload);

      if (user?.data === null) {
        setNewUser(false);
        setDropDownUser("");
        ToastAlert("User Created Successfully", "success");
      }
      if (user?.error) {
        ToastAlert(user?.error?.data?.title, "error");
      }
    } catch (error) {
      console.error("Creating User Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  // Table body templates
  const actionBodyTemplate = (data: UserDT) => {
    return <Button label="Delete" text onClick={() => deleteUser(data)} />;
  };

  // Handlers
  const deleteUser = (data: UserDT) => {
    setSelectedUser(data);
    setVisible(true);
  };

  return (
    <>
      <Layout>
        {(isLoading || dataLoading) && <OverlayLoader />}

        <Title brand={Banana} title={title} />
        <Breadcrumb mainLabel="Manage Brands" label="Brands" url="/brands" />
        <div className="bg-white p-6 rounded-lg shadow-sidebar mt-6">
          <h3 className="text-[28px] text-blue pt-2 pb-8 px-6 font-medium">
            Users in Brand
          </h3>

          <DataTable
            value={tenantUsers?.slice(first, first + rows)}
            className="theme-table relative"
            sortIcon={() => {
              return (
                <>
                  <img src={SortIcon} alt="Sort Icon" />
                </>
              );
            }}
          >
            <Column field="userName" header="USER NAME" sortable></Column>
            <Column
              field="email"
              header="EMAIL"
              body={(rowData) => (rowData.email ? rowData.email : "N/A")}
              sortable
            ></Column>
            <Column
              field="dateJoined"
              header="DATE JOINED"
              body={(rowData) => formatDate(rowData.dateJoined)}
              sortable
            ></Column>
            <Column
              body={actionBodyTemplate}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>

          {newUser && (
            <div className="py-1 px-6 flex gap-8 border-b-gray-300 border-b">
              <Dropdown
                value={dropDownUser}
                onChange={(e) => setDropDownUser(e.value)}
                options={activeUsers}
                optionLabel="userName"
                placeholder="Select a user"
                className="theme-input shadow-btn w-60"
              />

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
                  onClick={addUserToRoleHandler}
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
                onClick={() => {
                  setNewUser(false);
                  setDropDownUser("");
                }}
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
          <div>
            <Paginator
              className="flex justify-end items-center"
              first={first}
              rows={rows}
              totalRecords={tenantUsers?.length}
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
        {/* Delete User Modal */}
        <DeleteUserFromBrand
          visible={visible}
          setVisible={setVisible}
          selectedUser={selectedUser}
          title={title}
          id={id}
        />
      </Layout>
      {/* Mobile Version of Edit Brands */}
      <div className="pt-4 px-4 pb-10 w-full flex-1 lg:ml-80 lg:hidden md:hidden sm:hidden">
        <MobileEditBrand />
      </div>
    </>
  );
};

export default EditBrand;
