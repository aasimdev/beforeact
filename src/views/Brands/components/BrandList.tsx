import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

interface Brand {
  name: any;
  id: string | null;
  website: any;
}

interface BrandListProps {
  brands: Brand[];
  actionBodyTemplate: any;
}

const BrandList: React.FC<BrandListProps> = ({
  brands,
  actionBodyTemplate,
}) => {
  const getRandomColor = () => {
    const colors = [
      { background: "E7E7FF", color: "696CFF" },
      { background: "E5F9FD", color: "03C3EC" },
      { background: "FFEBE8", color: "FF3E1D" },
      { background: "FFF2D6", color: "FFAB00" },
      { background: "F0FCEA", color: "82E14F" },
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Name Template
  const nameBodyTemplate = (data: any) => {
    const randomColor = getRandomColor();
    return (
      <div className="flex items-center gap-4">
        <div
          className={`grow-0 shrink-0 basis-auto w-6 h-6 rounded-full text-white flex items-center justify-center`}
          style={{
            background: "#" + randomColor.background,
            color: "#" + randomColor.color,
          }}
        >
          {data.name.charAt(0).toUpperCase()}
        </div>
        <span>{data.name}</span>
      </div>
    );
  };

  return (
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
  );
};

export default BrandList;
