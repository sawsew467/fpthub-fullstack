import { IState as AppInterface } from "../App";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { postActionCreators, State, userActionCreators } from "../redux";
import { useSelector } from "react-redux";

interface IProps {
  postInfo: AppInterface["post"];
}
function InteractionBar({ postInfo }: IProps) {
  const postList: AppInterface["postList"] = useSelector(
    (state: State) => state.posts
  );
  const userList: AppInterface["userList"] = useSelector(
    (state: State) => state.users
  );
  const currentUser = userList.filter(
    (user) => user.id === JSON.parse(`${localStorage.getItem("currentUserID")}`)
  )[0];
  const isSeed: boolean = currentUser.seedList.includes(postInfo.id);
  const isFlag: boolean = currentUser.flagList.includes(postInfo.id);
  const isBookmark: boolean = currentUser.bookmarkList.includes(postInfo.id);
  const dispath = useDispatch();
  const { markPost, seedPost, flagPost } = bindActionCreators(
    userActionCreators,
    dispath
  );
  const { setPosts } = bindActionCreators(postActionCreators, dispath);
  const bookmarkClick = () => {
    markPost({ currentUserID: currentUser.id, postID: postInfo.id });
  };
  const seedClick = () => {
    let newPostList = postList;
    if (isFlag) {
      newPostList = newPostList.map((post, index) => {
        if (post.id === postInfo.id) {
          return currentUser.flagList.includes(postInfo.id)
            ? {
                ...post,
                counterFlag: post.counterFlag - 1,
              }
            : {
                ...post,
                counterFlag: post.counterFlag + 1,
              };
        } else {
          return post;
        }
      });
      flagPost({ currentUserID: currentUser.id, postID: postInfo.id });
    }
    newPostList = newPostList.map((post, index) => {
      if (post.id === postInfo.id) {
        return currentUser.seedList.includes(postInfo.id)
          ? {
              ...post,
              counterSeed: post.counterSeed - 1,
            }
          : {
              ...post,
              counterSeed: post.counterSeed + 1,
            };
      } else {
        return post;
      }
    });
    seedPost({ currentUserID: currentUser.id, postID: postInfo.id });
    setPosts(newPostList);
  };

  const flagClick = () => {
    let newPostList = postList;
    if (isSeed) {
      newPostList = newPostList.map((post, index) => {
        if (post.id === postInfo.id) {
          return currentUser.seedList.includes(postInfo.id)
            ? {
                ...post,
                counterSeed: post.counterSeed - 1,
              }
            : {
                ...post,
                counterSeed: post.counterSeed + 1,
              };
        } else {
          return post;
        }
      });
      seedPost({ currentUserID: currentUser.id, postID: postInfo.id });
    }
    newPostList = newPostList.map((post, index) => {
      if (post.id === postInfo.id) {
        return currentUser.flagList.includes(postInfo.id)
          ? {
              ...post,
              counterFlag: post.counterFlag - 1,
            }
          : {
              ...post,
              counterFlag: post.counterFlag + 1,
            };
      } else {
        return post;
      }
    });
    flagPost({ currentUserID: currentUser.id, postID: postInfo.id });
    setPosts(newPostList);
  };
  return (
    <>
      <div className="sm:pt-4 pt-2 border-t-[1px] flex ">
        {isSeed ? (
          <div
            className="w-1/4 flex justify-center items-center border-r-[1px] cursor-pointer"
            onClick={seedClick}
          >
            <i className="fa-solid fa-seedling text-lg mr-3 text-green"></i>
            <p className="text-lg text-green hidden sm:inline">Tặng mầm</p>
          </div>
        ) : (
          <div
            className="w-1/4 flex justify-center items-center border-r-[1px] cursor-pointer"
            onClick={seedClick}
          >
            <i className="fa-solid fa-seedling text-lg mr-3 text-slate-400"></i>
            <p className="text-lg text-slate-400 hidden sm:inline">Tặng mầm</p>
          </div>
        )}
        {isFlag ? (
          <div
            className="w-1/4 flex justify-center items-center border-r-[1px] cursor-pointer"
            onClick={flagClick}
          >
            <i className="fa-solid fa-flag text-lg mr-3 text-red"></i>
            <p className="text-lg text-red hidden sm:inline">Cắm cờ</p>
          </div>
        ) : (
          <div
            className="w-1/4 flex justify-center items-center border-r-[1px] cursor-pointer"
            onClick={flagClick}
          >
            <i className="fa-solid fa-flag text-lg mr-3 text-slate-400"></i>
            <p className="text-lg text-slate-400 hidden sm:inline">Cắm cờ</p>
          </div>
        )}
        <div
          className="w-1/4 flex justify-center items-center border-r-[1px] cursor-pointer"
          // onClick={commentClick}
        >
          <i className="fa-solid fa-comment text-lg mr-3 text-slate-400 dark:text-[#94a3b8]"></i>
          <p className="text-lg text-slate-400 dark:text-[#94a3b8] hidden sm:inline">
            Bình luận
          </p>
        </div>
        {isBookmark ? (
          <div
            className="w-1/4 flex justify-center items-center cursor-pointer"
            onClick={bookmarkClick}
          >
            <i className="fa-solid fa-bookmark text-lg mr-3 text-blue"></i>
            <p className="text-lg text-blue hidden sm:inline">Lưu bài</p>
          </div>
        ) : (
          <div
            className="w-1/4 flex justify-center items-center cursor-pointer"
            onClick={bookmarkClick}
          >
            <i className="fa-solid fa-bookmark text-lg mr-3 text-slate-400"></i>
            <p className="text-lg text-slate-400 hidden sm:inline">Lưu bài</p>
          </div>
        )}
      </div>
    </>
  );
}

export default InteractionBar;
