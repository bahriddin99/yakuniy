"use client";
import Link from "next/link";
import type { MenuProps, PopconfirmProps } from "antd";
import { Dropdown, Drawer, Button, Popconfirm, message } from "antd";
import {
  cartIcon,
  heartOutlineIcon,
  searchIcon,
  statistikIcon,
  barsIcon,
  userIcon,
  exitIcon,
} from "@/assets/icons/global";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import CategoryModal from "../ui/modals/Category";
import useWishlistStore from "@/store/wishlist-store";
import {
  getDataFromCookie,
  removeDataFromCookie,
  setDataFromCookie,
} from "@/helpers/cookie";
import useCartStore from "@/store/cart";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const user_id = getDataFromCookie("user_id");
  const [isUser, setIsUser] = useState(user_id ? true : false);
  const { countLikes, getAllWishlist } = useWishlistStore();
  const { getCartPrs, countCartPr } = useCartStore();
  const navs = [
    { title: "Biz haqimizda", path: "/about" },
    { title: "Yetkazib berish", path: "/delivery" },
    { title: "Shartnoma shartlari", path: "/contracts" },
    { title: "Bizning kafolatlar", path: "/assurances" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getAllWishlist(user_id);
        await getCartPrs(user_id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [getAllWishlist]);

  const [language, setLanguage] = useState("uz");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handelLikePage = () => {
    setDrawerVisible(false);
    setDataFromCookie("like_tab", 2);
  };
  const handleLanguageChange = ({ key }: any) => {
    setLanguage(key);
  };
  const languageItems: MenuProps["items"] = [
    {
      key: "uz",
      label: "uz",
    },
    {
      key: "ru",
      label: "ru",
    },
    {
      key: "en",
      label: "en",
    },
  ];

  const logout = async () => {
    setIsUser(false);
    removeDataFromCookie("access_token");
    removeDataFromCookie("refresh_token");
    removeDataFromCookie("user_id");
    router.push("/");
  };

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.info("Hisobdan chiqildi");
  };

  const authItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link onClick={closeDrawer} href="/signin">
          Tizimga kirish
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link onClick={closeDrawer} href="/signup">
          Ro'yxatdan o'tish
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link onClick={closeDrawer} href="/acount">
          Profilim
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Popconfirm
          title="Chiqish"
          description="Haqiqattan ham hisobdan chiqmoqchimisiz?"
          onConfirm={(e) => {
            confirm(e);
            logout();
          }}
          okText="Ha"
          cancelText="Yo'q"
        >
          <button
            className={`${
              isUser ? `flex items-center gap-3 text-[#d30e03]` : `hidden`
            }`}
          >
            Chiqish {exitIcon}
          </button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <nav className="flex justify-between items-center text-[14px] md:px-8 md:mt-3">
        <ul className="hidden md:flex gap-5">
          {navs.map((item, i) => (
            <li key={i}>
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex gap-8 items-center">
          <h1 className="flex items-center gap-2">+998 (90) 647-79-99</h1>
          <Dropdown
            menu={{ items: languageItems, onClick: handleLanguageChange }}
            placement="bottom"
            className="cursor-pointer"
          >
            <h1>{language}</h1>
          </Dropdown>
        </div>
      </nav>

      <header className="flex items-center justify-between bg-white rounded-lg px-4 py-2 lg:py-3 mt-2 md:px-8">
        <Link href="/" className="flex items-center gap-1 text-[14px]">
          <Image
            src={logo}
            alt="logo"
            className="w-[28px] md:w-[35px] lg:w-11"
          />
          <b className="text-[#d25300] text-[15px] md:text-[17px] lg:text-[20px] font-extrabold">
            EXNOARK
          </b>
        </Link>
        <div className="hidden md:flex gap-5 w-full ml-20 mx-5">
          <CategoryModal />
          <div className="relative w-full">
            <input
              placeholder="Хочу купить..."
              className=" w-full h-[46px] bg-[#f0f0f0] rounded-lg px-5 outline-none text-[14px]"
            />
            <div className="absolute top-[15px] right-3">{searchIcon}</div>
          </div>
        </div>

        <div className="hidden md:flex gap-5 ">
          <Link
            href="/acount"
            onClick={handelLikePage}
            className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-[10px] px-[11px] rounded-lg"
          >
           {heartOutlineIcon}
            <div className="w-[18px] h-[18px] bg-[#D55200] rounded-lg text-white text-[10px] mb-[12px] ml-[-8px] flex justify-center items-center">
              {countLikes}
            </div>
          </Link>
          <button className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-[13px] px-[14px] rounded-lg">
            {statistikIcon}
            <div className="w-[18px] h-[18px] bg-[#D55200] rounded-lg text-white text-[10px] mb-[12px] ml-[-8px] flex justify-center items-center">
              2
            </div>
          </button>
          <Link
            href="/cart"
            className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-[13px] px-[14px] rounded-lg"
          >
            {cartIcon}
            <div className="w-[18px] h-[18px] bg-[#D55200] rounded-lg text-white text-[10px] mb-[12px] ml-[-8px] flex justify-center items-center">
              {countCartPr || 0}
            </div>
          </Link>

          <Dropdown
            menu={{ items: authItems }}
            placement="bottom"
            className="cursor-pointer flex items-center justify-center bg-[#f0f0f0] w-[54px] h-[54px] p-4 rounded-full"
          >
            {userIcon}
          </Dropdown>
        </div>

        <button className="md:hidden" onClick={showDrawer}>
          {barsIcon}
        </button>
      </header>
      
      <Drawer placement="right" onClose={closeDrawer} visible={drawerVisible}>
        <ul className="flex flex-col gap-5">
          {navs.map((item, i) => (
            <li key={i}>
              <Link href={item.path} onClick={closeDrawer}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className=" grid gap-3 mt-8">
          <div className="flex gap-3">
            <Link
              href="/acount"
              onClick={handelLikePage}
              className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-[13px] px-[14px] w-full rounded-lg"
            >
              {heartOutlineIcon}
              <div className="w-[20px] h-[20px] bg-[#D55200] rounded-lg text-white text-[10px] flex justify-center items-center">
                {countLikes || 0}
              </div>
            </Link>
            <button className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-[13px] px-[14px] rounded-lg w-full">
              {statistikIcon}
              <div className="w-[20px] h-[20px] bg-[#D55200] rounded-lg text-white text-[10px] flex justify-center items-center">
                2
              </div>
            </button>
          </div>
          <div className="flex gap-3">
            <Link
              href="/cart"
              className="flex items-center justify-center gap-[4px] bg-[#f0f0f0] py-[13px] px-[14px] rounded-lg w-full"
              onClick={closeDrawer}
            >
              {cartIcon}
              <div className="w-[20px] h-[20px] bg-[#D55200] rounded-lg text-white text-[10px] flex justify-center items-center">
                {countCartPr || 0}
              </div>
            </Link>

            <Dropdown
              menu={{ items: authItems }}
              placement="bottom"
              className="cursor-pointer flex items-center justify-center bg-[#f0f0f0] w-full h-[50px] p-4 rounded-lg"
            >
              {userIcon}
            </Dropdown>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
