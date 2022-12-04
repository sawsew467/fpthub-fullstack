import React from "react";

function BoxChat() {
  return (
    <>
      <div className="w-2/3 h-full flex flex-col border-[1px] border-l-0 border-slate-400 rounded-tr-xl rounded-br-xl">
        <div className="w-full text-lg font-medium text-center border-b-[1px] border-slate-400 py-2">
          An Quân
        </div>
        <div className="flex-1 flex flex-col px-4 justify-end">
          {/*  */}
          <div className="w-full flex flex-row justify-end mb-1">
            <p className="text-md px-3 py-1 bg-yellow-400 rounded-full">
              dân tình toàn sợ dịch có ai dám đi mô
            </p>
          </div>
          <div className="w-full flex flex-row justify-end mb-1">
            <p className="text-md px-3 py-1 bg-yellow-400 rounded-full">
              ở ĐN chỗ t ngày mấy trăm ca mà họ vẫn đi như k có chi
            </p>
          </div>
          <div className="w-full flex flex-row justify-end mb-1">
            <p className="text-md px-3 py-1 bg-yellow-400 rounded-full">
              đi chơi đông tắc đường luôn mà :))
            </p>
          </div>
          <div className="w-full flex flex-row justify-start mb-1">
            <p className="text-md px-3 py-1 bg-slate-100 rounded-full">ừa</p>
          </div>
          <div className="w-full flex flex-row justify-start mb-1">
            <p className="text-md px-3 py-1 bg-slate-100 rounded-full">
              bựa ni
            </p>
          </div>
          <div className="w-full flex flex-row justify-start mb-1">
            <p className="text-md px-3 py-1 bg-slate-100 rounded-full">
              là rứa rồi
            </p>
          </div>
          <div className="w-full flex flex-row justify-start mb-1">
            <p className="text-md px-3 py-1 bg-slate-100 rounded-full">
              sống chung với dịch
            </p>
          </div>
          <div className="w-full flex flex-row justify-start mb-1">
            <p className="text-md px-3 py-1 bg-slate-100 rounded-full">
              chơ biết làm răng nữa m
            </p>
          </div>
          <div className="w-full flex flex-row justify-end mb-1">
            <p className="text-md px-3 py-1 bg-yellow-400 rounded-full">
              m đi quán đó là ở TX hay ĐH thế
            </p>
          </div>
          {/*  */}
        </div>
        <div className="relative flex justify-center my-4">
          <input
            className="w-full border-[1px] border-slate-400 rounded-xl py-1 pl-8 outline-none mx-4"
            placeholder="Tin nhắn..."
          ></input>
          <div className="absolute right-8 h-full flex items-center justify-center">
            <i className="fa-solid fa-paper-plane text-slate-400"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoxChat;
