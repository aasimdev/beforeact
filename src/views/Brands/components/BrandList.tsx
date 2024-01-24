import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { generateColor } from "../../../utils";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllTenantsQuery } from "../../../redux/api/brandApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";

interface BrandDT {
  name: any;
  id: string | null;
  website: any;
  filterId: string | number;
}

const BrandList = () => {
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

  // View Brands
  const viewBrand = (data: BrandDT) => {
    console.log("view brand", data);
  };

  // Edit Brand
  const editBrand = (data: BrandDT) => {
    navigate(`/brands/${data.filterId}`);
  };

  // Action Body
  const actionBodyTemplate = (data: BrandDT) => {
    return (
      <>
        <Button label="View" text onClick={() => viewBrand(data)} />
        <Button label="Edit" text onClick={() => editBrand(data)} />
      </>
    );
  };

  // Name Template
  const nameBodyTemplate = (data: any) => {
    const randomColor = generateColor(data?.name);
    return (
      <div className="flex items-center gap-4">
        <div
          className={`grow-0 shrink-0 basis-auto w-6 h-6 rounded-full text-white flex items-center justify-center`}
          style={{
            background: randomColor.background,
            color: randomColor.color,
          }}
        >
          {data.name.charAt(0).toUpperCase()}
        </div>
        <span>{data.name}</span>
      </div>
    );
  };

  return (
    <>
      {isLoading && <OverlayLoader />}

      <div className="bg-white p-6 rounded-lg shadow-sidebar">
        <DataTable
          value={brands}
          className="theme-table"
          scrollable
          scrollHeight="500px"
          virtualScrollerOptions={{ itemSize: 46 }}
        >
          <Column field="name" header="NAME" body={nameBodyTemplate}></Column>
          <Column field="filterId" header="ID"></Column>
          <Column field="website" header="WEBSITE"></Column>
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default BrandList;
