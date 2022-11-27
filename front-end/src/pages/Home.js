import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllPosts } from "../apis/postApis";
import { getCurrentUser } from "../apis/userApis";
import Composer from "../components/Composer";
import Menu from "../components/Menu";
import Post from "../components/Post";
import Poster from "../components/Poster";
import Trending from "../components/Trending";
import Header from "../parts/Header";
import { postsSelector } from "../redux/selectors";

function Home(props) {
  const postList = useSelector(postsSelector).reverse();
  return (
    <>
      <div className={props.mode === true ? "dark" : "light"}>
        <Header></Header>
        <div className="mt-[70px] sm:mt-20 bg-zinc-200	z-10 dark:bg-black">
          <div className="mx-auto container lg-auto sm:p-7 p-0 flex justify-between items-start gap-7 w-full">
            <Menu choose={1}></Menu>
            <div className="flex-1 min-h-screen	">
              <Composer></Composer>
              <div className="flex flex-col">
                {
                  postList.map((post, index) => (
                    <Post key={index} info={post}></Post>
                  ))
                }
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
