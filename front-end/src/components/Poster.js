import React, { useState, useRef } from "react";
import plus from "../assets/images/plus.svg";
import smile from "../assets/images/smile.svg";
import file from "../assets/images/file.svg";
import image from "../assets/images/image.svg";
import useClickOutside from "../customHooks/useClickedOutside";
import { useDispatch, useSelector } from "react-redux";
import { updatePostList } from "../redux/actions";
import { createOnePost, getAllPosts } from "../apis/postApis";

function Poster(props) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.localStorage.getItem("currentUser"))
  );

  const [isShow, setIsShow] = useState(true);
  const [ischosen, setIsChosen] = useState(false);
  const [tag, setTag] = useState("");
  const [active, setActive] = useState(false);
  const sendData = () => {
    props.parentsCallback(isShow);
  };
  isShow === false && sendData();
  const handleLearning = () => {
    setShowTagDropdown(false);
    setIsChosen(true);
    setTag("learning");
    setActive(true);
  };
  const handleTutorial = () => {
    setShowTagDropdown(false);
    setIsChosen(true);
    setTag("tutorial");
    setActive(true);
  };
  const handleEvent = () => {
    setShowTagDropdown(false);
    setIsChosen(true);
    setTag("event");
    setActive(true);
  };
  const handleQa = () => {
    setShowTagDropdown(false);
    setIsChosen(true);
    setTag("asking");
    setActive(true);
  };
  const handleDisscusion = () => {
    setShowTagDropdown(false);
    setIsChosen(true);
    setTag("discussion");
    setActive(true);
  };
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setShowTagDropdown(false));
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  useClickOutside(popupRef, () => setShowPopup(false));
  // input from user
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handleSubmit = async () => {
   
    const newPost = {
      content: text,
      counterSeed: 0,
      counterFlag: 0,
      flagedList: [],
      seededList: [],
    };
    await createOnePost(newPost);
    const newPosts = await getAllPosts();
    dispatch(updatePostList(newPosts));
    setIsShow(false);
  };
  return (
    <>
      <div className="bg-[#00000080] fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-30">
        <div
          className="bg-white dark:bg-[#242526] dark:text-white700 p-5 sm:rounded-xl sm:min-w-[40rem] flex flex-col relative z-50"
          ref={popupRef}
        >
          <div
            className="w-7 h-7 flex justify-center items-center absolute rounded-full bg-slate-400 right-0 top-0 mt-5 mr-5 hover:scale-105 transition-all cursor-pointer"
            onClick={() => setIsShow(false)}
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </div>
          <h2 className="w-full text-center text-xl font-semibold pb-5 border-b-[1px]">
            Tạo bài viết
          </h2>
          <div className="py-5">
            <div className="flex items-center pb-5">
              <img
                src={currentUser.avatar}
                className="w-12 h-12 mr-3"
                alt={"avt"}
              ></img>
              <p className="text-lg font-semibold">{currentUser.name}</p>
            </div>
            <textarea
              type="text"
              className="dark:bg-[#242526] dark:placeholder:text-white700 dark:text-white700 w-full text-lg outline-none placeholder:text-slate-900 text-slate-900 border-solid	border-slate-500 dark:border-slate-700"
              placeholder="Nội dung bài viết..."
              cols="50"
              rows="5"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            {/* <div className="h-40">
              <CKEditor
                height="300"
                editor={ClassicEditor}
                data={PostData}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setPostData(data);
                }}
              />
            </div> */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center relative" ref={dropdownRef}>
                <p className="mr-3 inline overflow-hidden text-lg">
                  Chủ đề của bạn
                </p>
                {!ischosen ? (
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
                )}
                {showTagDropdown && (
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
                )}
              </div>
              <img src={smile} />
            </div>
            <div className="flex justify-between w-full p-5 mt-3 border-[1px] rounded-xl">
              <p className="text-lg text-gray-500 dark:text-white700">
                Thêm vào bài viết
              </p>
              <div className="flex gap-5">
                <img src={image} />
                <img src={file} />
              </div>
            </div>
          </div>
          {text !== "" ? (
            <button
              className="w-1/2 mx-auto px-3 py-2 bg-blue rounded-xl text-white text-lg hover:scale-105 transition-alldark:text-white700"
              onClick={handleSubmit}
            >
              Đăng bài
            </button>
          ) : (
            <button className="w-1/2 mx-auto px-3 py-2 bg-blue rounded-xl text-white text-lg hover:scale-105 transition-alldark:text-white700 opacity-50 cursor-not-allowed">
              Đăng bài
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Poster;
