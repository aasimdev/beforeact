import { Image } from "primereact/image";
import React, { useState } from "react";
import cubeImg from "../../assets/images/fractal_cube.svg";
import { Button } from "primereact/button";
import BrandLogoModal from "../../views/Brands/components/BrandLogoModal";
import { generateColor } from "../../utils";

interface TitleProps {
  title: string;
  brand: any;
}

const Title: React.FC<TitleProps> = ({ title, brand }) => {
  const [visibleLogo, setVisibleLogo] = useState(false);
  const [brandImage, setBrandImage] = useState<any>("");

  const randomColor = generateColor(title);

  return (
    <>
      <div className="mt-6 bg-title rounded-[10px] px-12 h-[120px] bg-no-repeat bg-cover bg-center">
        <div className="flex items-center gap-12 h-full">
          {brand ? (
            <div className="relative">
              {brandImage ? (
                <>
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex justify-center items-center">
                    <img
                      src={brandImage}
                      alt="Brand"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </>
              ) : (
                <div
                  className="w-20 h-20 flex justify-center items-center rounded-full  mx-auto"
                  style={{
                    background: randomColor.background,
                  }}
                >
                  <span
                    className="text-[45px] font-semibold"
                    style={{
                      color: randomColor.color,
                    }}
                  >
                    {title?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              )}

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

      <BrandLogoModal
        visibleLogo={visibleLogo}
        setVisibleLogo={setVisibleLogo}
        brandImage={brandImage}
        setBrandImage={setBrandImage}
      />
    </>
  );
};

export default Title;
