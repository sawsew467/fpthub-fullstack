import React from "react";
import { CardMedia } from "@mui/material";

function Friend(props: any) {
  return (
    <>
      <div className="w-full flex px-4 py-2 hover:bg-slate-100 cursor-pointer">
        <div className="w-[54px] h-[54px] mr-4">
          <CardMedia
            component="img"
            image={props.info.avatar || ""}
            title="Title"
            className="w-[54px] h-[54px] rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-lg font-medium leading-[18px]">
            {props.info.name}
          </p>
          <p>Last message...</p>
        </div>
      </div>
    </>
  );
}

function DirecList() {
  const direcList = [
    {
      id: "00001",
      name: "Nguyễn Nhật Anh",
      avatar:
        "https://icons-for-free.com/download-icon-business+costume+male+man+office+user+icon-1320196264882354682_512.png",
    },
    {
      id: "00002",
      name: "Phùng Vũ An Quân",
      avatar: "https://cdn-icons-png.flaticon.com/512/206/206853.png",
    },
    {
      id: "00003",
      name: "Nguyễn Quang Nhật Minh",
      avatar:
        "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/301087925_759293918611403_4145865900551381028_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=AL8zC9BQ0LYAX9OsuZq&_nc_oc=AQnCMt8ozzKahnXrkqoA427Jazs4rXAUUn8ZJstLzSdMwv11tqIOIG5u1qrsvnHNp3w&_nc_ht=scontent.fdad3-6.fna&oh=00_AfAYe6NTR6vIyCflZrMXP-Zhm5yXAcIt7dK13O__DDXifQ&oe=6390EFA0",
    },
  ];
  return (
    <>
      <div className="w-1/3 h-full flex flex-col border-[1px] border-slate-400 rounded-tl-xl rounded-bl-xl">
        <div className="w-full text-lg font-medium text-center border-b-[1px] border-slate-400 py-2">
          Trò chuyện
        </div>
        <div className="relative flex justify-center mt-2">
          <input
            className="w-full border-[1px] border-slate-400 rounded-xl py-1 pl-8 outline-none mx-4"
            placeholder="Tìm kiếm liên hệ..."
          ></input>
          <div className="absolute left-0 h-full flex items-center justify-center">
            <i className="fa-solid fa-magnifying-glass text-slate-400 ml-7"></i>
          </div>
        </div>
        <div className="w-full flex flex-col mt-2 items-center">
          {/* {direcList.map((friend, index) => (
            <Friend info={friend}></Friend>
          ))} */}
          <div className="w-full flex px-4 py-2 hover:bg-slate-100 cursor-pointer">
            <div className="w-[54px] h-[54px] mr-4">
              <CardMedia
                component="img"
                image={direcList[0].avatar || ""}
                title="Title"
                className="w-[54px] h-[54px] rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium leading-[18px]">
                {direcList[0].name}
              </p>
              <p>Last message...</p>
            </div>
          </div>
          <div className="w-full flex px-4 py-2 bg-slate-200 cursor-pointer">
            <div className="w-[54px] h-[54px] mr-4">
              <CardMedia
                component="img"
                image={direcList[1].avatar || ""}
                title="Title"
                className="w-[54px] h-[54px] rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium leading-[18px]">
                {direcList[1].name}
              </p>
              <p>Last message...</p>
            </div>
          </div>
          <div className="w-full flex px-4 py-2 hover:bg-slate-100 cursor-pointer">
            <div className="w-[54px] h-[54px] mr-4">
              <CardMedia
                component="img"
                image={direcList[2].avatar || ""}
                title="Title"
                className="w-[54px] h-[54px] rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium leading-[18px]">
                {direcList[2].name}
              </p>
              <p>Last message...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DirecList;
