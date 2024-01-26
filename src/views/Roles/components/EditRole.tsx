import React from "react";
import { useLocation } from "react-router-dom";
import { useGetRoleByIdQuery } from "../../../redux/api/roleApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import Breadcrumb from "../../../components/Breadcrumb/Index";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatDate } from "../../../utils";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";

const EditRole = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  // GET ALL ROLES
  const { data, isLoading } = useGetRoleByIdQuery(id);

  const DeleteColumn = (data: any) => (
    <Button
      label="Delete"
      text
      onClick={() => {
        // setSelectedRole(data);
        alert("ok");
        // setConfirmPopup(true);
      }}
    />
  );

  return (
    <>
      {isLoading && <OverlayLoader />}

      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full flex-1 lg:ml-80">
          <Header />
          <Title brand={false} title={data?.role?.name} />
          <Breadcrumb mainLabel="Edit Roles" label="Roles" url="/roles" />

          <div>
            <div className="mt-4 text-gray text-[18px] font-bold">NAME</div>
            <div className="mt-2 text-gray text-[14px]">
              <InputText
                type="text"
                id="name"
                placeholder="Name"
                className="theme-input shadow-btn w-full"
                value={data?.role?.name}
                disabled
              />
            </div>
          </div>
          <div>
            <div className="bg-white p-4 rounded-lg shadow-sidebar mt-6">
              <h3 className="pl-4 text-[22px] text-blue pb-6 font-normal">
                Users in Role
              </h3>
              <DataTable value={data?.users} className="theme-table">
                <Column field="userName" header="USER NAME"></Column>
                <Column field="email" header="EMAIL"></Column>
                <Column
                  field="dateJoined"
                  header="DATE JOINED"
                  body={(data) => formatDate(data.dateJoined)}
                ></Column>
                <Column
                  field="Delete"
                  body={(data) => DeleteColumn(data)}
                ></Column>
              </DataTable>
            </div>
          </div>

          <div>
            <div className="bg-white p-4 rounded-lg shadow-sidebar mt-6">
              <h3 className="pl-4 text-[22px] text-blue font-normal">
                Permissions
              </h3>
              <Divider type="solid" />

              {data?.permissions?.map((permission: any) => (
                <>
                  <div className="pl-4 flex items-center gap-24">
                    <div className="text-gray w-36 text-[18px] font-medium">
                      {permission}
                    </div>
                    <div className="mt-2 text-gray text-[14px]">
                      <Checkbox
                        inputId="manageUsers"
                        checked={true}
                        onChange={() => {}}
                        // inputId="manageUsers"
                        // checked={newUserCheckBox.manageUsers}
                        // onChange={() =>
                        //   setNewUserCheckBox((prev) => ({
                        //     ...prev,
                        //     manageUsers: !prev.manageUsers,
                        //   }))
                      />
                    </div>
                  </div>
                  <Divider type="solid" />
                </>
              ))}
            </div>
            {/* border bottom gray */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRole;
