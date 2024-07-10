// "use client";
// import React, { useState } from "react";
// // import Container from "../../components/container/page";
// import ProductCard from "@/components/ui/card/product-card";
// import { Drawer, Slider } from "antd";
// import { Radio } from "antd";
// import "./style.css";
// import useProductStore from "@/store/products/page";
// import { ToastContainer } from "react-toastify";

// function Index() {
//   const [slide1, setSlide1] = useState(1000000); // Default value in millions
//   const [slide2, setSlide2] = useState(51000000); // Default value in millions

//   // Function to convert slider values from million range to 0-100 range and vice versa
//   const convertToSliderValue = (value: any) =>
//     Math.round((value - 1000000) / 90000);
//   const convertToMillionValue = (value: any) => value * 500000 + 1000000;
//   const [open, setOpen] = useState(false);

//   const onChange = (value:any) => {
//     setSlide1(convertToMillionValue(value[0]));
//     setSlide2(convertToMillionValue(value[1]));
//   };

//   const onChangeComplete = (value:any) => {
//     setSlide1(convertToMillionValue(value[0]));
//     setSlide2(convertToMillionValue(value[1]));
//   };
//   const { products, getProducts } = useProductStore();

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   React.useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <div>
//       <ToastContainer/>
//       {/* <Container> */}
//         <p className="flex gap-[20px] mt-[20px]">
//           <span className="block px-[18px] py-[6px] rounded bg-[#F5F5F5] text-[#240E0066] font-medium">
//             Bosh sahifa
//           </span>
//           <span className="block px-[18px] py-[6px] rounded bg-[white] font-medium">
//             Smartfonlar
//           </span>
//         </p>
//       {/* </Container> */}
      
//       {/* <Container> */}
//         <button onClick={showDrawer} className="w-[90%] mx-auto hidden bg-white mt-[40px] py-[10px] font-medium rounded-md max-md:block ">
//           Filter
//         </button>
//       {/* </Container> */}
//       <div className="mt-[24px]">
//         {/* <Container> */}
//           <div className="flex gap-[48px] justify-between">
//             <div className="w-[356px] h-[1467px] rounded-[10px] bg-[white] p-[40px] max-md:hidden">
//               <p className="flex gap-2 items-center mb-[20px]">
//                 <span className="font-bold text-[24px]">Narx</span>
//                 <span className="text-[18px] ">(Somda)</span>
//               </p>

//               <div className="flex justify-between mb-[20px]">
//                 <div className="w-[136px]">
//                   <p className="text-[#240E00CC] text-[12px]">...dan</p>
//                   <p className="w-full h-[54px] py-[14px] px-[28px] bg-[#F0F0F0] rounded-md text-[18px] text-[#240E00] font-medium">
//                     {slide1.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="w-[136px]">
//                   <p className="text-[#240E00CC] text-[12px]">...gacha</p>
//                   <p className="w-full h-[54px] py-[14px] px-[28px] bg-[#F0F0F0] rounded-md text-[18px] text-[#240E00] font-medium">
//                     {slide2.toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               <Slider
//                 range
//                 step={1}
//                 defaultValue={[
//                   convertToSliderValue(slide1),
//                   convertToSliderValue(slide2),
//                 ]}
//                 tooltipVisible={false} // Disable tooltip
//                 onChange={onChange}
//                 onChangeComplete={onChangeComplete}
//               />

//               <div>
//                 <h2 className="font-bold  text-[24px]">Brendlar</h2>
//                 <Radio.Group defaultValue="Samsung" className="flex flex-col gap-[7px] mt-[12px]">
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Samsung">Samsung</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Artel">Artel</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Vivo">Vivo</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Realmi">Realmi</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Xiaomi">Xiaomi</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Apple">Apple</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Tecno">Tecno</Radio>
//                 </Radio.Group>
//               </div>
//               <div className="mt-[24px]">
//                 <h2 className="font-bold  text-[24px]">Tezkor xotira RAM</h2>
//                 <Radio.Group defaultValue="2" className="flex flex-col gap-[7px] mt-[12px]">
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="2">2 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="3">3 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="4">4 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="6">6 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="8">8 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="12">12 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="16">16 GB</Radio>
//                 </Radio.Group>
//               </div>
//               <div className="mt-[24px]">
//                 <h2 className="font-bold  text-[24px]">Doiymi xotira ROM</h2>
//                 <Radio.Group defaultValue="32" className="flex flex-col gap-[7px] mt-[12px]">
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="32">32 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="64">64 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="128">128 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="256">256 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="512">512 GB</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="1024">1024 GB</Radio>
//                 </Radio.Group>
//               </div>
//               <div className="mt-[24px]">
//                 <h2 className="font-bold  text-[24px]">Akkumulyator hajmi</h2>
//                 <Radio.Group defaultValue="3000" className="flex flex-col gap-[7px] mt-[12px]">
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="3200">3200 mAh</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="3600">3600 mAh</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="4000">4000 mAh</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="4500">4500 mAh</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="5000">5000 mAh</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="6000">6000 mAh</Radio>
//                   <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="7000">7000 mAh</Radio>
//                 </Radio.Group>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-[20px] w-[956px] max-md:justify-center">
//                 {products.map((e, i) => {
//                   return <ProductCard key={i} datas={e}/>
//                 })}
                
//             </div>
//           </div>
//         {/* </Container> */}
//       </div>


//       <Drawer title="Basic Drawer" width={'100vw'} onClose={onClose} open={open}>
//         <div className="w-[100%] h-[1467px] rounded-[10px] bg-[white] p-[40px]">
//                 <p className="flex gap-2 items-center mb-[20px]">
//                   <span className="font-bold text-[24px]">Narx</span>
//                   <span className="text-[18px] ">(Somda)</span>
//                 </p>

//                 <div className="flex justify-between mb-[20px]">
//                   <div className="w-[136px]">
//                     <p className="text-[#240E00CC] text-[12px]">...dan</p>
//                     <p className="w-full h-[54px] py-[14px] px-[28px] bg-[#F0F0F0] rounded-md text-[18px] text-[#240E00] font-medium">
//                       {slide1.toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="w-[136px]">
//                     <p className="text-[#240E00CC] text-[12px]">...gacha</p>
//                     <p className="w-full h-[54px] py-[14px] px-[28px] bg-[#F0F0F0] rounded-md text-[18px] text-[#240E00] font-medium">
//                       {slide2.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 <Slider
//                   range
//                   step={1}
//                   defaultValue={[
//                     convertToSliderValue(slide1),
//                     convertToSliderValue(slide2),
//                   ]}
//                   tooltipVisible={false} // Disable tooltip
//                   onChange={onChange}
//                   onChangeComplete={onChangeComplete}
//                 />

//                 <div>
//                   <h2 className="font-bold  text-[24px]">Brendlar</h2>
//                   <Radio.Group defaultValue="Samsung" className="flex flex-col gap-[7px] mt-[12px]">
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Samsung">Samsung</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Artel">Artel</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Vivo">Vivo</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Realmi">Realmi</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Xiaomi">Xiaomi</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Apple">Apple</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="Tecno">Tecno</Radio>
//                   </Radio.Group>
//                 </div>
//                 <div className="mt-[24px]">
//                   <h2 className="font-bold  text-[24px]">Tezkor xotira RAM</h2>
//                   <Radio.Group defaultValue="2" className="flex flex-col gap-[7px] mt-[12px]">
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="2">2 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="3">3 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="4">4 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="6">6 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="8">8 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="12">12 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="16">16 GB</Radio>
//                   </Radio.Group>
//                 </div>
//                 <div className="mt-[24px]">
//                   <h2 className="font-bold  text-[24px]">Doiymi xotira ROM</h2>
//                   <Radio.Group defaultValue="32" className="flex flex-col gap-[7px] mt-[12px]">
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="32">32 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="64">64 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="128">128 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="256">256 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="512">512 GB</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="1024">1024 GB</Radio>
//                   </Radio.Group>
//                 </div>
//                 <div className="mt-[24px]">
//                   <h2 className="font-bold  text-[24px]">Akkumulyator hajmi</h2>
//                   <Radio.Group defaultValue="3000" className="flex flex-col gap-[7px] mt-[12px]">
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="3200">3200 mAh</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="3600">3600 mAh</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="4000">4000 mAh</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="4500">4500 mAh</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="5000">5000 mAh</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="6000">6000 mAh</Radio>
//                     <Radio className="text-[18px]  text-[#240E00CC] font-medium" value="7000">7000 mAh</Radio>
//                   </Radio.Group>
//                 </div>
//           </div>
//       </Drawer>
//     </div>
//   );
// }

// export default Index;
