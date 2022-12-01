import React from "react";
import Menu from "../components/Menu";
import Post from "../components/Post";
import Trending from "../components/Trending";
import { useSelector } from "react-redux";
import Header from "../parts/Header";
import { IState as AppInterface } from "../App";
import { State } from "../redux";
import Composer from "../components/Composer";

function Home() {
  const postList: AppInterface["postList"] = useSelector(
    (state: State) => state.posts
  );
  return (
    <>
      <div className={"light"}>
        <Header></Header>
        <div className="mt-[70px] sm:mt-20 bg-zinc-200	z-10 dark:bg-black">
          <div className="mx-auto container lg-auto sm:p-7 p-0 flex justify-between items-start gap-7 w-full">
            <Menu choose={1}></Menu>
            <div className="flex-1 min-h-screen	">
              <Composer></Composer>
              <div className="flex flex-col">
                {postList.map((post, index) => (
                  <Post key={post.id} postInfo={post}></Post>
                ))}
              </div>
            </div>
            <Trending></Trending>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
