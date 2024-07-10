"use client";
import useAccountStore from "@/store/acount";
const Datas = () => {
  const { userData } = useAccountStore();
  return (
    <div className="flex flex-col justify-center gap-3 px-8 bg-white rounded-lg p-10">
      <b className="text-2xl">Shaxsiy malumotlar</b>
      <div className="flex items-center gap-3">
        <b className="text-gray-400 text-base">Ism:</b>{" "}
        <b>{userData?.first_name}</b>
      </div>
      <div className="flex items-center gap-3">
        <b className="text-gray-400 text-base">Familya:</b>{" "}
        <b>{userData?.last_name}</b>
      </div>
      <div className="flex items-center gap-3">
        <b className="text-gray-400 text-base">Tel:</b>{" "}
        <b>{userData?.phone_number}</b>
      </div>
      <div className="flex items-center gap-3">
        <b className="text-gray-400 text-base">Email:</b>{" "}
        <b>{userData?.email}</b>
      </div>
    </div>
  );
};

export default Datas;
