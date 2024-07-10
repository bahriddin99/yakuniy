// import { noteIcon } from "@/assets/icons/global";
// import React from "react";

// const NoteSection = () => {
//   return (
//     <div className="container">
//       <div className="h-[320px] flex justify-between bg-[#F7F041] text-[#265AD9] text-[18px] rounded-lg my-10 p-[80px]">
//         <div className="w-[80%]">
//           <h4 className="text-[24px]">Mahsulot yoqmadi - pulni qaytarib beramiz</h4>
//           <h1 className="text-[36px] mt-5 font-extrabold">
//             Kamchilik bormi yoki yetkazib berishda mahsulot yoqmadimi?
//           </h1>
//         </div>
//         <div className="w-[20%] h-full flex items-center justify-center">
//           {noteIcon}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteSection;

import noteImg from "@/assets/images/note-section-img.png";
import Image from "next/image";
import React from "react";

const NoteSection = () => {
  return (
    <div className="container my-[10px] md:my-[15px] lg:my-[20px] ">
      <Image src={noteImg} alt="img" className="rounded-lg" />
    </div>
  );
};

export default NoteSection;
