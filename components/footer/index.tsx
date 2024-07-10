"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { socialsData } from "@/assets/icons/socialicons";
import { emailIcon, locationIcon, phoneIcon } from "@/assets/icons/global";
import useCategoryStore from "@/store/category";
import { useEffect } from "react";

const Footer = () => {
  const { categoriesData, getAllCategories } = useCategoryStore();
  useEffect(() => {
    getAllCategories({ page: 1, limit: 100, search: "" });
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg p-6 sm:p-10 md:p-12 lg:p-16 h-auto flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-1 text-[14px]">
            <Image
              src={logo}
              alt="logo"
              width={61}
              height={61}
              className="w-[31px] md:w-[45px] lg:w-[61px]"
            />
            <b className="text-[#d25300] font-extrabold text-[20px] md:text-[24px] lg:text-[33px]">
              EXNOARK
            </b>
          </Link>
          <div>
            <b className="text-[14px] sm:text-[16px] md:text-[18px] mt-8 block mb-5">
              Bizni ijtimoiyi tarmoqlar
            </b>
            <div className="flex gap-3">
              {socialsData.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-2 px-2 sm:py-[13px] sm:px-[14px] rounded-lg"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-5 flex-2 w-full ml-0 lg:ml-8">
          <ul className="text-gray-400 text-[14px] flex-1 flex flex-col gap-2">
            <b className="text-[14px] sm:text-[16px] md:text-[18px] text-black mb-3 block">
              Tashkilot haqida
            </b>
            <li className="hover:text-black cursor-pointer">Texnoark haqida</li>
            <li className="hover:text-black cursor-pointer">
              Muddatli to&apos;lov
            </li>
            <li className="hover:text-black cursor-pointer">Yordam</li>
            <li className="hover:text-black cursor-pointer">
              Tovarlarga kafolat
            </li>
            <li className="hover:text-black cursor-pointer">
              To&apos;lov usullari
            </li>
          </ul>

          <ul className="text-gray-400 text-[14px] flex-1 flex flex-col gap-2">
            <b className="text-[14px] sm:text-[16px] md:text-[18px]  text-black mb-3 block">
              Kategoriya
            </b>
            {categoriesData.map((item, index) => (
              <li key={index} className="hover:text-black cursor-pointer">
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <ul className="text-gray-500 text-[14px] flex-2">
          <b className="text-[14px] sm:text-[16px] md:text-[18px] text-black">
            Biz bilan aloqa
          </b>
          <li className="flex items-center gap-2 sm:gap-5 mt-4">
            {locationIcon} 100052, O&apos;zbekiston Respublikasi, Toshkent
            shahri, Bodomzor yo&apos;li 1-tor ko&apos;chasi, 72
          </li>
          <li className="flex items-center gap-2 sm:gap-5 mt-2">
            {phoneIcon} +998 71 300 30 30
          </li>
          <li className="flex items-center gap-2 sm:gap-5 mt-2">
            {emailIcon} texnoarko@gmail.com
          </li>
        </ul>
      </div>
      <div className="text-gray-500 my-3 text-[12px] text-center">
        &copy; 2022 Ashyo ro&apos;yxatdan o&apos;tgan litsenzalangan bu brend.
      </div>
    </>
  );
};

export default Footer;
