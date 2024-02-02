import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllTenantsQuery } from "../../../redux/api/brandApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { generateColor } from "../../../utils";
import { Button } from "primereact/button";

const MobileBrandList = () => {
  const navigate = useNavigate();
  // states
  const [brands, setBrands] = useState([]);

  // GET ALL BRANDS
  const { data, isLoading } = useGetAllTenantsQuery({});

  useEffect(() => {
    if (data) {
      setBrands(data.tenants);
    }
  }, [data]);

  return (
    <>
      {isLoading && <OverlayLoader />}

      {brands?.map((brand: any, index: number) => {
        const randomColor = generateColor(data?.name);
        const lastIndex = brands.length - 1;

        return (
          <div
            className={`bg-white p-6 ${
              lastIndex === index ? "mb-12" : "mb-[24px]"
            }  rounded-lg`}
            key={brand?.name}
          >
            <div className="flex items-center">
              <div
                className={`grow-0 shrink-0 basis-auto w-[40px] h-[40px] rounded-full text-white flex items-center justify-center`}
                style={{
                  background: randomColor.background,
                  color: randomColor.color,
                }}
              >
                {brand?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="ml-4 text-[28px] font-semibold text-gray-200">
                {brand?.name}
              </div>
            </div>
            <div className="mt-[24px] mb-4 text-[20px] font-medium text-gray-200">
              {brand?.website}
            </div>
            <div className="text-[14px] font-normal text-gray">
              Brand ID: {brand?.filterId}
            </div>
            <div className="mt-[24px] flex items-center gap-3">
              <Button
                type="button"
                label="View"
                className="theme-btn-default leading-none rounded-lg font-normal text-[16px]"
                style={{
                  padding: "12px 24px",
                }}
              />
              <Button
                className="theme-btn text-[16px] font-normal rounded-lg"
                style={{
                  padding: "7px 24px",
                }}
                label="Manage"
                onClick={() => {
                  navigate(`/brands/${brand?.filterId}`);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MobileBrandList;
