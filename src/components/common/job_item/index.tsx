import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface IJobItemProps {
  data?: any;
  className?: string;
  style?: React.CSSProperties;
}

const JobItem: React.FC<IJobItemProps> = (props) => {
  const { data, className, style } = props;
  // format date from "Tue May 18 09:52:30 UTC 2021" to "1 Days Ago"
  const date = dayjs(data?.created_at);
  const date2 = dayjs();

  let hours = date2.diff(date, "hours");
  const days = Math.floor(hours / 24);

  return (
    <div
      className={`flex flex-col md:flex-row truncate overfloe items-center md:items-start gap-3 md:gap-5 lg:gap-7 bg-[#F9F9F9] px-4 py-3 rounded-lg border-gray-200 border ${className}`}
      style={style}
    >
      <img src="/noimage.jpg" alt="" className="w-20 h-20 object-contain" />
      <div className="flex flex-col">
        <Link to={`/jobs/${data?.id}`}>
          <h1 className="font-semibold  w-[30rem]  truncate text-base text-gray-800 hover:text-cyan-700 transition-all duration-300 ease-in-out text-center md:text-left">
            {data?.title}
          </h1>
        </Link>
        <div className="flex items-center text-[12px] flex-wrap md:flex-row font-semibold text-gray-600 gap-2">
          <span>{days} Days Ago -</span>
          <span className="hover:text-gray-800 transition-all duration-300 ease-in-out hover:underline">
            <a href="https://www.sweetrush.com/" target="_blank">
              {data?.company} -
            </a>
          </span>
          <span>{data?.type} -</span>
          <span>{data?.location}</span>
        </div>
        <div
          className="mt-2 text-sm text-gray-500 text-justify description w-96"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></div>
      </div>
    </div>
  );
};

export default JobItem;
