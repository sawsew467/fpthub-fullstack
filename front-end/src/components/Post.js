import { React, useState } from "react";
import { Link } from "react-router-dom";
import InteractionBar from "./InteractionBar";
import moment from 'moment';


function Post(props) {
  const info = props.info;
  // console.log(info);
  
  return (
    <>
      <div className="w-full flex flex-col sm:gap-3 gap-2 bg-white dark:bg-[#242526] dark:text-white700 sm:rounded-xl sm:drop-shadow-xl sm:p-5 p-2 min-h-[5rem] sm:mb-7 mb-2">
        <div className="flex justify-between">
          <div className="flex sm:gap-5 gap-2">
            <img className="max-h-[50px]" src={info.author.avatar} alt=""></img>
            <div className="flex flex-col justify-center">
              <div className="flex gap-2">
                <Link
                  to="/profile"
                  // onClick={() =>
                  //   window.localStorage.setItem(
                  //     "targetId",
                  //     JSON.stringify(owner[0].id)
                  //   )
                  // }
                >
                  <p className="text-lg font-semibold hover:underline">
                    {info.author.name}
                  </p>
                </Link>
              </div>
              <Link to="">
                <p className="text-xs hover:underline">{moment(info.createdAt).format("MMM Do YY")}</p>
              </Link>
            </div>
          </div>
          <div className="flex sm:gap-5 gap-3">
            <div className="flex gap-2">
              <i className="fa-solid fa-seedling text-lg text-green"></i>
              <p className="text-lg text-green">{info.seededList.length}</p>
              <p className="text-lg text-green sm:block hidden">Mầm</p>
            </div>
            <div className="flex gap-2">
              <i className="fa-solid fa-flag text-lg text-red"></i>
              <p className="text-lg text-red">{info.flagedList.length}</p>
              <p className="text-lg text-red sm:block hidden">Cờ</p>
            </div>
            <div
              className="rounded-full hover:bg-slate-200 w-8 h-8 flex justify-center items-center cursor-pointer"
              // onClick={() => setIsShow(!isShow)}
            >
              <i className="fa-solid fa-ellipsis"></i>
            </div>
            {/* {isShow && (
              <div className="flex flex-col bg-white drop-shadow-lg rounded-lg dark:bg-[#242526] absolute right-4 top-12">
                <p
                  className="text-lg px-4 py-2 rounded-tl-lg rounded-tr-lg dark:text-white700 hover:bg-slate-200 cursor-pointer"
                  onClick={deletePost}
                  // onClick={()}
                >
                  Xóa bài viết
                </p>
                <p className="text-lg px-4 py-2 dark:text-white700 hover:bg-slate-200 cursor-pointer">
                  Ẩn bài viết
                </p>
                <p className="text-lg px-4 py-2 rounded-bl-lg rounded-br-lg dark:text-white700 hover:bg-slate-200 cursor-pointer">
                  Báo cáo bài viết
                </p>
              </div>
            )} */}
          </div>
        </div>
        <div className="text-lg">{info.content}</div>
        <InteractionBar
          // isSeed={isSeed}
          // isFlag={isFlag}
          // isBookmark={isBookmark}
          info={info}
        ></InteractionBar>
      </div>
    </>
  );
}

export default Post;
