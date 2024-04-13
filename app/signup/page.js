"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [signup, setSignup] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    const signupData = {
      name: signup.name,
      username: signup.username,
      email: signup.email,
      password: signup.password,
    };

    try {
      const res = await axios.post("/api/signup", signupData);
      const data = await res.data;
      if (data.success) {
        document.getElementById("verified-box").showModal();
        setTimeout(() => {
          window.location.href = "/products";
        }, 2000);
      }
    } catch (error) {
      console.log("Error Check Response!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-8 shadow-md rounded-md w-full sm:w-96 bg-primary bg-opacity-5">
        <h2 className="text-3xl font-semibold mb-4 text-slate-200">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium mx-2 my-2"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered input-secondary w-full max-w-xs"
              value={signup.name}
              onChange={(e) => setSignup({ ...signup, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium mx-2 my-2"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered input-secondary w-full max-w-xs"
              value={signup.username}
              onChange={(e) =>
                setSignup({ ...signup, username: e.target.value })
              }
            />
          </div>
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
              value={signup.email}
              onChange={(e) => setSignup({ ...signup, email: e.target.value })}
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
              value={signup.password}
              onChange={(e) =>
                setSignup({ ...signup, password: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <button className="btn">Sign Up</button>
          </div>
          <div className="flex mb-4 justify-end">
            <p className="mr-2">Already have an account?</p>
            <Link
              href={"/login"}
              className="text-blue-600 visited:text-purple-600"
            >
              Login
            </Link>
          </div>
        </form>
        <dialog
          id="verified-box"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg ml-10">Sign Up Successful!</h3>
            <div className="flex justify-center">
              <p className="py-4">Redirecting you to products page</p>
              <span className="loading loading-dots loading-sm ml-3"></span>
            </div>
            <div className="modal-action"></div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default SignUp;
