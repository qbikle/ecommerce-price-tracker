"use client";
import Link from "next/link";
import React from "react";

const Login = () => {
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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginData }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Fetch error:", error);
      // Handle fetch error
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
