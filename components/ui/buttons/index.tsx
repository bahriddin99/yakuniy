import React from "react";

const GlobalButton = ({ title, bg, color, icon }: any) => {
  return (
    <>
      <button className="w-[175px] h-[46px] bg-[#1EB91E] rounded-lg text-white font-bold text-[14px] flex justify-center items-center gap-3">
        {title}
      </button>
    </>
  );
};

export default GlobalButton;
