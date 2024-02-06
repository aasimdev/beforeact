import { BreadCrumb } from "primereact/breadcrumb";
import React from "react";

interface BreadcrumbProps {
  mainLabel: string;
  label: string;
  url: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { mainLabel, label, url } = props;

  const iconItemTemplate = (item: any) => {
    return <span className="text-gray">{item.label}</span>;
  };

  const items = [
    {
      label: mainLabel || "Manage Brands",
      template: iconItemTemplate,
    },
  ];
  const home = {
    label: label || "Brands",
    url: url || "/brands",
  };
  return (
    <BreadCrumb
      model={items}
      home={home}
      className="p-0 bg-transparent my-6 border-0 text-lg text-gray-100"
    />
  );
};

export default Breadcrumb;
