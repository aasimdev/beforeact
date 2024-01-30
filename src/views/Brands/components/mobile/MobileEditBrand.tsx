import { useEffect, useState } from "react";
import BrandImage from "../../../../assets/images/brands_logo.svg";
import Title from "../../../../components/Title";
import {
  capitalizeFirstLetter,
  formatDate,
  generateColor,
} from "../../../../utils";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../../../components/Breadcrumb/Index";
import { useGetTenantUsersQuery } from "../../../../redux/api/brandApiSlice";
import OverlayLoader from "../../../../components/Spinner/OverlayLoader";
import { FiUser } from "react-icons/fi";
import { Button } from "primereact/button";

interface UserDT {
  userName: any;
  email: string | null;
  dateJoined: any;
  id: any;
  deleted: boolean;
}

const MobileEditBrand = () => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  // states
  const [title, setTitle] = useState("");
  const [tenantUsers, setTenantUsers] = useState<UserDT[]>([]);

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

  console.log("tenantUsers", tenantUsers);

  return (
    <>
      {isLoading && <OverlayLoader />}

      <div className="w-full flex-1">
        <Title brand={BrandImage} title={title} />
        <Breadcrumb mainLabel="Manage Brands" label="Brands" url="/brands" />
        <div className="bg-white p-3 rounded-lg shadow-sidebar mt-6">
          <h3 className="text-[24px] text-blue font-medium">Users in Brand</h3>
        </div>

        {tenantUsers?.map((user) => {
          const randomColor = generateColor(data?.userName);

          return (
            <div className="bg-white p-2 rounded-lg mt-4" key={user?.id}>
              <div className="flex items-center gap-3 my-2">
                <div
                  className="rounded-lg p-2"
                  style={{
                    backgroundColor: randomColor.background,
                    color: randomColor.color,
                  }}
                >
                  <FiUser />
                </div>
                <div>
                  <div
                    style={{
                      color: randomColor.color,
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    {user?.userName}
                  </div>
                  <div className="text-[16px] text-gray-100">
                    {formatDate(user?.dateJoined)}
                  </div>
                </div>
              </div>
              <div className="text-gray-200 text-[18px] font-medium">
                {user?.email}
              </div>
              <Button
                label="Delete"
                text
                className="rounded-lg py-[6px] px-[14px] my-2"
                style={{
                  backgroundColor: randomColor.background,
                  color: randomColor.color,
                }}
                // onClick={() => deleteUser(data)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MobileEditBrand;
