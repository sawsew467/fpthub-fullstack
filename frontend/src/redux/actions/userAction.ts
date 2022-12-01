import { UserActionType } from "../action-types/index";
import { IState as IProps } from "../../App";

interface SetUsersAction {
  type: UserActionType.SET_USERS;
  payload: IProps["userList"];
}
interface UpdateUsersAction {
  type: UserActionType.UPDATE_USER;
  payload: {
    updateUserID: string;
    updateData: IProps["user"]
  };
}
interface AddPostAction {
  type: UserActionType.ADD_POST;
  payload: IProps["post"];
}

interface MarkPostsAction {
  type: UserActionType.MARK_POST;
  payload: {
    currentUserID: string;
    postID: string;
  };
}
interface SeedPostsAction {
  type: UserActionType.SEED_POST;
  payload: {
    currentUserID: string;
    postID: string;
  };
}
interface FlagPostsAction {
  type: UserActionType.FLAG_POST;
  payload: {
    currentUserID: string;
    postID: string;
  };
}

export type UserAction =
  | SetUsersAction
  | MarkPostsAction
  | SeedPostsAction
  | FlagPostsAction
  | UpdateUsersAction
  | AddPostAction;
// MarkPostAction ;
