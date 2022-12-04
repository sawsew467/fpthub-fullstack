import React from "react";
import Menu from "../components/Menu";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../parts/Header";
import { State } from "../redux";
import { IState as AppInterface } from "../App";
import { useSelector } from "react-redux";
import Jumbotron from "../components/Jumbotron";
import { useParams } from "react-router-dom";

function UserProfile() {
  const params = useParams();
  const postList: AppInterface["postList"] = useSelector(
    (state: State) => state.posts
  );
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const targetedUser = userList.filter((user) => user.id === params.id)[0];

  return (
    <>
      <div className="light">
        <Header></Header>
        <Jumbotron></Jumbotron>
        <div className="bg-zinc-200	z-10 dark:bg-black pt-2 sm:pt-0">
          <div className="mx-auto container lg-auto sm:p-7 p-0 flex justify-between items-start gap-7">
            <Menu choose={-1}></Menu>
            <div className="flex-1 min-h-screen">
              {postList.map((post, index) => {
                if (post.author === targetedUser.id)
                  return <Post key={post.id} postInfo={post} isShowComments={false}></Post>;
              })}
            </div>
            <Trending></Trending>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
