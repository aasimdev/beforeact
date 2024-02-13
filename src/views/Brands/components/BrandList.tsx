import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { generateColor } from "../../../utils";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllTenantsQuery } from "../../../redux/api/brandApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { SortIcon } from "../../../assets";
import { Paginator } from "primereact/paginator";

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
  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

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
          value={brands?.slice(first, first + rows)}
          className="theme-table relative"
          sortIcon={() => {
            return (
              <>
                <img src={SortIcon} alt="Sort Icon" />
              </>
            );
          }}
        >
          <Column
            field="name"
            header="NAME"
            sortable
            body={nameBodyTemplate}
          ></Column>
          <Column field="filterId" header="ID" sortable></Column>
          <Column field="website" header="WEBSITE" sortable></Column>
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>

        <div>
          <Paginator
            className="flex justify-end items-center"
            first={first}
            rows={rows}
            totalRecords={brands?.length}
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
    </>
  );
};

export default BrandList;
