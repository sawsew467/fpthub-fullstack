import React from 'react'
import Menu from '../components/Menu'
import Trending from '../components/Trending'
import ADVERTISEMENT_DEMO from '../data/companyDemo'
import FAKE_TRENDING_LIST from '../data/trendingList'
import Header from '../parts/Header'

function ExplorePage() {
  return (
    <>
      <div className="light">
        <Header></Header>
        <div className="sm:mt-20 mt-[70px] bg-zinc-200	z-10 dark:bg-black min-h-screen">
          <div className="mx-auto container lg-auto sm:p-7 flex justify-between items-start gap-7">
            <Menu choose={2}></Menu>
            <div className="flex-1">
              <div className="bg-white dark:bg-[#242526] dark:text-white700 flex flex-col sm:rounded-xl drop-shadow-xl w-full">
                <img
                  className="w-full sm:rounded-tl-xl sm:rounded-tr-xl"
                  src={require("../assets/images/banner.png")}
                  alt=""
                ></img>
                <div className="sm:p-5 p-2">
                  {ADVERTISEMENT_DEMO.map((item, index) => (
                    <div key={index} className="flex flex-col mb-1 last:mb-0 relative group cursor-pointer border-b-[1px] last:border-0 pb-1">
                    <p className="text-sm w-11/12 truncate">{item.title}</p>
                    <span className="text-md font-medium">{item.company}</span>
                    <div className="absolute h-full flex items-center right-1 group-hover:right-0 transition-all">
                      <i className="fa-solid fa-angle-right"></i>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
            <Trending></Trending>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExplorePage