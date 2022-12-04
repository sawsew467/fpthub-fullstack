import React, { useRef, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import Header from "../parts/Header";
import { CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import { IState as AppInterface } from "../App";
import { State, userActionCreators } from "../redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { log } from "console";

function Settings() {
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const currentUser = userList.filter(
    (user) => user.id === JSON.parse(`${localStorage.getItem("currentUserID")}`)
  )[0];
  const [updatedUser, setUpdatedUser] =
    useState<AppInterface["user"]>(currentUser);
  const avatarRef = useRef(null);
  function getBase64(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = function () {
      console.log(reader.result);
      setUpdatedUser({
        ...updatedUser,
        avatar: `${reader.result}`,
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  const dispath = useDispatch();
  const { updateUsers } = bindActionCreators(userActionCreators, dispath);
  const handleSubmit = () => {
    updateUsers({
      updateUserID: currentUser.id,
      updateData: updatedUser,
    });
    // console.log(updatedUser);
  };
  return (
    <>
      <div className="light">
        <Header></Header>
        <Jumbotron></Jumbotron>
        <div className="bg-zinc-200 dark:bg-black dark:text-white700 z-10">
          <div className="mx-auto container lg-auto sm:p-7 p-2 flex sm:flex-row flex-col justify-between items-start gap-7">
            <div className="">
              <h2 className="text-xl font-semibold">
                Cập nhật thông tin tài khoản
              </h2>
              <div className="w-full flex sm:flex-row flex-col gap-5">
                <div className="sm:w-5/12">
                  <div className="flex sm:flex-row flex-col w-full gap-2 mt-2">
                    <div className="flex flex-col w-full">
                      <p className="text-lg">
                        Họ và tên<span className="text-red">*</span>
                      </p>
                      <input
                        className="text-lg py-1 px-3 rounded-xl border-[1px] bg-neutral-100 outline-none placeholder:text-slate-400 text-slate-400 border-solid	border-slate-500 dark:border-slate-700 dark:bg-[#3a3b3c]"
                        placeholder={updatedUser.name}
                        value={updatedUser.name}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            name: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-col mt-2">
                    <p className="text-lg">
                      Mô tả bản thân<span className="text-red">*</span>
                    </p>
                    <textarea
                      className="text-lg py-1 px-3 rounded-xl border-[1px] bg-neutral-100 outline-none placeholder:text-slate-400 text-slate-400 border-solid	border-slate-500 dark:border-slate-700 dark:bg-[#3a3b3c]"
                      placeholder={
                        updatedUser.description ?? "Mô tả bản thân..."
                      }
                      value={updatedUser.description}
                      cols={50}
                      rows={5}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="flex w-full flex-col gap-2 mt-2">
                    <div className="flex flex-col sm:w-full">
                      <p className="text-lg">
                        Email address<span className="text-red">*</span>
                      </p>
                      <input
                        className="text-lg py-1 px-3 rounded-xl border-[1px] bg-neutral-100 outline-none placeholder:text-slate-400 text-slate-400 border-solid	border-slate-500 dark:border-slate-700 dark:bg-[#3a3b3c] cursor-not-allowed"
                        placeholder={currentUser.email}
                        disabled
                      ></input>
                    </div>
                    <div className="flex flex-col relative">
                      <p className="text-lg">
                        Password<span className="text-red">*</span>
                      </p>
                      <div className="relative flex items-center right-0 bottom-0">
                        <input
                          className="w-full text-lg py-1 px-3 rounded-xl border-[1px] bg-neutral-100 outline-none placeholder:text-slate-400 text-slate-400 border-solid	border-slate-500 dark:border-slate-700 dark:bg-[#3a3b3c] cursor-not-allowed"
                          placeholder="******"
                          disabled
                        ></input>
                        <div className="absolute bottom-0 h-full flex items-center w-full justify-end">
                          <button className="h-full px-4 bg-yellow-500 text-white rounded-tr-xl rounded-br-xl border-[1px] border-l-0 border-slate-500">
                            Change password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-lg">
                    <span className="text-red">*</span>Bắt buộc
                  </p>
                  <button
                    className="mt-2 px-3 py-2 bg-blue rounded-xl text-white text-lg hover:scale-105 transition-all"
                    onClick={handleSubmit}
                  >
                    Lưu thông tin tài khoản
                  </button>
                </div>
                <div className="flex flex-col ml-2">
                  <p className="text-lg mt-2 ">
                    Ảnh đại diện<span className="text-red">*</span>
                  </p>
                  <CardMedia
                    image={updatedUser.avatar || ""}
                    title="Title"
                    className="w-[120px] h-[120px] my-2"
                  />
                  <input
                    ref={avatarRef}
                    className="file-input"
                    type="file"
                    onChange={(e) => getBase64(e)}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
