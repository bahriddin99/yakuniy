import { rightIconB } from "@/assets/icons/global";
import { catoryImagesData } from "@/assets/images/categories/index";
import Image from "next/image";

const CategorySection = () => {
  return (
    <section className="my-2 md:my-4 lg:my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[5px] sm:gap-2 md:gap-3 lg:gap-4 w-full">
        {catoryImagesData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg flex items-center justify-center py-1 sm:py-2 md:py-3 lg:py-6
             px-6 cursor-pointer"
          >
            <div className="flex gap-4 items-center justify-between w-full">
              <Image
                src={item.img}
                alt="img"
                className="w-[37px] sm:w-[40px] md:w-[45px] lg:w-[55px] h-[37px] sm:h-[40px] md:h-[45px] lg:h-[55px]"
              />
              <span className="text-[13px] sm:text-[16px] md:text-[18px]">
                {item.title}
              </span>
              <div className="w-[24px] h-[24px] lg:group-hover:scale-125 sm:group-hover:scale-110 group-hover:pl-1 duration-100">
                {rightIconB}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
