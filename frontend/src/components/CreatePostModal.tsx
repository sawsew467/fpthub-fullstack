import React, { useRef, useState } from "react";
import DEMO_USERS from "../data/usersDemo";
import plus from "../assets/images/plus.svg";
import smile from "../assets/images/smile.svg";
import file from "../assets/images/file.svg";
import image from "../assets/images/image.svg";
import { IState as AppInterface } from "../App";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { postActionCreators } from "../redux";
import { v4 as uuidv4 } from "uuid";
import { CardMedia } from "@mui/material";
import axios from "axios";

interface IProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePostModal({ setIsShow }: IProps) {
  const currentUser = DEMO_USERS.filter(
    (user) => user.id === JSON.parse(`${localStorage.getItem("currentUserID")}`)
  )[0];
  const [newPost, setNewPost] = useState<AppInterface["post"]>({
    id: uuidv4(),
    author: `${currentUser.id}`,
    createdAt: "",
    tag: "",
    counterSeed: 0,
    counterFlag: 0,
    content: "",
    attachments: "",
  });
  const dispath = useDispatch();
  const { addPost } = bindActionCreators(postActionCreators, dispath);
  const handleSubmit = async () => {
    try {
      // console.log("login", window.localStorage.getItem("token"));

      const token = window.localStorage.getItem("token");
      console.log(typeof token);
      
      // // const id = JSON.parse(`${window.localStorage.getItem("acountID")}`);
      // console.log(token)
      //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjcwNjc1NjM2LCJleHAiOjE2NzA2NzkyMzZ9.FFuH38LRPYqDbnCq62zousPqEtqJfB_71dPArgO9WmQ
      const options = {
        method: "post",
        url: "http://localhost:5000/posts",
        data: {
          tag: "da",
          content: "1 ngày của sinh viên đại học fpt",
          attachment: "english.jpg",
          accountId: 7,
        },
        headers: {
          Authorization:
          `Bearer ${token}`
        },
      };

      const response = await axios(options);
      console.log(response);
      // const response = await fetch("http://localhost:5000/posts", {
      //   method: "POST",
      //   headers: {
      //     Authorization:
      //       `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     tag: "da",
      //     content: "1 ngày của sinh viên đại học fpt",
      //     attachment: "english.jpg",
      //     accountId: 7,
      //   }),
      // });

      // const json = await response.json();
      // console.log(json);
      addPost(newPost);
      setIsShow(false);
    } catch (err) {
      console.log(err);
    }
  };
  const inputRef = useRef(null);
  function getBase64(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setNewPost({
        ...newPost,
        attachments: `${reader.result}`,
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  return (
    <>
      <div className="bg-[#00000080] fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-30">
        <div
          className="bg-white dark:bg-[#242526] dark:text-white700 p-5 sm:rounded-xl sm:min-w-[40rem] flex flex-col relative z-50"
          //   ref={popupRef}
        >
          <div
            className="w-7 h-7 flex justify-center items-center absolute rounded-full bg-slate-400 right-0 top-0 mt-5 mr-5 hover:scale-105 transition-all cursor-pointer"
            onClick={() => setIsShow(false)}
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </div>
          <h2 className="w-full text-center text-xl font-semibold border-b-[1px]">
            Tạo bài viết
          </h2>
          <div className="flex items-center py-5">
            <img
              src={currentUser.avatar}
              className="w-12 h-12 mr-3"
              alt={"avt"}
            ></img>
            <p className="text-lg font-semibold">{currentUser.name}</p>
          </div>
          <div className="h-[270px] overflow-y-scroll">
            <textarea
              className="dark:bg-[#242526] dark:placeholder:text-white700 dark:text-white700 w-full text-lg outline-none placeholder:text-slate-900 text-slate-900 border-solid	border-slate-500 dark:border-slate-700"
              placeholder="Nội dung bài viết..."
              cols={50}
              rows={5}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  content: e.target.value,
                })
              }
            ></textarea>
            {newPost.attachments && (
              <CardMedia
                component="img"
                image={newPost.attachments || ""}
                title="Title"
                className="w-7 h-[320px]"
                style={{
                  marginBottom: "8px",
                }}
              />
            )}
            <div className="flex justify-between items-center mt-3">
              <div
                className="flex items-center relative"
                //   ref={dropdownRef}
              >
                <p className="mr-3 inline overflow-hidden text-lg">
                  Chủ đề của bạn
                </p>
                {/* {!ischosen ? (
                  <img
                    className="mr-3"
                    src={plus}
                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                  />
                ) : (
                  <p
                    className={
                      "flex text-md tex-white py-1 px-4 text-white cursor-pointer rounded-full bg-" +
                      tag
                    }
                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                  >
                    {tag.toUpperCase()}
                  </p>
                )} */}
                {/* {showTagDropdown && (
                  <div className="absolute bottom-full left-full flex flex-col min-w-[15rem] bg-white drop-shadow-xl rounded-xl">
                    <div
                      className="py-3 px-5 hover:bg-gray-200 cursor-pointer rounded-tl-xl rounded-tr-xl"
                      onClick={handleLearning}
                    >
                      LEARNING - HỌC TẬP
                    </div>
                    <div
                      className="py-3 px-5 hover:bg-gray-200 cursor-pointer"
                      onClick={handleTutorial}
                    >
                      TUTORIAL - HƯỚNG DẪN
                    </div>
                    <div
                      className="py-3 px-5 hover:bg-gray-200 cursor-pointer"
                      onClick={handleEvent}
                    >
                      EVENT - SỰ KIỆN
                    </div>
                    <div
                      className="py-3 px-5 hover:bg-gray-200 cursor-pointer"
                      onClick={handleQa}
                    >
                      ASKING - HỎI ĐÁP
                    </div>
                    <div
                      className="py-3 px-5 hover:bg-gray-200 cursor-pointer rounded-bl-xl rounded-br-xl"
                      onClick={handleDisscusion}
                    >
                      DISSCUSION - THẢO LUẬN
                    </div>
                  </div>
                )} */}
              </div>
              <img src={smile} />
            </div>
            <div className="flex justify-between w-full p-5 mt-3 border-[1px] rounded-xl overflow-hidden">
              <p className="text-lg text-gray-500 dark:text-white700">
                Thêm vào bài viết
              </p>
              <div className="flex gap-5">
                <div className="relative">
                  <img className="" src={image} />
                  <input
                    ref={inputRef}
                    className="absolute top-0 left-0 opacity-0 file-input"
                    type="file"
                    onChange={(e: any) => getBase64(e)}
                  ></input>
                </div>
                <img src={file} />
              </div>
            </div>
          </div>
          <div className="w-full pt-5 flex justify-center">
            {newPost.content !== "" ? (
              <button
                className="w-1/2 mx-auto px-3 py-2 bg-blue rounded-xl text-white text-lg hover:scale-105 transition-all dark:text-white700"
                onClick={handleSubmit}
              >
                Đăng bài
              </button>
            ) : (
              <button className="w-1/2 mx-auto px-3 py-2 bg-blue rounded-xl text-white text-lg hover:scale-105 transition-all dark:text-white700 opacity-50 cursor-not-allowed">
                Đăng bài
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePostModal;
