import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import Title from "../../common/Title";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import DeletedUsers from "./components/DeleteUser";
import ViewUser from "./components/ViewUser";
import ConfirmPopup from "../../components/ConfirmPopup";
import Sidebar from "../../common/Sidebar";

interface UserDT {
  username: any;
  email: string | null;
  datejoined: any;
}

const Users = () => {
  const [users, setUsers] = useState<UserDT[]>([]);
  const [newUser, setNewUser] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDT | null>(null);
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);

  useEffect(() => {
    setUsers([
      {
        username: "admin",
        email: "admin@apescasino.com",
        datejoined: "01/01/2024",
      },
      {
        username: "user2",
        email: "user2@apescasino.com",
        datejoined: "01/01/2024",
      },
      {
        username: "user3",
        email: "user3@apescasino.com",
        datejoined: "01/01/2024",
      },
    ]);
  }, []);

  // View Brands
  const viewBrand = (data: UserDT) => {
    console.log(data);
  };

  // Edit Brand
  // const editBrand = (data: UserDT) => {
  //   console.log(data);
  // };

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    let _products = [...users];
    let { newData, index } = e;

    _products[index] = newData as UserDT;

    setUsers(_products);
  };

  // Action Body
  const actionBodyTemplate = (data: UserDT) => {
    return (
      <>
        <Button label="View" text onClick={() => setVisible(true)} />
        <Button label="Edit" text onClick={() => viewBrand(data)} />
        <Button label="Delete" text onClick={() => deleteUser(data)} />
      </>
    );
  };

  // Action Deleted Body
  const actionDeletedBodyTemplate = (data: UserDT) => {
    return (
      <>
        <Button label="View" text onClick={() => viewBrand(data)} />
      </>
    );
  };

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

  const saveBtn = (options: any) => {
    return <Button label="Save" className="theme-btn" />;
  };

  // Handlers
  const deleteUser = (data: UserDT) => {
    setSelectedUser(data);
    setConfirmPopup(true);
  };

  const handleDelete = () => {
    const updatedUsers = users.filter(
      (user) => user.username !== selectedUser?.username
    );
    setUsers(updatedUsers);
    setConfirmPopup(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 lg:ml-80">
          <Header />
          <Title brand={false} title="Users" />

          <div className="bg-white p-6 rounded-lg shadow-sidebar mt-6">
            <DataTable
              value={users}
              editMode="row"
              dataKey="username"
              onRowEditComplete={onRowEditComplete}
              className="theme-table"
            >
              <Column
                field="username"
                header="USERNAME"
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field="email"
                header="EMAIL"
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field="datejoined"
                editor={(options) => saveBtn(options)}
                header="DATE JOINED"
              ></Column>
              <Column body={actionBodyTemplate}></Column>
            </DataTable>
            {newUser && (
              <div className="py-1 px-6 border-b-gray-300 border-b">
                <form className="flex items-center gap-8">
                  <InputText
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="theme-input shadow-btn w-56"
                  />
                  <InputText
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className="theme-input shadow-btn w-56"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      label="Create"
                      className="theme-btn leading-none"
                    />
                    <Button
                      type="button"
                      label="Cancel"
                      className="theme-btn-default leading-none"
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
          </div>

          {/* Deleted Users */}
          <DeletedUsers
            actionDeletedBodyTemplate={actionDeletedBodyTemplate}
            users={users}
          />

          {/* Confirm Popup */}
          <ConfirmPopup
            setConfirmPopup={setConfirmPopup}
            confirmPopup={confirmPopup}
            onDelete={handleDelete}
          >
            <div className="text-center">
              <h2 className="mb-6 text-4xl text-gray-200 font-semibold">
                Are you sure?
              </h2>
              <p className="text-[22px] text-gray-200">
                You are about to delete the user:{" "}
                <span className="text-blue font-semibold">XXX</span>
              </p>
            </div>
          </ConfirmPopup>

          {/* View Popup */}
          <ViewUser setVisible={setVisible} visible={visible} />
        </div>
      </div>
    </>
  );
};

export default Users;
