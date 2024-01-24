import { BreadCrumb } from "primereact/breadcrumb";

const Breadcrumb = () => {
  const iconItemTemplate = (item: any, options: any) => {
    return <span className="text-gray">{item.label}</span>;
  };

  const items = [
    {
      label: "Manage Brands",
      template: iconItemTemplate,
    },
  ];
  const home = {
    label: "Brands",
    url: "/brands",
  };
  return (
    <BreadCrumb
      model={items}
      home={home}
      className="p-0 pb-1 bg-transparent mt-6 border-0 text-lg text-gray-100"
    />
  );
};

export default Breadcrumb;
