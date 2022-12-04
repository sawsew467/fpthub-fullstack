import React from "react";
import { useParams } from "react-router";
import Menu from "../components/Menu";
import Trending from "../components/Trending";
import Header from "../parts/Header";
import { useSelector } from "react-redux";
import { IState as AppInterface } from "../App";
import { State } from "../redux";
import Post from "../components/Post";

function PostDetail() {
  const params = useParams();
  const postList: AppInterface["postList"] = useSelector(
    (state: State) => state.posts
  );
  const targetedPost = postList.filter(
    (post, index) => post.id === params.id
  )[0];
  return (
    <>
      <div className={"light"}>
        <Header></Header>
        <div className="mt-[70px] sm:mt-20 bg-zinc-200	z-10 dark:bg-black">
          <div className="mx-auto container lg-auto sm:p-7 p-0 flex justify-between items-start gap-7 w-full">
            <Menu choose={1}></Menu>
            <div className="flex-1 min-h-screen	">
              <div className="flex flex-col">
                <Post key={targetedPost.id} postInfo={targetedPost} isShowComments={true}></Post>
              </div>
            </div>
            <Trending></Trending>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
