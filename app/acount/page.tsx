"use client";
import {
  editIcon,
  editIconOrange,
  rightIconB,
  rightIconW,
} from "@/assets/icons/global";
import {
  BuyStory,
  Costs,
  Datas,
  Likes,
  UserDataEdit,
} from "@/components/contact-tabSwitchers/index";
import { getDataFromCookie } from "@/helpers/cookie";
import useAccountStore from "@/store/acount";
import { useState, ReactNode, useMemo, useEffect } from "react";

interface Tab {
  id: number;
  tab: ReactNode;
  title: string;
}

const AccountPage = () => {
  const a = getDataFromCookie("like_tab") || 1;
  const [activeTabID, setActiveTabID] = useState<any>(+a);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const { getUserData, userData } = useAccountStore();

  const userID = getDataFromCookie("user_id");

  useEffect(() => {
    setHasMounted(true);
    if (userID) {
      const fetchData = async () => {
        await getUserData(userID);
      };
      fetchData();
    }
  }, [getUserData, userID]);

  const tabList: Tab[] = useMemo(
    () => [
      { id: 1, tab: <Datas />, title: "Shaxsiy malumotlar" },
      { id: 2, tab: <Likes />, title: "Yoqtirgan mahsulotlar" },
      { id: 3, tab: <BuyStory />, title: "Xaridlar tarixi" },
      { id: 4, tab: <Costs />, title: "To'lovlar tarixi" },
    ],
    []
  );

  const activeTab = useMemo(() => {
    return isEditing
      ? { tab: <UserDataEdit user_data={userData} /> }
      : tabList.find((tab) => tab.id === activeTabID);
  }, [isEditing, activeTabID, tabList, userData]);

  const handleEditTab = () => {
    setIsEditing(true);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="container py-3 w-full">
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="w-full lg:w-[25%]">
          <div className="p-3 sm:p-4 lg:p-5 px-6 bg-white rounded-lg">
            <div className="flex justify-between items-center">
              <div className="bg-gray-300 rounded-full w-15 h-15" />
              <div className="ml-3 flex-1">
                <b className="block text-[16px] sm:text-[18px] md:text-[20px] lg:text-[21px]">
                  {`${userData?.first_name ?? "Loading..."} ${
                    userData?.last_name ?? ""
                  }`}
                </b>
                <span className="text-gray-500">
                  ID: {userData?.id ?? "..."}
                </span>
              </div>
              <button onClick={handleEditTab}>
                {isEditing ? editIconOrange : editIcon}
              </button>
            </div>

            <div className="mt-8">
              {tabList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTabID(item.id);
                    setIsEditing(false);
                  }}
                  className={`w-full rounded-lg flex items-center justify-center py-2 px-6 mb-2 ${
                    activeTabID === item.id && !isEditing
                      ? "bg-[#FF6F14] text-white"
                      : "bg-[#f0f0f0]"
                  }`}
                >
                  <div className="flex gap-4 items-center justify-between w-full">
                    <span className="text-sm">{item.title}</span>
                    {activeTabID !== item.id || isEditing
                      ? rightIconB
                      : rightIconW}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[75%]">{activeTab && activeTab.tab}</div>
      </div>
    </div>
  );
};

const Fallback = () => {
  return <div>User ID not found. Please log in.</div>;
};

const ConditionalExport = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const userID = getDataFromCookie("user_id");

  return userID ? <AccountPage /> : <Fallback />;
};

export default ConditionalExport;
