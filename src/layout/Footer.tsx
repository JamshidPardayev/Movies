import logo from "@/assets/main-logo.svg";
import appStore from "@/assets/appStore.png";
import googlePlay from "@/assets/googlePlay.png";
import {
  InstagramOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
const Footer = () => {
  return (
    <div className="container py-10">
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-8 mt-10 dark:bg-[#111111] bg-gray-200 rounded-[12px] px-7 py-5">
        <div>
          <img src={logo} alt="logo" />
          <img src={googlePlay} alt="googlePlay" className="mt-10"/>
          <img src={appStore} alt="appStore"  className="mt-3"/>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">About</p>
          <p className="hover:text-[#c61f1f] cursor-pointer duration-300 hover:underline">
            Offer
          </p>
          <p className="hover:text-[#c61f1f] cursor-pointer duration-300 hover:underline">
            Advertising
          </p>
          <p className="hover:text-[#c61f1f] cursor-pointer duration-300 hover:underline">
            F.A.Q
          </p>
          <p className="hover:text-[#c61f1f] cursor-pointer duration-300 hover:underline">
            Contacts
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">Categories</p>
          <p className="hover:text-[#c61f1f] cursor-pointer duration-300 hover:underline">
            Film
          </p>
          <p className="hover:text-[#c61f1f] cursor-pointer duration-300 hover:underline">
            Teatr
          </p>
          <p className="hover:text-[#c61f1f] cursor-pointer duration-300 hover:underline">
            Concerts
          </p>
          <p className="hover:text-[#c61f1f] cursor-pointer duration-300 hover:underline">
            Sport
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">Contact with us</p>
          <p className="text-[#c61f1f] cursor-pointer duration-300 hover:text-red-500">
            +998 (88) 970-44-43
          </p>
          <p className="font-bold">Social Networks</p>
          <div className="flex gap-4">
            <div className="text-[#c61f1f] cursor-pointer duration-300 hover:text-red-500 text-[20px]">
              <InstagramOutlined />
            </div>
            <div className="text-[#c61f1f] cursor-pointer duration-300 hover:text-red-500 text-[20px]">
              <WhatsAppOutlined />
            </div>
            <div className="text-[#c61f1f] cursor-pointer duration-300 hover:text-red-500 text-[22px]">
              <YoutubeOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
