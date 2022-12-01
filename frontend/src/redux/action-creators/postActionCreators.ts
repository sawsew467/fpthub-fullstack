import { Dispatch } from "react";
import { IState as IProps } from "../../App";
import { PostActionType,  } from "../action-types";
import { PostAction } from "../actions/postAction";

export const setPosts = (postList: IProps["postList"]) => {    
    return (dispath: Dispatch<PostAction>) => {
        dispath({
            type: PostActionType.SET_POSTS,
            payload: postList
        })
    }
}
export const addPost = (post: IProps["post"]) => {
    return (dispath: Dispatch<PostAction>) => {
        dispath({
            type: PostActionType.ADD_POST,
            payload: post
        })
    }
}
export const deletePost = (id: string) => {
    return (dispath: Dispatch<PostAction>) => {
        dispath({
            type: PostActionType.DELETE_POST,
            payload: id
        })
    }
}
// export const markPost = (id: string) => {
//     return (dispath: Dispatch<PostAction>) => {
//         dispath({
//             type: ActionType.MARK_POST,
//             payload: id
//         })
//     }
// }