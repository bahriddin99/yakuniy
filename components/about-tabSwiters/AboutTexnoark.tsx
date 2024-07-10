import { copyIcon, shareIcon } from "@/assets/icons/global";
import React from "react";

const AboutTexnoark = () => {
  return (
    <div className="w-full bg-white rounded-lg p-[60px]">
      <h1 className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] font-extrabold">
        Texnoark haqida
      </h1>
      <div className="flex text-[14px] md:tex-[16px]  flex-col md:flex-row gap-10 my-5">
        <div>
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose It
          is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
          <br />
          <br />
          The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English.
        </div>
        <div>
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose It
          is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
          <br />
          <br />
          The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English.
        </div>
      </div>
      <div className="flex gap-5">
        <button className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-[13px] px-[14px] rounded-lg">
          {copyIcon}
        </button>
        <button className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-[13px] px-[14px] rounded-lg">
          {shareIcon}
        </button>
      </div>
    </div>
  );
};

export default AboutTexnoark;
