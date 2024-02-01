// React Imports
import React, { useState } from "react";
// Prime React Imports
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
// Redux
import {
  useAddClientToRoleMutation,
  useRemoveClaimFromRoleMutation,
} from "../../../redux/api/roleApiSlice";
// Custom
import ToastAlert from "../../../components/ToastAlert";

interface MobileEditPermissionProps {
  permissions: any;
  claims: any;
  id: string;
}

const MobileEditPermission: React.FC<MobileEditPermissionProps> = (props) => {
  const { permissions, claims, id } = props;

  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCheckboxChange = (permission: any) => {
    setSelectedPermissions((prevPermissions: any) => ({
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));

    // Data Send to API
    handlePermissionStatus(permission, !selectedPermissions[permission]);
  };

  // CLAIM ROLE API BIND
  const [claimRole, { isLoading: claimRoleLoading }] =
    useAddClientToRoleMutation();

  // REMOVE CLAIM ROLE API BIND
  const [removeClaimRole, { isLoading: removeClaimRoleLoading }] =
    useRemoveClaimFromRoleMutation();

  const handlePermissionStatus = async (permission: any, status: any) => {
    const payload = {
      id,
      name: permission,
    };

    if (status) {
      try {
        const role: any = await claimRole(payload);

        if (role?.data === null) {
          ToastAlert("Role Claim Successfully", "success");
        }
        if (role?.error) {
          ToastAlert(role?.error?.data?.title, "error");
        }
      } catch (error) {
        console.error("Role Claim Error:", error);
        ToastAlert("Something went wrong", "error");
      }
    }
    if (!status) {
      try {
        const role: any = await removeClaimRole(payload);

        if (role?.data === null) {
          ToastAlert("Remove Role Successfully", "success");
        }
        if (role?.error) {
          ToastAlert(role?.error?.data?.title, "error");
        }
      } catch (error) {
        console.error("Removing Role Error:", error);
        ToastAlert("Something went wrong", "error");
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg py-2 px-3">
        <h3 className="text-[28px] text-blue px-2 pb-2 font-medium">
          Permissions
        </h3>
        <Divider className="my-1" />
        <div>
          {permissions?.map((permission: any) => {
            const isClaimed = claims?.some(
              (claim: any) => claim.value === permission
            );

            return (
              <div key={permission}>
                <div className="flex items-center justify-between my-3 px-2">
                  <div className="text-gray w-36 text-[18px] font-medium">
                    {permission}
                  </div>
                  <div className="text-gray text-[14px]">
                    <Checkbox
                      inputId={permission}
                      checked={
                        isClaimed ? true : selectedPermissions[permission]
                      }
                      onChange={() => handleCheckboxChange(permission)}
                      disabled={claimRoleLoading || removeClaimRoleLoading}
                    />
                  </div>
                </div>
                <Divider className="my-2" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileEditPermission;
