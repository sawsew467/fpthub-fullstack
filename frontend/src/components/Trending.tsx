import React from "react";
import ADVERTISEMENT_DEMO from "../data/companyDemo";

function Trending() {
  return (
    <>
      <div className="w-1/5 hidden lg:block">
        <div className="bg-white p-5 flex flex-col rounded-xl w-full drop-shadow-xl dark:bg-[#242526] dark:text-white700">
          {/* <h2 className="text-lg text-center mb-3">Nổi bật</h2>
          {FAKE_TRENDING_LIST.map((item, index) => (
            <div key={index} className="flex flex-col mb-1 last:mb-0">
              <p className="text-sm">Chủ đề nổi trội ở {item.position}</p>
              <span className="text-md font-medium">#{item.tag}</span>
            </div>
          ))} */}
          <h2 className="text-lg text-center mb-3 font-semibold">HOT NEWS</h2>
          {ADVERTISEMENT_DEMO.map((item, index) => (
            <div
              key={index}
              className="flex flex-col mb-1 last:mb-0 relative group cursor-pointer border-b-[1px] last:border-0 pb-1"
            >
              <p className="text-sm w-11/12 truncate">{item.title}</p>
              <span className="text-md font-medium">{item.company}</span>
              <div className="absolute h-full flex items-center right-1 group-hover:right-0 transition-all">
                <i className="fa-solid fa-angle-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Trending;
