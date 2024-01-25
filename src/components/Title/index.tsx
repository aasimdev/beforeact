import { Image } from "primereact/image";
import React, { useState } from "react";
import cubeImg from "../../assets/images/fractal_cube.svg";
import { Button } from "primereact/button";
import BrandLogo from "../../views/Brands/components/BrandLogoModal";

interface TitleProps {
  title: string;
  brand: any;
}

const Title: React.FC<TitleProps> = ({ title, brand }) => {
  const [visibleLogo, setVisibleLogo] = useState(false);
  return (
    <>
      <div className="mt-6 bg-title rounded-[10px] px-12 h-[120px] bg-no-repeat bg-cover bg-center">
        <div className="flex items-center gap-12 h-full">
          {brand ? (
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-black relative flex items-center justify-center overflow-hidden p-2">
                <img src={brand} alt="Cube" className="object-contain" />
              </div>
              <Button
                icon="bx bx-edit-alt"
                rounded
                className="bg-gray w-6 h-6 rounded-full p-0 border-0 focus:outline-0 focus:ring-0 absolute bottom-0 left-[calc(50%_+_22px)] flex justify-center text-base"
                onClick={() => {
                  setVisibleLogo(true);
                }}
              />
            </div>
          ) : (
            <Image src={cubeImg} alt="Cube" />
          )}

          <span className="text-white text-5xl font-extrabold">{title}</span>
        </div>
      </div>

      <BrandLogo setVisibleLogo={setVisibleLogo} visibleLogo={visibleLogo} />
    </>
  );
};

export default Title;
