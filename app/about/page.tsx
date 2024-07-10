"use client";
import { useState } from "react";
import {
  AboutTexnoark,
  MuddatliTolov,
  Yordam,
  TovarlargaKafolat,
  TolovUsullari,
} from "@/components/about-tabSwiters/index";
import ProductsCarucel from "@/components/ui/carusel/pr-carucel";

const tab_list = [
  { id: 1, tab: <AboutTexnoark />, title: "Texnoark haqida" },
  { id: 2, tab: <MuddatliTolov />, title: "Muddatli to’lov" },
  { id: 3, tab: <Yordam />, title: "Yordam" },
  { id: 4, tab: <TovarlargaKafolat />, title: "Tovarlarga kafolat" },
  { id: 5, tab: <TolovUsullari />, title: "Tolov usullari" },
];

const AboutPage = () => {
  const [activeTitle, setActiveTitle] = useState("Texnoark haqida");

  const activeTab = tab_list.find((tab) => tab.title === activeTitle);

  return (
    <div className="mb-8">
      <div className="container my-4 mb-10">
        <div className="flex flex-wrap gap-3 mb-4">
          {tab_list.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTitle(item.title)}
              className={`w-full sm:w-[175px] h-[46px] rounded-lg font-bold text-[14px] flex justify-center items-center gap-3 ${
                activeTitle === item.title
                  ? "bg-[#FF6F14] text-white"
                  : "bg-white"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-10 my-5">
            {activeTab && activeTab.tab}
          </div>
        </div>
      </div>
      <ProductsCarucel title="Aksiyadagi mahsulotlar" />
    </div>
  );
};

export default AboutPage;
