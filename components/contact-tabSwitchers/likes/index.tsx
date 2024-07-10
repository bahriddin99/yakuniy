import ProductCard from "@/components/ui/card/product-card";
import useWishlistStore from "@/store/wishlist-store";

const Likes = () => {
  const { dataWishlist } = useWishlistStore();
  console.log(dataWishlist);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {dataWishlist.length > 0 &&
          dataWishlist.map((item: any, i) => (
            <ProductCard key={i} product={item?.product_id} />
          ))}
      </div>
    </>
  );
};

export default Likes;
