import { Image } from "primereact/image";
import React, { useState } from "react";
import cubeImg from "../../assets/images/brands_logo.svg";
import { Button } from "primereact/button";
import BrandLogoModal from "../../views/Brands/components/BrandLogoModal";
import { generateColor } from "../../utils";

interface TitleProps {
  title: string;
  brand: any;
  image?: string;
  mobile?: boolean;
}

const Title: React.FC<TitleProps> = (props) => {
  const { title, brand, image, mobile } = props;

  const [visibleLogo, setVisibleLogo] = useState(false);
  const [brandImage, setBrandImage] = useState<any>("");

  const randomColor = generateColor(title);

  return (
    <>
      <div className="sm:mt-6 bg-title rounded-[10px] px-12 h-[120px] bg-no-repeat bg-cover bg-center min-[320px]:px-1 max-[480px]:px-1">
        <div className="flex items-center gap-12 h-full min-[320px]:gap-4 max-[480px]:gap-4">
          {brand ? (
            <div className="relative">
              {brandImage ? (
                <>
                  <div className="w-20 h-20 ml-4 rounded-full overflow-hidden bg-gray-100 flex justify-center items-center">
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
                  className="w-20 h-20 mx-[24px] flex justify-center items-center rounded-full"
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
            <div className="pl-6 pr-2">
              <Image src={image || cubeImg} alt="Cube" />
            </div>
          )}

          <span className="text-white text-5xl font-extrabold min-[320px]:text-[40px] max-[480px]:text-[40px]">
            {title}
          </span>
        </div>
      </div>

      <BrandLogoModal
        visibleLogo={visibleLogo}
        setVisibleLogo={setVisibleLogo}
        brandImage={brandImage}
        setBrandImage={setBrandImage}
        mobile={mobile}
      />
    </>
  );
};

export default Title;
