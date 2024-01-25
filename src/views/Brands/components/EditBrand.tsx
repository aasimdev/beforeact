import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { useLocation, useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import BrandLogoImg from "../../../assets/images/banana.png";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import Sidebar from "../../../components/Sidebar";
import { useGetTenantUsersQuery } from "../../../redux/api/brandApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { capitalizeFirstLetter, formatDate } from "../../../utils";
import DeleteUserFromBrand from "./DeleteUserFromBrand";

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

  // Table body templates
  const actionBodyTemplate = (data: UserDT) => {
    // console.log(data);

    return <Button label="Delete" text onClick={() => deleteUser(data)} />;
  };

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

          {/* Delete User Modal */}
          <DeleteUserFromBrand
            visible={visible}
            setVisible={setVisible}
            selectedUser={selectedUser}
            title={title}
            id={id}
          />
        </div>
      </div>
    </>
  );
};

export default EditBrand;
