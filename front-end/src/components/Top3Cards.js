import React from "react";

function Top3Cards(props) {
  return (
    <>
      <div className={props.mode === true ? "dark" : "light"}>
        <div className="w-full flex flex-row justify-between">
          <div className="w-[32%] h-[220px] flex flex-col bg-white dark:bg-[#242526] drop-shadow-xl rounded-xl mt-8 relative">
            <div className="w-full justify-center absolute top-[-40px]">
              <img
                className="w-1/3 mx-auto"
                src={require("../assets/images/prize/silver.png")}
              ></img>
            </div>
            <p className="text-xl text-center font-medium mt-10 mb-2 px-4 dark:text-white700">
              Trần Văn Bảo Thắng
            </p>
            <div className="w-full justify-center">
              <img
                className="w-1/3 mx-auto"
                src={require("../assets/images/avt2.png")}
              ></img>
            </div>
            <div className="flex flex-row justify-between my-2 px-4">
              <div className="flex flex-row gap-2">
                <p className="text-md text-fpoints">12</p>
                <p className="text-md text-fpoints sm:block hidden">FPoints</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-md text-followers">12</p>
                <p className="text-md text-followers sm:block hidden">
                  FPoints
                </p>
              </div>
            </div>
            <div className="w-full flex-1 bg-blue rounded-bl-xl rounded-br-xl flex flex-row justify-center items-center cursor-pointer">
              <div className=" text-md text-white">View profile</div>
            </div>
          </div>
          <div className="w-[32%] h-[220px] flex flex-col bg-white dark:bg-[#242526] drop-shadow-xl rounded-xl">
            <div className="w-full justify-center absolute left-0 top-[-40px]">
              <img
                className="w-1/3 mx-auto"
                src={require("../assets/images/prize/gold.png")}
              ></img>
            </div>
            <p className="text-xl text-center font-medium mt-10 mb-2 px-4 dark:text-white700">
              Trần Văn Bảo Thắng
            </p>
            <div className="w-full justify-center">
              <img
                className="w-1/3 mx-auto"
                src={require("../assets/images/avt2.png")}
              ></img>
            </div>
            <div className="flex flex-row justify-between my-2 px-4">
              <div className="flex flex-row gap-2">
                <p className="text-md text-fpoints">12</p>
                <p className="text-md text-fpoints sm:block hidden">FPoints</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-md text-followers">12</p>
                <p className="text-md text-followers sm:block hidden">
                  FPoints
                </p>
              </div>
            </div>
            <div className="w-full flex-1 bg-blue rounded-bl-xl rounded-br-xl flex flex-row justify-center items-center cursor-pointer">
              <div className=" text-md text-white">View profile</div>
            </div>
          </div>
          <div className="w-[32%] h-[220px] flex flex-col bg-white dark:bg-[#242526] drop-shadow-xl rounded-xl mt-16">
            <div className="w-full justify-center absolute top-[-40px]">
              <img
                className="w-1/3 mx-auto"
                src={require("../assets/images/prize/copper.png")}
              ></img>
            </div>
            <p className="text-xl text-center font-medium mt-10 mb-2 px-4 dark:text-white700">
              Trần Văn Bảo Thắng
            </p>
            <div className="w-full justify-center">
              <img
                className="w-1/3 mx-auto"
                src={require("../assets/images/avt2.png")}
              ></img>
            </div>
            <div className="flex flex-row justify-between my-2 px-4">
              <div className="flex flex-row gap-2">
                <p className="text-md text-fpoints">12</p>
                <p className="text-md text-fpoints sm:block hidden">FPoints</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-md text-followers">12</p>
                <p className="text-md text-followers sm:block hidden">
                  FPoints
                </p>
              </div>
            </div>
            <div className="w-full flex-1 bg-blue rounded-bl-xl rounded-br-xl flex flex-row justify-center items-center cursor-pointer">
              <div className=" text-md text-white">View profile</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Top3Cards;
