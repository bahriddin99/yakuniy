import cimg from "@/assets/images/cimg.png";
import Image from "next/image";
import { Carousel } from "antd";

const MainCarusel = () => {
  return (
    <>
      <Carousel autoplay className="mt-2 md:mt-4 lg:mt-5 rounded-lg arrows">
        {[1, 2, 3, 4].map((i) => (
          <Image src={cimg} alt="img" key={i} className="rounded-lg" />
        ))}
      </Carousel>
    </>
  );
};

export default MainCarusel;
