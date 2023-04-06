import JobItem from "../../components/common/job_item";
import Search from "../../components/common/filter";
import { Layout } from "../../layouts";
import React, { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { API_URL } from "../../constant";
import Pagination from "../../components/common/pagination";
import Profile from "../../components/common/profile";

export default function JobLists() {
  const [isFullTime, setIsFullTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "user",
  ]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [query, setQuery] = useState({});

  function encodeQueryData(data: any) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  const getJobs = async () => {
    setIsLoading(true);
    const newQuery = encodeQueryData(query);
    const api_url = API_URL;
    const url =
      newQuery === ""
        ? `${api_url}/jobs?page=${currentPage}`
        : `${api_url}/jobs/search?${newQuery}&page=${currentPage}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.access_token}`,
      },
    });
    const data = await response.json();
    if (data.code === 200 && data.status === "success") {
      setJobs([]);
      setJobs(data.data.data);
      setCurrentPage(data.data.currentPage);
      setHasNextPage(data.data.hasNextPage);
      setHasPrevPage(data.data.hasPrevPage);
      setTotalData(data.data.totalData);
      setTotalPage(data.data.totalPage);
    }
    setIsLoading(false);
  };

  const onChangePage = async (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    setIsLoading(false);
  };

  const onChangeSearch = (e: any) => {
    // split query
    const val = e.split("&");
    const region = val[0];
    const keyword = val[1];

    // set query
    const data = {
      region: region,
      description: keyword,
      full_time: isFullTime,
    };

    setQuery(data);
  };

  const onChangeisFullTime = () => {
    setIsFullTime(!isFullTime);
    if (isFullTime) {
      setQuery({ ...query, full_time: false });
    } else {
      setQuery({ ...query, full_time: true });
    }
  };

  React.useEffect(() => {
    getJobs();
  }, [currentPage, query]);

  return (
    <Layout.Default loading={isLoading}>
      <div className="grid grid-cols-12 gap-5 mt-5 order-1">
        <div className="col-span-12 mx-3 md:col-span-3 md:mx-0 p-3 bg-white rounded-lg shadow max-h-[9rem] flex flex-col">
          <h3 className="font-bold text-lg text-center">Filter</h3>
          <div className="divider p-0 m-0"></div>
          <span className="mt-2 font-semibold text-sm">Availability</span>
          <div className="mt-3">
            <div className="form-control">
              <label className="cursor-pointer flex items-center gap-3 font-semibold group">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isFullTime}
                  onChange={onChangeisFullTime}
                />
                <span className="label-text text-gray-400 group-hover:text-gray-800 transition-all duration-200">
                  Full Time
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-12 mx-3 md:col-span-6 order-last md:order-2">
          <Search onChange={onChangeSearch} />
          <div className="mt-4">
            <h3 className="font-bold text-lg ">Now Hiring</h3>
            <div className="mt-4 bg-white rounded-lg flex flex-col gap-3 p-3">
              {jobs.length > 0 ? (
                jobs.map((job) => job && <JobItem key={job.id} data={job} />)
              ) : (
                <div className="flex justify-center items-center">
                  <h1 className="font-semibold text-gray-400 text-lg">
                    No Job Found
                  </h1>
                </div>
              )}
            </div>
            <div className="mt-4">
              <Pagination
                current={currentPage}
                total={totalPage}
                onChange={onChangePage}
                hasNext={hasNextPage}
                hasPrev={hasPrevPage}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 mx-3 md:col-span-3 md:mx-0 order-3">
          <Profile data={cookies.user} />
        </div>
      </div>
    </Layout.Default>
  );
}
