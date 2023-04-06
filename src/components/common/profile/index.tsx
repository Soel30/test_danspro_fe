import React from "react";

interface IProfileProps {
  data?: any;
  className?: string;
  style?: React.CSSProperties;
}

const Profile: React.FC<IProfileProps> = (props) => {
  const { data, className, style } = props;
  return (
    <div className="bg-white rounded-lg shadow  px-5 py-5">
      <div className="flex gap-4 items-center">
        <div className="bg-cyan-100 rounded-full">
          <img src="/man.webp" alt="" className="w-14 h-14 rounded-full" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold">{data?.name}</h1>
          <span className="text-[12px] font-semibold text-gray-400">
            Software Developer
          </span>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
      <ul className="mt-2 px-2 flex flex-col gap-1">
        <li className="flex items-center gap-3 text-cyan-400 hover:text-cyan-500 transition-all duration-300 cursor-pointer text-sm font-semibold">
          <div className="h-2 w-2 bg-cyan-400 rounded-full "></div>
          20 Job Offers
        </li>
        <li className="flex items-center gap-3 text-cyan-400 hover:text-cyan-500 transition-all duration-300 cursor-pointer text-sm font-semibold">
          <div className="h-2 w-2 bg-cyan-400 rounded-full "></div>
          10 Submitted Applications
        </li>
      </ul>
      <button className="btn btn-primary btn-sm w-full mt-4 bg-gray-200 text-gray-800 border-none hover:bg-gray-300">
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
