import React, { useEffect, useState } from "react";
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
            className={`bg-white p-4 ${
              lastIndex === index ? "mb-12" : "mb-4"
            }  rounded-lg`}
            key={brand?.name}
          >
            <div className="flex items-center">
              <div
                className={`grow-0 shrink-0 basis-auto w-9 h-9 rounded-full text-white flex items-center justify-center`}
                style={{
                  background: randomColor.background,
                  color: randomColor.color,
                }}
              >
                {brand?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="ml-4 text-[25px] font-semibold text-gray">
                {brand?.name}
              </div>
            </div>
            <div className="my-3 text-[20px] font-medium text-gray">
              {brand?.website}
            </div>
            <div className="text-[14px] font-normal text-gray">
              Brand ID: {brand?.filterId}
            </div>
            <div className="mt-4 mb-1 flex items-center gap-3">
              <Button
                type="button"
                label="View"
                className="theme-btn-default leading-none"
                style={{
                  padding: "12px 24px",
                  fontSize: "16px",
                }}
              />
              <Button
                className="theme-btn"
                style={{
                  padding: "7px 24px",
                  fontSize: "16px",
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
