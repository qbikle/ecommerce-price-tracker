import Navbar from "@/components/Navbar";
import React from "react";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="mx-20">
        <h1 className="font-extrabold text-5xl my-16">User Information</h1>
        <div className="flex flex-col w-full">
          <div className="grid h-20 card bg-base-300 rounded-box items-center">
            <div className="grid grid-cols-2 justify-start ml-12">
              <div className="flex justify-end font-bold text-3xl mr-10">
                Username:
              </div>
              <div className="flex items-center text-2xl"> john123</div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid h-20 card bg-base-300 rounded-box items-center">
            <div className="grid grid-cols-2 justify-start ml-12">
              <div className="flex justify-end font-bold text-3xl mr-10">
                Name:
              </div>
              <div className="flex items-center text-2xl">John Dover</div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid h-20 card bg-base-300 rounded-box items-center">
            <div className="grid grid-cols-2 justify-start ml-12">
              <div className="flex justify-end font-bold text-3xl mr-10">
                Email:
              </div>
              <div className="flex items-center text-2xl"> john@gmail.com</div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid h-20 card bg-base-300 rounded-box items-center">
            <div className="grid grid-cols-2 justify-start ml-12">
              <div className="flex justify-end font-bold text-3xl mr-10">
                Phone:
              </div>
              <div className="flex items-center text-2xl"> +919882742892</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
