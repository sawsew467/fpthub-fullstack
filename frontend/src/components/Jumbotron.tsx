import React from "react";
import { State } from "../redux";
import { IState as AppInterface } from "../App";
import { useSelector } from "react-redux";
import moment from "moment";

function Jumbotron() {
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const targetedUser = userList.filter((user) => user.id === JSON.parse(`${localStorage.getItem("currentUserID")}`))[0];
  return (
    <>
      <div className="sm:mt-20 mt-[70px] bg-white dark:bg-black dark:text-white700 flex">
        <div className="container mx-auto flex sm:flex-row flex-col items-center sm:items-start sm:p-5 p-2 sm:gap-7 gap-2">
          <div className="flex flex-col lg:w-1/5 sm:w-1/4 w-2/5">
            <img
              className="w-36 sm:h-36 mx-auto object-cover rounded-full"
              src={targetedUser.avatar}
              alt=""
            ></img>
            <div className="flex justify-between mt-3">
              <div className="flex gap-1">
                <i className="fa-solid fa-seedling text-lg text-green"></i>
                <p className="text-lg text-green">{targetedUser.seeds}</p>
                <p className="text-lg text-green sm:block hidden">Mầm</p>
              </div>
              <div className="flex gap-1">
                <i className="fa-solid fa-flag text-lg text-red"></i>
                <p className="text-lg text-red">{targetedUser.flags}</p>
                <p className="text-lg text-red sm:block hidden">Cờ</p>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-start">
            <p className="text-xl font-semibold">{targetedUser.name}</p>
            <p className="text-lg sm:mt-5">
              Chưa có thông tin giới thiệu của người dùng
            </p>
            <p className="text-lg">
              Tham gia từ {moment(targetedUser.registered).format("LL")}
            </p>
          </div>
          <div className="flex sm:items-end sm:justify-end justify-center lg:w-2/12 w-2/5 text-lg h-full">
            {targetedUser.postList.length} Bài viết
          </div>
        </div>
      </div>
    </>
  );
}

export default Jumbotron;
