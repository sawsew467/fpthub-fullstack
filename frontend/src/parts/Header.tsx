import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import logo from "../assets/images/logo.svg";
import contribute from "../assets/images/contribute.svg";
import { IState as AppInterface } from "../App";
import { State } from "../redux";
import { useSelector } from "react-redux";

function Header() {
  const myRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const currentUser = userList.filter(
    (user) => user.id === JSON.parse(`${localStorage.getItem("currentUserID")}`)
  )[0];
  const shortName = (name: string) => {
    const words = name.split(" ");
    return words[words.length - 2] + " " + words[words.length - 1];
  };
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white sm:drop-shadow-lg z-50 dark:bg-[#242526] ">
        <div className="container xl-auto mx-auto">
          <div className="sm:h-20 sm:pl-7 sm:pr-7 p-2 flex items-center justify-between gap-7">
            <div className="w-4/5 sm:w-1/5">
              <Link to="/home">
                <img className="" src={logo} alt=""></img>
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:w-2/5">
              <SearchBox></SearchBox>
              <div
                className="flex-col gap-2 sm:hidden flex cursor-pointer"
                // onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}
              >
                <div className="w-[3.2rem] h-1 bg-orange"></div>
                <div className="w-[3.2rem] h-1 bg-orange"></div>
                <div className="w-[3.2rem] h-1 bg-orange"></div>
              </div>
            </div>
            <div
              className="w-1/5 items-center justify-between relative sm:flex hidden"
              ref={myRef}
            >
              <img
                className="h-[50px] w-[50px] rounded-full object-cover"
                src={currentUser.avatar}
                alt=""
              ></img>
              <p className="text-lg flex-1 ml-3 font-medium dark:text-white700">
                {shortName(currentUser.name)}
              </p>
              <i
                className="fa-solid fa-caret-down w-8 h-8 flex justify-center items-center hover:bg-slate-100 rounded-full cursor-pointer dark:text-white700 dark:hover:bg-slate-500"
                onClick={() => setShowDropdown(!showDropdown)}
              ></i>
              {showDropdown && (
                <div className="absolute right-0 top-14 p-5 bg-white dark:bg-[#242526] dark:text-white700 drop-shadow-lg rounded-xl min-w-[20rem]">
                  <div className="flex pb-5 border-b-[1px] border-slate-300	border-solid">
                    <img
                      className="h-[64px] w-[64px] object-cover rounded-full" 
                      src={currentUser.avatar}
                      alt=""
                    ></img>
                    <div className="flex flex-col justify-center ml-3">
                      <p className="text-2xl font-medium">{shortName(currentUser.name)}</p>
                      <Link
                        className="text-lg"
                        to={`/profile/${currentUser.id}`}
                      >
                        Xem hồ sơ
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="pt-5 flex items-center text-lg">
                      <div className="flex justify-center items-center h-10 w-10 bg-[#d9d9d9] rounded-full">
                        <i className="fa-solid fa-gear text-[#33394d] text-xl"></i>
                      </div>
                      <Link className="ml-3" to="/settings">
                        Cài đặt
                      </Link>
                    </div>
                    <div className="pt-5 flex items-center text-lg">
                      <div className="flex justify-center items-center h-10 w-10 bg-[#d9d9d9] rounded-full">
                        <i className="fa-solid fa-moon text-[#33394d] text-xl"></i>
                      </div>
                      <div
                        className="ml-3 cursor-pointer"
                        // onClick={handleDarkmode}
                      >
                        Darkmode
                        {/* {isDarkmode ? ": ON" : ": OFF"} */}
                      </div>
                    </div>
                    <div className="pt-5 flex items-center text-lg">
                      <img src={contribute} alt=""></img>
                      <Link className="ml-3" to="">
                        Đóng góp
                      </Link>
                    </div>
                    <div className="pt-5 flex items-center text-lg">
                      <div className="flex justify-center items-center h-10 w-10 bg-[#d9d9d9] rounded-full">
                        <i className="fa-solid fa-right-from-bracket text-[#33394d] text-xl"></i>
                      </div>
                      <Link className="ml-3" to="/login">
                        Đăng xuất
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
