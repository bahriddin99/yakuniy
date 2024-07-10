import { brandImages } from "@/assets/images/brands";
import Image from "next/image";
import "./style.css";

const BrandsSection = () => {
  const totalCards = brandImages.length * 5;
  let index = 0;

  return (
    <section className="my-[10px] md:my-[15px] lg:my-[20px] overflow-hidden relative">
      <div className="gap-2 md:gap-4 animate-scroll">
        {(() => {
          const cards = [];
          while (index < totalCards) {
            const img = brandImages[index % brandImages.length];
            cards.push(
              <div
                key={index}
                className="w-[100px] h-[50px]  md:w-[150px] md:h-[110px] lg:w-[200px] lg:h-[130px] bg-white rounded-lg flex items-center justify-center px-1"
              >
                <Image src={img} alt="brand_img" className="p-3 m-3 md:p-1" />
              </div>
            );
            index++;
          }
          return cards;
        })()}
      </div>
    </section>
  );
};

export default BrandsSection;
