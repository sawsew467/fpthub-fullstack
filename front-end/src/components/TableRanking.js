import React from "react";

function TableRanking(props) {
  return (
    <>
      <div className={props.mode === true ? "dark" : "light"}>
        <div className="flex flex-rox justify-between items-end mb-4">
          <div className="relative sm:w-60 sm:block hidden">
            <input
              className="w-full text-lg bg-zinc-200 dark:border-slate-700 dark:bg-[#000] py-2 sm:pr-4 sm:pl-6 pl-[3.2rem] outline-none placeholder:text-slate-600 text-slate-600 border-b-[1px] border-slate-600"
              type="text"
              placeholder="Tìm kiếm"
            ></input>
            <div className="absolute left-0 top-0 h-[45px] flex items-center">
              <i className="fa-solid fa-magnifying-glass text-slate-600"></i>
            </div>
          </div>
          <div className="flex flex-row w-1/3 justify-around">
            <p className="text-lg text-slate-600">FPoints</p>
            <p className="text-lg text-slate-600">Followers</p>
          </div>
        </div>
        <div className="w-full flex flex-col sm:gap-3 gap-2 bg-white dark:bg-[#242526] dark:text-white700 sm:rounded-xl sm:drop-shadow-xl sm:p-5 p-2 min-h-[5rem] sm:mb-7 mb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank, index) => (
            <div className="flex flex-row items-center justify-between" key={index}>
              <div className="flex flex-row items-center">
                <span className="w-[44px] text-lg text-slate-600 dark:text-white700">#{rank}</span>
                <div className="w-[54px] mr-2">
                  <img src={require("../assets/images/avt2.png")}></img>
                </div>
                <div className="flex flex-col">
                  <p className="text-slate-900 dark:text-white700 font-medium text-lg hover:underline cursor-pointer">
                    Trần Văn Bảo Thắng
                  </p>
                  <p className="text-slate-500 text-sm">Kỹ thuật phần mềm</p>
                </div>
              </div>
              <div className="flex flex-row w-1/3 justify-around">
                <p className="text-lg text-fpoints">280</p>
                <p className="text-lg text-followers">13</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TableRanking;
