import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  htmlFor: string;
}

export const CustomLabel: React.FC<TypographyProps> = (props) => {
  const { children, htmlFor } = props;

  return (
    <label
      htmlFor={htmlFor}
      className="text-[18px] font-semibold text-gray-200"
    >
      {children}
    </label>
  );
};
