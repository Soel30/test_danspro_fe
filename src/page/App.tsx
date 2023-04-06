import { API_URL } from "../constant";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["access_token", "user"]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const api_url = API_URL;
    const response = await fetch(`${api_url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    if (data.code === 200 && data.status === "success") {
      setCookie("access_token", data.data.token, {
        path: "/",
        expires: new Date(Date.now() + 86400000),
        maxAge: 86400000,
      });
      const user_url = `${api_url}/me`;
      const user_response = await fetch(user_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.data.token}`,
        },
      });
      const user_data = await user_response.json();
      setCookie("user", user_data.data, {
        path: "/",
        expires: new Date(Date.now() + 86400000),
        maxAge: 86400000,
      });
      toast.success("Login success");
    } else {
      toast.error("Login failed, Check your username and password");
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center max-w-lg mx-auto">
        <div className="bg-white px-5 py-10 w-full rounded-lg shadow-lg">
          <h1 className="text-center font-semibold text-lg">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
