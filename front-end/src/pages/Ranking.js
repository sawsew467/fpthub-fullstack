import React from "react";
import Menu from "../components/Menu";
import SearchBox from "../components/SearchBox";
import TableRanking from "../components/TableRanking";
import Top3Cards from "../components/Top3Cards";
import Trending from "../components/Trending";
import Header from "../parts/Header";

function Ranking(props) {
  return (
    <>
      <div className={props.mode === true ? "dark" : "light"}>
        <Header></Header>
        <div className="mt-[70px] sm:mt-20 bg-zinc-200	z-10 dark:bg-black">
          <div className="mx-auto container lg-auto sm:p-7 p-0 flex justify-between items-start gap-7 w-full">
            <Menu choose={5}></Menu>
            <div className="flex-1 min-h-screen	">
              <p className="dark:text-white700 text-2xl pl-2 sm:pl-0">
                Xếp hạng
              </p>
              <p className="dark:text-white700 text-md sm:mb-5 mb-2 pl-2 sm:pl-0">
                TOP 10 FUDA
              </p>
              <Top3Cards mode={props.mode}></Top3Cards>
              <p className="dark:text-white700 text-slate-600 text-lg sm:mb-5 mb-2 pl-2 sm:pl-0 mt-[-16px]">
                Xếp hạng của bạn: 233
              </p>
              <TableRanking mode={props.mode}></TableRanking>
            </div>
            <Trending></Trending>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ranking;
