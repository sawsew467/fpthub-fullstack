import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postSignUpUser } from "../apis/userApis.js";
import { signInWithGoogle } from "../services/firebase.js";

function SignIn() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    seeds: 0,
    flags: 0,
    avatar: "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    if (confirmPassword === newUser.password) {
      const user = await postSignUpUser(e, newUser);
      if (user) {
        navigate("/login");
      }
    } else {
      alert("Please enter your password again");
    }
  };
  return (
    <>
      <img
        className="fixed top-0 bottom-0 w-screen h-screen"
        src={require("../assets/images/background.png")}
      ></img>
      <div className="relative w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-4xl mb-10">
            ĐĂNG KÝ TÀI KHOẢN FPT HUB
          </h2>
          <div className="relative w-8/12">
            <input
              className="w-full text-lg py-2 pr-3 pl-10 rounded-xl placeholder:text-gray-800 bg-[#ffffff9c] outline-none"
              placeholder="Tên tài khoản"
              onChange={(e) =>
                setNewUser({ ...newUser, userName: e.target.value })
              }
              value={newUser.userName}
            ></input>
            <div className="absolute top-0 left-0 w-10 h-full flex justify-center items-center">
              <i className="fa-solid fa-signature text-lg text-orange"></i>
            </div>
          </div>
          <div className="relative w-8/12 mt-3">
            <input
              className="w-full text-lg py-2 pr-3 pl-10 rounded-xl placeholder:text-gray-800 bg-[#ffffff9c] outline-none"
              placeholder="Tên"
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              value={newUser.name}
            ></input>
            <div className="absolute top-0 left-0 w-10 h-full flex justify-center items-center">
              <i className="fa-solid fa-user text-lg text-orange"></i>
            </div>
          </div>
          <div className="relative w-8/12 mt-3">
            <input
              className="w-full text-lg py-2 pr-3 pl-10 rounded-xl placeholder:text-gray-800 bg-[#ffffff9c] outline-none"
              placeholder="Email"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              value={newUser.email}
            ></input>
            <div className="absolute top-0 left-0 w-10 h-full flex justify-center items-center">
              <i className="fa-solid fa-envelope text-lg text-orange"></i>
            </div>
          </div>
          <div className="w-8/12 relative mt-3">
            <input
              className="w-full text-lg py-2 pr-3 pl-10 rounded-xl placeholder:text-gray-800 bg-[#ffffff9c] outline-none"
              placeholder="Mật khẩu"
              type="password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              value={newUser.password}
            ></input>
            <div className="absolute top-0 left-0 w-10 h-full flex justify-center items-center">
              <i className="fa-solid fa-lock text-lg text-orange"></i>
            </div>
          </div>
          <div className="w-8/12 relative my-3">
            <input
              className="w-full text-lg py-2 pr-3 pl-10 rounded-xl placeholder:text-gray-800 bg-[#ffffff9c] outline-none"
              placeholder="Xác nhận mật khẩu"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            ></input>
            <div className="absolute top-0 left-0 w-10 h-full flex justify-center items-center">
              <i className="fa-solid fa-lock text-lg text-orange"></i>
            </div>
          </div>
          {/* <div className="flex w-8/12 items-center justify-end text-white">
            <div className="flex items-center gap-1">
              <p className="text-md">Đã có tài khoản?</p>
            </div>
            <Link to="/login" className="hover:underline text-md">
              Đăng nhập
            </Link>
          </div> */}
          <button
            className="w-7/12 text-lg py-2 px-3 mt-3 bg-[#ffffff9c] text-center rounded-full"
            onClick={(e) => handleSubmit(e)}
          >
            Đăng ký
          </button>
          <span className="text-white text-xs my-1">Đã có tài khoản?</span>
          <Link to="/login" className="hover:underline text-md w-7/12">
            <button className="w-full text-lg py-2 px-3 bg-[#ffffff9c] text-center rounded-full">
              Đăng nhập
            </button>
          </Link>
          {/* <button
            className="w-7/12 text-lg py-2 px-3 bg-[#ffffff9c] text-center rounded-full"
            onClick={signInWithGoogle}
          >
            Đăng nhập bằng Google
          </button> */}
        </div>
      </div>
    </>
  );
}

export default SignIn;
