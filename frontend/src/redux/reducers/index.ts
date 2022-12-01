import { combineReducers } from "redux";
import postListReducer from "./postListReducer";
import userListReducer from "./userListReducer";

const reducers = combineReducers({
  posts: postListReducer,
  users: userListReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
