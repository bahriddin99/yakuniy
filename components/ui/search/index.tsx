"use client";
import { searchIcon } from "@/assets/icons/global";
import { setDataFromCookie } from "@/helpers/cookie";
import useProductStore from "@/store/products";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GlobalSearch = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const { searchProducts } = useProductStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const input_value = params.get("search");
      setSearch(input_value ? input_value : "");
    }
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearch(search);
    if (search.trim().length > 0) {
      const resData: any = await searchProducts({
        page: 1,
        limit: 20,
        search: search,
      });
      setData(resData);
    } else {
      setData([]);
    }
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("search", search);
      router.push(`?${searchParams.toString()}`);
    }
  };

  const handleSinglePage = (id: number) => {
    setDataFromCookie("product_id", id);
    setSearch("");
    router.push(`/products/${id}`);
  };

  return (
    <div className="relative w-full">
      <input
        value={search}
        onChange={handleChange}
        type="search"
        placeholder="Хочу купить.."
        className="w-full h-[46px] bg-[#f0f0f0] rounded-lg px-5 pr-10 outline-none text-[14px]"
      />
      <div className="absolute top-[15px] right-3">{searchIcon}</div>
      {search.length > 0 && (
        <div className="absolute w-full p-5 top-12 z-50 shadow-lg rounded-md bg-white">
          <ul className="grid gap-0 lg:gap-2">
            {data.length > 0 ? (
              data.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => handleSinglePage(item.id)}
                  className="w-full hover:bg-[#f0f0f0] p-1 px-5 rounded-lg cursor-pointer"
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li className="w-full p-1 px-5 text-gray-500">
                Topilmadi
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
