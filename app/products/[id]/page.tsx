"use client";
import { furgonIcon, homeIcon, soatIcon } from "@/assets/icons/global";
import ImgGallery from "@/components/ui/imggallery";
import Image from "next/image";
import singlePrPageReklamaImg from "@/assets/images/singlePrPageReklamaImg.png";
import Link from "next/link";
import ProductsCarousel from "@/components/ui/carusel/pr-carucel";
import { getDataFromCookie } from "@/helpers/cookie";
import useProductStore from "@/store/products";
import { useEffect, useState } from "react";
import CommentsTab from "@/components/product/comments";
import { Flex, message, Rate } from "antd";

const SingleProductPage = () => {
  const product_id = getDataFromCookie("product_id");
  const { getProduct, createRate } = useProductStore();
  const [productData, setProductData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("specs");
  const [value, setValue] = useState(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  useEffect(() => {
    async function fetchProduct() {
      const resData: any = await getProduct(product_id);
      setProductData(resData);
      setValue(+resData?.product?.rate);
    }
    fetchProduct();
  }, [product_id, getProduct]);

  const handleRate = async (value: number) => {
    await createRate({ product_id: product_id, rate: value });
    setValue(value);
    message.success("Mahsulotni baholaganingiz uchun rahmat!");
  };

  return (
    <div className="my-5">
      {productData ? (
        <>
          <div className="container my-5 flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-[60%]">
              <ImgGallery productImages={productData?.product?.images} />
            </div>

            <div className="w-full lg:w-[40%]">
              <div className="bg-white rounded-lg p-5">
                <h1 className="font-bold">{productData?.product?.name}</h1>
                <div className="flex items-center gap-5 my-4 text-gray-500">
                  <small>Rang:</small>
                  <div className="flex gap-3">
                    {productData?.product_detail?.colors?.map(
                      (color: string, i: number) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-5 my-4 text-gray-500">
                  <small>Narx:</small>
                  <b className="text-[20px] text-black">
                    {productData?.product?.price} so‘m
                  </b>
                </div>
                <button className="bg-[#f0f0f0] p-3 text-[12px] w-full rounded-sm">
                  Oyiga {(productData?.product?.price / 12).toFixed(2)} so‘mdan
                  12/oyga muddatli to ‘lov
                </button>
                <div className="flex gap-3 w-full justify-between my-4">
                  <button className="w-full h-[40px] bg-[#FF6F14] rounded-lg text-white font-bold text-[12px] flex justify-center items-center gap-3">
                    Savatga qo'shish
                  </button>
                  <Link
                    href="/xaridni-rasmiylashtirish"
                    className="w-full h-[40px] bg-[#1EB91E] rounded-lg text-white font-bold text-[12px] flex justify-center items-center gap-3"
                  >
                    Xarid qilish
                  </Link>
                </div>
                <Flex gap="middle" vertical className="my-5">
                  <Rate tooltips={desc} onChange={handleRate} value={value} />
                </Flex>
                <div className="grid gap-2 text-[14px]">
                  <div className="flex items-center gap-4">
                    {furgonIcon}
                    <small>Yetkazib berish O’zbekiston bo’ylab</small>
                  </div>
                  <div className="flex items-center gap-4">
                    {homeIcon}
                    <small>Do’kondi o’zidan olib ketishingiz mumkin</small>
                  </div>
                  <div className="flex items-center gap-4">
                    {soatIcon}
                    <small>Tahminiy yetkazib berish 1 kundan 3 kungacha</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container my-8">
            <b className="block my-3 text-2xl">Qurilma ma'lumotlari</b>
            
          </div>
          <div className="container mt-10">
            <div className="flex flex-col md:flex-row gap-5 my-4">
              <button
                className={`h-[40px] px-5 ${
                  activeTab === "specs"
                    ? "bg-[#FF6F14] text-white"
                    : "bg-white text-black"
                } rounded-lg font-bold text-[12px] md:text-[14px] flex justify-center items-center gap-3`}
                onClick={() => setActiveTab("specs")}
              >
                Telfon xususiyatlari
              </button>
              <button
                className={`h-[40px] px-5 ${
                  activeTab === "comments"
                    ? "bg-[#FF6F14] text-white"
                    : "bg-white text-black"
                } rounded-lg font-bold text-[12px] md:text-[14px] flex justify-center items-center gap-3`}
                onClick={() => setActiveTab("comments")}
              >
                Mijozlarni fikri
              </button>
            </div>

            {activeTab === "specs" ? (
              <div className="flex flex-col md:flex-row gap-5">
                <div className="bg-[#f5f5f5] p-8 w-full lg:w-[60%] rounded-lg">
                  {productData?.product_detail?.specs?.map(
                    (spec: { name: string; value: string }, index: number) => (
                      <div
                        key={index}
                        className="w-full flex border-b-2 border-dashed border-gray-400 py-3"
                      >
                        <h1 className="flex-1">{spec.name}</h1>
                        <h1 className="flex-1">{spec.value}</h1>
                      </div>
                    )
                  )}
                </div>
                <div
                  className="hidden w-full md:w-[40%] bg-white rounded-lg p-8 lg:flex flex-col 
              items-center gap-3"
                >
                  <Image src={singlePrPageReklamaImg} alt="img" />
                </div>
              </div>
            ) : (
              <CommentsTab />
            )}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}

      <ProductsCarousel title="Aksiyadagi mahsulotlar" />
    </div>
  );
};

export default SingleProductPage;
