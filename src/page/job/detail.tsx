import JobItem from "../../components/common/job_item";
import BookmarkIcon from "../../assets/icons/Bookmark";
import { Layout } from "../../layouts";
import React from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constant";
import { useCookies } from "react-cookie";
import Profile from "../../components/common/profile";
import dayjs from "dayjs";
const JobDetail = () => {
  const [data, setData] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "user",
  ]);
  let { id } = useParams();

  const date = dayjs(data?.created_at);
  const date2 = dayjs();

  let hours = date2.diff(date, "hours");
  const days = Math.floor(hours / 24);

  const getData = async () => {
    setIsLoading(true);
    const api = API_URL;
    const resp = await fetch(`${api}/jobs/detail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.access_token}`,
      },
    });
    const data = await resp.json();
    if (data.code === 200 && data.status === "success") {
      setData(data.data);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Layout.Default loading={isLoading}>
      <div className="grid grid-cols-12 mt-5 gap-5">
        <div className="col-span-12 md:col-span-9 mx-2 md:mx-0 bg-white rounded-lg shadow p-4 px-6">
          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center flex-col md:flex-row">
              <img
                src="/noimage.jpg"
                alt="No Image"
                className="w-20 h-20 object-contain"
              />

              <div className="flex flex-col">
                <h1 className="font-semibold text-base text-gray-800 text-center md:text-left">
                  {data?.title}
                </h1>

                <div className="flex items-center text-[12px] mt-3 md:mt-0 flex-wrap md:flex-row font-semibold text-gray-600 gap-2">
                  <span>{days} Days Ago -</span>
                  <span className="hover:text-gray-800 transition-all duration-300 ease-in-out hover:underline">
                    <a href="https://www.sweetrush.com/" target="_blank">
                      {data?.company} -
                    </a>
                  </span>
                  <span>{data?.type} -</span>
                  <span>{data?.location}</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="mt-6 font-semibold text-sm">Project Overview</h1>
          <div
            className="mt-2 text-sm text-gray-500"
            id="content"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></div>
        </div>
        <div className="col-span-12 md:col-span-3 mx-2 md:mx-0">
          <Profile data={cookies.user} />

          <div className="bg-white rounded-lg shadow  px-3 py-5 mt-4">
            <h1 className="mb-2 font-semibold text-sm text-center">
              How To Apply
            </h1>
            <div className="divider my-0 px-0"></div>
            <div
              className="mt-2 text-sm text-gray-500"
              id="apply"
              dangerouslySetInnerHTML={{ __html: data?.how_to_apply }}
            ></div>
          </div>
        </div>
      </div>
    </Layout.Default>
  );
};

export default JobDetail;
