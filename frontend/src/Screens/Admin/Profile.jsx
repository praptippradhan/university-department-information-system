import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { baseApiURL } from "../../baseUrl";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState({ new: "", current: "" });
  const router = useLocation();

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = { "Content-Type": "application/json" };

    if (!password.current || !password.new) {
      toast.error("Please fill in both password fields.");
      return;
    }

    axios
      .post(
        `${baseApiURL()}/admin/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Login failed");
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = { "Content-Type": "application/json" };

    axios
      .post(
        `${baseApiURL()}/admin/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Update failed");
        console.error(error);
      });
  };

  return (
    <div className="w-[85%] mx-auto my-8 flex justify-between items-start">
      <div>
        <p className="text-2xl font-semibold">
          Hello Prapti Prachita Pradhan! 👋
        </p>
        <div className="mt-3">
          <p className="text-lg font-normal mb-2">Employee Id: 1</p>
          <p className="text-lg font-normal mb-2">Phone Number: +91 8480071617</p>
          <p className="text-lg font-normal mb-2">Email Address: praptiprachita2004@gmail.com</p>
        </div>
        <button
          className={`${
            showPass ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
          }  px-3 py-1 rounded mt-4`}
          onClick={() => setShowPass(!showPass)}
        >
          {!showPass ? "Change Password" : "Close Change Password"}
        </button>
        {showPass && (
          <form
            className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"
            onSubmit={checkPasswordHandler}
          >
            <input
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
              placeholder="Current Password"
              className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
            />
            <input
              type="password"
              value={password.new}
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
              placeholder="New Password"
              className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
            />
            <button
              className="mt-4 hover:border-b-2 hover:border-blue-500"
              type="submit"
            >
              Change Password
            </button>
          </form>
        )}
      </div>
      <img
        src="/default-profile.png"
        alt="admin profile"
        className="h-[15%] w-[15%] object-cover rounded-lg shadow-md"
      />
    </div>
  );
};

export default Profile;
