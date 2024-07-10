import React, { useState, useEffect } from "react";
import {
  categoryIcon,
  rightIconB,
  rightIconW,
  xIcon,
} from "@/assets/icons/global";
import useCategoryStore from "@/store/category";
import useBrandStore from "@/store/brands";

const CategoryModal = () => {
  const { categoriesData, getAllCategories } = useCategoryStore();
  const { getAllByCategoryId } = useBrandStore();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [data, setData] = useState<any>([]);

  const showDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    getAllCategories({ page: 1, limit: 100, search: "" });
  }, []);

  const handleCategoryClick = async (index: number, category: any) => {
    setSelectedCategory(index);
    const response: any = await getAllByCategoryId({
      id: category.id,
      limit: 100,
      page: 1,
    });
    setData(response);
  };

  return (
    <>
      <button
        onClick={showDrawer}
        className="w-[175px] h-[46px] bg-[#1EB91E] rounded-lg text-white font-bold text-[14px] flex justify-center items-center gap-3 px-5"
        aria-expanded={open}
        aria-controls="category-modal"
      >
        {open ? xIcon : categoryIcon}
        Kategoriya
      </button>

      <div
        id="category-modal"
        className={`absolute left-0 w-full z-[1000] transition-transform duration-300 ${
          open ? "translate-y-[-80px]" : "-translate-y-[850px] bg-slate-500"
        }`}
        style={{ top: "200px" }}
        role="dialog"
        aria-hidden={!open}
      >
        <div className="container rounded-lg bg-white shadow-xl">
          <div className="flex">
            <div className="w-[30%] border-r-2 border-gray-200 grid place-content-cer gap-3 p-5">
              {categoriesData.map((category, index) => (
                <button
                  type="button"
                  key={index}
                  className={`w-full rounded-lg py-2 px-5 ${
                    selectedCategory === index
                      ? "bg-orange-500 text-white"
                      : "bg-[#f0f0f0]"
                  }`}
                  onClick={() => handleCategoryClick(index, category)}
                >
                  <div className="flex gap-6 items-center justify-between w-full">
                    <span className="md:text-[12px] lg:text-[13px] xl:text-[14px]">
                      {category.name}
                    </span>
                    {selectedCategory !== index ? rightIconB : rightIconW}
                  </div>
                </button>
              ))}
            </div>
            <div className="w-[70%] p-8">
              <div className="flex flex-col items-start gap-2">
                {data.length > 0 ? (
                  data.map((item: any, index: number) => (
                    <button
                      key={index}
                      className="p-2 bg-[#f0f0f0] w-40 rounded-lg"
                    >
                      {item.name}
                    </button>
                  ))
                ) : (
                  <div>Mahsulot yo'q</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
