import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { IState as AppInterface } from "../App";
import { State } from "../redux";
import { useSelector } from "react-redux";

function Composer() {
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const currentUser = userList.filter(
    (user) => user.id === JSON.parse(`${localStorage.getItem("currentUserID")}`)
  )[0];
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div
        className="bg-white dark:bg-[#242526] sm:p-5 p-2 flex gap-2 items-center justify-between sm:rounded-xl sm:drop-shadow-xl w-full h-20 sm:mb-7 mb-2 cursor-pointer"
        onClick={() => setIsShow(!isShow)}
      >
        <img className="h-[54px] w-[54px] rounded-full object-cover" src={currentUser.avatar}></img>
        <input
          className="flex-1 text-lg bg-neutral-100 dark:bg-[#3a3b3c] dark:border-slate-700 0 border-solid py-3 px-4 rounded-xl outline-none placeholder:text-slate-400 border-[1px] cursor-pointer"
          type="text"
          placeholder="Đăng bài"
        ></input>
        <i className="fa-solid fa-file text-2xl dark:text-[#94a3b8]"></i>
        <i className="fa-solid fa-images text-2xl dark:text-[#94a3b8]"></i>
      </div>
      {isShow && (
        <CreatePostModal
        setIsShow={setIsShow}
        ></CreatePostModal>
      )}
    </>
  );
}

export default Composer;
