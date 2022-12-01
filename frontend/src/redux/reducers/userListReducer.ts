import { IState as IProps } from "../../App";
import { UserActionType } from "../action-types";
import { UserAction } from "../actions/userAction";

const inittialPostList: IProps["userList"] = [];

const reducer = (state = inittialPostList, action: UserAction) => {
  switch (action.type) {
    case UserActionType.SET_USERS:
      return [...action.payload];
    case UserActionType.UPDATE_USER:
      console.log("!!!");
      return state.map((user, index) => {
        return user.id === action.payload.updateUserID
          ? action.payload.updateData
          : user;
      });
    case UserActionType.ADD_POST:
      return state.map((user, index) => {
        if (user.id === action.payload.author) {
          return {
            ...user,
            postList: [...user.postList, action.payload.id],
          };
        } else {
          return user;
        }
      });
    case UserActionType.MARK_POST:
      return state.map((user, index) => {
        if (user.id === action.payload.currentUserID) {
          return user.bookmarkList.includes(action.payload.postID)
            ? {
                ...user,
                bookmarkList: user.bookmarkList.filter(
                  (bookmarkItem) => bookmarkItem !== action.payload.postID
                ),
              }
            : {
                ...user,
                bookmarkList: [...user.bookmarkList, action.payload.postID],
              };
        } else {
          return user;
        }
      });
    case UserActionType.SEED_POST:
      return state.map((user, index) => {
        if (user.id === action.payload.currentUserID) {
          return user.seedList.includes(action.payload.postID)
            ? {
                ...user,
                seedList: user.seedList.filter(
                  (seedItem) => seedItem !== action.payload.postID
                ),
              }
            : {
                ...user,
                seedList: [...user.seedList, action.payload.postID],
              };
        } else {
          return user;
        }
      });
    case UserActionType.FLAG_POST:
      return state.map((user, index) => {
        if (user.id === action.payload.currentUserID) {
          return user.flagList.includes(action.payload.postID)
            ? {
                ...user,
                flagList: user.flagList.filter(
                  (flagItem) => flagItem !== action.payload.postID
                ),
              }
            : {
                ...user,
                flagList: [...user.flagList, action.payload.postID],
              };
        } else {
          return user;
        }
      });
    default:
      return state;
  }
};

export default reducer;
