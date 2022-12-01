import { IState as IProps } from "../../App";
import { PostActionType } from "../action-types";
import { PostAction } from "../actions/postAction";

const inittialPostList: IProps["postList"] = [];

const reducer = (state = inittialPostList, action: PostAction) => {
  switch (action.type) {
    case PostActionType.SET_POSTS:
      return [...action.payload];
    case PostActionType.ADD_POST:
      return [action.payload, ...state];
    // case ActionType.DELETE_POST:
    //   return state.filter((post, index) => index !== action.payload);
    // case ActionType.STAR_POST:
    //   return state.map((post, id) => {
    //     if (id === action.payload) {
    //       return post.isStared === false
    //         ? {
    //             ...post,
    //             isStared: true,
    //           }
    //         : {
    //             ...post,
    //             isStared: false,
    //           };
    //     } else {
    //       return post;
    //     }
    //   });
    default:
      return state;
  }
};

export default reducer;
