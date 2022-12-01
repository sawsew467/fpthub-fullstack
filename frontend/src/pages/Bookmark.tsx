import React from "react";
import Menu from "../components/Menu";
import Header from "../parts/Header";
import { useSelector } from "react-redux";
import { State } from "../redux";
import { IState as AppInterface } from "../App";
import Post from "../components/Post";
import Trending from "../components/Trending";

function Bookmark() {
  const postList: AppInterface["postList"] = useSelector(
    (state: State) => state.posts
  );
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const currentUser = userList.filter(
    (user) => user.id === JSON.parse(`${localStorage.getItem("currentUserID")}`)
  )[0];
  return (
    <>
      <div className="light">
        <Header></Header>
        <div className="sm:mt-20 mt-[70px] bg-zinc-200 dark:bg-black	z-10">
          <div className="mx-auto container lg-auto sm:p-7 flex justify-between items-start gap-7 py-2 sm:pt0">
            <Menu choose={4}></Menu>
            <div className="flex-1 min-h-screen	">
              <p className="dark:text-white700 text-2xl pl-2 sm:pl-0">
                Dấu trang
              </p>
              <p className="dark:text-white700 text-md sm:mb-5 mb-2 pl-2 sm:pl-0">
                {/* @{currentUser[0].userName} */}
                @ThangTVB
              </p>
              {postList.map((item, index) => {
                if (currentUser.bookmarkList.includes(item.id) === true)
                  return <Post key={item.id} postInfo={item}></Post>;
              })}
            </div>
            <Trending></Trending>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookmark;
