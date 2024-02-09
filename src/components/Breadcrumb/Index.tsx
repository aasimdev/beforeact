import { BreadCrumb } from "primereact/breadcrumb";
import React from "react";

interface BreadcrumbProps {
  mainLabel: string;
  childLabel?: string;
  childUrl?: string;
  label: string;
  url: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { mainLabel, label, childLabel, childUrl, url } = props;

  const iconItemTemplate = (item: any) => {
    return <span className="text-gray">{item.label}</span>;
  };

  const items = [
    {
      label: mainLabel,
      template: iconItemTemplate,
    },
  ];

  const childItems = [
    {
      label: childLabel,
      url: childUrl,
    },
    {
      label: mainLabel,
      template: iconItemTemplate,
    },
  ];

  const home = {
    label: label,
    url: url,
  };
  return (
    <BreadCrumb
      model={childLabel ? childItems : items}
      home={home}
      className="p-0 bg-transparent my-6 border-0 text-lg text-gray-100"
    />
  );
};

export default Breadcrumb;
