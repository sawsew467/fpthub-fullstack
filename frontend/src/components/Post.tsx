import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IState as AppInterface } from "../App";
import DEMO_USERS from "../data/usersDemo";
import moment from 'moment';
import InteractionBar from "./InteractionBar";
import { CardMedia } from "@mui/material";
import { State } from "../redux";
import { useSelector } from "react-redux";

interface IProps {
  postInfo: AppInterface["post"];
}

function Post({ postInfo }: IProps) {
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const authorInfo = userList.filter(
    (user, index) => user.id === postInfo.author
  )[0];
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <>
      <div className="w-full flex flex-col sm:gap-3 gap-2 bg-white dark:bg-[#242526] dark:text-white700 sm:rounded-xl sm:drop-shadow-xl sm:p-5 p-2 min-h-[5rem] sm:mb-7 mb-2">
        <div className="flex justify-between">
          <div className="flex sm:gap-5 gap-2">
            <img className="h-[50px] w-[50px] rounded-full object-cover" src={authorInfo.avatar} alt=""></img>
            <div className="flex flex-col justify-center">
              <div className="flex gap-2">
                <Link
                  to={`/profile/${postInfo.author}`}
                >
                  <p className="text-lg font-semibold hover:underline">
                    {authorInfo.name}
                  </p>
                </Link>
              </div>
              <Link to="">
                <p className="text-xs hover:underline">
                  {/* {moment(postInfo.createdAt).format("MMM Do YY")} */}
                  {" 14 Tháng 10"}
                </p>
              </Link>
            </div>
          </div>
          <div className="flex sm:gap-5 gap-3">
            <div className="flex gap-2">
              <i className="fa-solid fa-seedling text-lg text-green"></i>
              <p className="text-lg text-green">
                {postInfo.counterSeed}
              </p>
              <p className="text-lg text-green sm:block hidden">Mầm</p>
            </div>
            <div className="flex gap-2">
              <i className="fa-solid fa-flag text-lg text-red"></i>
              <p className="text-lg text-red">
                {postInfo.counterFlag}

              </p>
              <p className="text-lg text-red sm:block hidden">Cờ</p>
            </div>
            <div
              className="rounded-full hover:bg-slate-200 w-8 h-8 flex justify-center items-center cursor-pointer"
              onClick={() => setIsShow(!isShow)}
            >
              <i className="fa-solid fa-ellipsis"></i>
            </div>
            {isShow && (
              <div className="flex flex-col bg-white drop-shadow-lg rounded-lg dark:bg-[#242526] absolute right-4 top-12">
                <p
                  className="text-lg px-4 py-2 rounded-tl-lg rounded-tr-lg dark:text-white700 hover:bg-slate-200 cursor-pointer"
                //   onClick={deletePost}
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
            )}
          </div>
        </div>
        <div className="text-lg">{postInfo.content}</div>
        {postInfo.attachments && (
              <CardMedia
                component="img"
                image={postInfo.attachments || ""}
                title="Title"
                className="w-7 h-[320px] object-contain"
                style={{
                  marginBottom: "8px",
                }}
              />
            )}
        <InteractionBar
          postInfo={postInfo}
        ></InteractionBar>
      </div>
    </>
  );
}

export default Post;
