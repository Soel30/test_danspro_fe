import { NavLink, Navigate } from "react-router-dom";
import MenuBarIcon from "../../../../assets/icons/MenuBar";
import React from "react";
import Dropdown from "../../../common/dropdown";
import { Menu } from "@headlessui/react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const AppHeaderMobile: React.FC = () => {
  const [isMenuShow, setIsMenuShow] = React.useState(false);
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
    <>
      <nav className="bg-white py-5 px-4 relative">
        <div className="flex justify-between items-center">
          <img
            src="/logo.png"
            alt="logo"
            className="w"
            width={120}
            height={120}
          />

          <div className="flex items-center gap-5">
            <button onClick={() => setIsMenuShow(!isMenuShow)}>
              <MenuBarIcon />
            </button>
            <div>
              <Dropdown
                icon={
                  <img
                    src="/man.webp"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
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
        </div>
      </nav>
      <div
        className={
          isMenuShow
            ? "absolute left-0 py-2 bg-white shadow border-t-2 w-full -ml-0 transition-all duration-200"
            : "absolute left-0 py-2 bg-white shadow border-t-2 w-full -ml-[100rem] transition-all duration-200"
        }
      >
        <ul className="flex flex-col gap-3 w-full">
          <li className="flex">
            <NavLink
              to="/"
              className={({ isActive, isPending }) => {
                return isActive || isPending
                  ? "nav-mobile-item-active"
                  : "nav-mobile-item";
              }}
              end
            >
              Job List
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AppHeaderMobile;
