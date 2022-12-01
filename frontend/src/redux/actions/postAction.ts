import { PostActionType } from "../action-types/index";
import { IState as IProps } from "../../App";
// import{ActionType}

interface SetPostsAction {
  type: PostActionType.SET_POSTS;
  payload: IProps["postList"];
}
interface AddPostAction {
  type: PostActionType.ADD_POST;
  payload: IProps["post"];
}
interface DeletePostAction {
  type: PostActionType.DELETE_POST;
  payload: string;
}
// interface MarkPostAction {
//   type: ActionType.MARK_POST;
//   payload: string;
// }

export type PostAction = AddPostAction | SetPostsAction | DeletePostAction;
// MarkPostAction ;
