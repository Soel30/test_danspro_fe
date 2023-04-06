import Dropdown from "../../../common/dropdown";
import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const AppHeaderDekstop: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "access_token",
  ]);

  const handleLogut = () => {
    removeCookie("user");
    removeCookie("access_token");
    toast.success("Logout success");

    return <Navigate to="/" />;
  };

  return (
    <nav className="bg-white shadow relative">
      <div className="max-w-[85rem] mx-auto flex justify-between items-center gap-12">
        <div className="flex items-center gap-12">
          <img
            src="/logo.png"
            alt="logo"
            className="w"
            width={120}
            height={120}
          />
          <ul className="flex items-center gap-6">
            <li className="py-7">
              <NavLink
                to="/"
                className={({ isActive, isPending }) => {
                  return isActive || isPending ? "nav-item-active" : "nav-item";
                }}
                end
              >
                Job List
              </NavLink>
            </li>
            <li className="py-4">
              <NavLink
                to="/about"
                className={({ isActive, isPending }) => {
                  return isActive || isPending ? "nav-item-active" : "nav-item";
                }}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <div className="dropdown">
          <label tabIndex={0} className="btn m-1">
            Click
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 -left-20"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div> */}
        <div>
          <Dropdown
            icon={
              <img src="/man.webp" alt="" className="w-10 h-10 rounded-full" />
            }
          >
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleLogut}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default AppHeaderDekstop;
