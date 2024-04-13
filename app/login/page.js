"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: login.email,
      password: login.password,
    };

    try {
      const res = await axios.post("/api/login", loginData);
      const data = await res.data;
      if (data.success) {
        document.getElementById("verified-box").showModal();
        setTimeout(() => {
          window.location.href = "/products";
        }, 2000);
      } else {
        console.log(data);
        document.getElementById("my_modal_2").showModal();
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-8 shadow-md rounded-md w-full sm:w-96 bg-primary bg-opacity-5">
        <h2 className="text-3xl font-semibold mb-4 text-slate-200">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mx-2 my-2"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="input input-bordered input-secondary w-full max-w-xs"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              value={login.email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mx-2 my-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered input-secondary w-full max-w-xs"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              value={login.password}
            />
          </div>
          <div className="mb-4">
            <button className="btn">Login</button>
          </div>
          <div className="flex mb-4 justify-end">
            <p className="mr-2">Don&apos;t have an account?</p>
            <Link
              href={"/signup"}
              className="text-blue-600 visited:text-purple-600"
            >
              Sign Up
            </Link>
          </div>
        </form>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Wrong Password or E-mail!</h3>
            <p className="py-4">Please enter correct E-mail and password</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
          <dialog
            id="verified-box"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg ml-10">Login Successful!</h3>
              <div className="flex justify-center">
                <p className="py-4">Redirecting you to products page</p>
                <span className="loading loading-dots loading-sm ml-3"></span>
              </div>
              <div className="modal-action"></div>
            </div>
          </dialog>
        </dialog>
      </div>
    </div>
  );
};

export default Login;
