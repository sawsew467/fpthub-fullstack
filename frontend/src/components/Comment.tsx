import React from "react";
import { useSelector } from "react-redux";
import { IState as AppInterface } from "../App";
import { State } from "../redux";

function CommentItem() {
  return (
    <>
      <div className="flex flex-row gap-2 mb-5">
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
          className="w-[40px] h-[40px]"
        ></img>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col  bg-[#F6F7F8] rounded-xl p-2">
            <div className="flex flex-row justify-between items-end relative">
              <p className="text-lg font-medium self-start leading-[18px] mb-2">Nguyễn Nhật Anh</p>
              <div className="flex sm:gap-2 gap-3 items-end absolute right-0">
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-seedling text-md text-green"></i>
                  <p className="text-md text-green">
                    {/* {postInfo.counterSeed} */}
                    12
                  </p>
                  <p className="text-md text-green sm:block hidden">Mầm</p>
                </div>
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-flag text-md text-red"></i>
                  <p className="text-md text-red">
                    {/* {postInfo.counterFlag} */}
                    04
                  </p>
                  <p className="text-md text-red sm:block hidden">Cờ</p>
                </div>
                <div className="rounded-full hover:bg-slate-200 w-8 h-8 flex justify-center items-center cursor-pointer">
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              </div>
            </div>
            <p>
              Số 17 ức chế, chờ cậu thủ đã méc lẻo với trọng tài lúc nãy ra sân
              rùi mời đi nhậu, chỉ để hỏi 1 câu “ Ủa máy bạn nói tiếng Anh ổng
              hiểu, còn tụi tôi nói ổng không hiểu là sao “ rùi nói thêm câu nữa
              “ Mày … Ngon”
            </p>
          </div>
          <div className="flex flex-row gap-2 mt-1 items-end">
            <i className="fa-solid fa-seedling text-sm text-green"></i>
            <i className="fa-solid fa-flag text-sm text-red"></i>
            <p className="text-sm">20 phút</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Comment() {
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const currentUser = userList.filter(
    (user) => user.id === JSON.parse(`${localStorage.getItem("currentUserID")}`)
  )[0];
  return (
    <>
      <div className="w-full bg-white dark:bg-[#242526] flex gap-2 items-center justify-between sm:rounded-xl sm:mb-3 mb-2 cursor-pointer">
        <img
          className="h-[40px] w-[40px] rounded-full object-cover"
          src={currentUser.avatar}
        ></img>
        <input
          className="flex-1 text-sm bg-neutral-100 dark:bg-[#3a3b3c] dark:border-slate-700 0 border-solid py-3 px-4 rounded-xl outline-none placeholder:text-slate-400 border-[1px]"
          type="text"
          placeholder="Bình luận của bạn..."
        ></input>
        <i className="fa-solid fa-file text-2xl dark:text-[#94a3b8]"></i>
        <i className="fa-solid fa-images text-2xl dark:text-[#94a3b8]"></i>
      </div>
      <div className="w-full flex flex-col">
        <CommentItem></CommentItem>
        <CommentItem></CommentItem>
      </div>
    </>
  );
}

export default Comment;
