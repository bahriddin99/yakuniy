import { editIcon } from "@/assets/icons/global";

const WishlistPage = () => {
  return (
    <div className="">
      <div className=" container flex">
        <div className="w-[30%] p-5 bg-white rounded-lg">
          <div className="flex justify-between">
            <div className="bg-gray-300 rounded-full w-[60px] h-[60px]" />
            <div>
              <b className="block">Ahmad Ben Bella</b>
              <span className="text-gray-500">Id8937657921</span>
            </div>
            <div>{editIcon}</div>
          </div>
        </div>
        <div className="w-[70%]"></div>
      </div>
    </div>
  );
};

export default WishlistPage;
