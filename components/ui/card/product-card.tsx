"use client";
import { useRouter } from "next/navigation";
import {
  addToCartIcon,
  checkIcon,
  heartFullIcon,
  heartOutlineIcon,
  statistikIcon,
} from "@/assets/icons/global";
import Image from "next/image";
import { getDataFromCookie, setDataFromCookie } from "@/helpers/cookie";
import { Product } from "@/types/product-types";
import { useState, useEffect } from "react";
import useWishlistStore from "@/store/wishlist-store";
import useCartStore from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const token = getDataFromCookie("access_token");
  const [isLiked, setIsLiked] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const { likePost, dataWishlist } = useWishlistStore();
  const { dataCardPr, addToCart, chengedata } = useCartStore();

  useEffect(() => {
    setIsLiked(
      dataWishlist.some(
        (wishlistItem: any) => wishlistItem.product_id.id === product.id
      )
    );
    setIsCart(
      dataCardPr.some((cartItem) => cartItem.product_id.id === product.id)
    );
  }, [dataWishlist, dataCardPr, product.id]);

  const viewSingleProduct = (id: number) => {
    setDataFromCookie("product_id", id);
    router.push(`/products/${id}`);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (token) {
      const resStatus: any = await likePost(product.id);
      if (resStatus === 201) setIsLiked(true);
      else if (resStatus === 200) setIsLiked(false);
    } else {
      router.push("/signin");
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (token) {
      const resStaus = await addToCart(product.id);
      if (resStaus === 201) {
        chengedata({ product_id: product });
        setIsCart(
          dataCardPr.some((cartItem) => cartItem.product_id.id === product.id)
        );
      }
    } else {
      router.push("/signin");
    }
  };

  const handleStatistik = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const monthlyPayment = (+product.price / 12).toFixed(2);
  const productImage = product.images[0];

  return (
    <div
      className="bg-white rounded-lg p-4 md:p-6 flex flex-col justify-between cursor-pointer w-[220px] md:w-[250px] lg:w-[290px]"
      onClick={() => viewSingleProduct(product.id)}
    >
      <div className="flex justify-center items-center h-[140px] md:h-[160px] lg:h-[190px] mb-3 overflow-hidden relative">
        <Image
          src={productImage}
          alt={product.name}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="grid gap-1 md:gap-2 mt-3">
        <h3 className="text-[13px] md:text-[16px] text-gray-700">
          {product.name}
        </h3>
        <b>
          {product.price} <small>so'm</small>
        </b>
        <div className="bg-[#edfaed] text-[#1EB91E] text-center rounded-lg py-1 text-[12px]">
          {monthlyPayment} so'mdan/12 oy
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 md:mt-3">
        <button
          className={`bg-[#D55200] rounded-lg flex items-center gap-2 text-white px-3 py-2 md:px-6 md:py-3 text-[14px] ${
            isCart && `opacity-40`
          }`}
          aria-label="Add to Cart"
          onClick={handleAddToCart}
          disabled={isCart}
        >
          {addToCartIcon}
          {isCart ? checkIcon : <span className="hidden md:flex">Savat</span>}
        </button>
        <button
          onClick={handleLike}
          className="flex items-center justify-center gap-1 bg-[#f0f0f0] py-2 md:py-3 px-3 md:px-4 rounded-lg"
          aria-label="Like"
        >
          {isLiked ? heartFullIcon : heartOutlineIcon}
        </button>
        <button
          onClick={handleStatistik}
          className="flex items-center justify-center gap-1 bg-[#f0f0f0] py-2 md:py-3 px-3 md:px-4 rounded-lg"
          aria-label="Statistics"
        >
          {statistikIcon}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
