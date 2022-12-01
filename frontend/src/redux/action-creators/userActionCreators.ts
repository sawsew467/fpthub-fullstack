import { Dispatch } from "react";
import { IState as IProps } from "../../App";
import { UserActionType,  } from "../action-types";
import { UserAction } from "../actions/userAction";

export const setUsers = (userList: IProps["userList"]) => {    
    return (dispath: Dispatch<UserAction>) => {
        dispath({
            type: UserActionType.SET_USERS,
            payload: userList
        })
    }
}
export const updateUsers = (data:any) => {    
    return (dispath: Dispatch<UserAction>) => {
        dispath({
            type: UserActionType.UPDATE_USER,
            payload: data
        })
    }
}
export const addPost = (post: IProps["post"]) => {    
    return (dispath: Dispatch<UserAction>) => {
        dispath({
            type: UserActionType.ADD_POST,
            payload: post
        })
    }
}
export const markPost = (data:any) => {
    return (dispath: Dispatch<UserAction>) => {
        dispath({
            type: UserActionType.MARK_POST,
            payload: data
        })
    }
}
export const seedPost = (data:any) => {
    return (dispath: Dispatch<UserAction>) => {
        dispath({
            type: UserActionType.SEED_POST,
            payload: data
        })
    }
}
export const flagPost = (data:any) => {
    return (dispath: Dispatch<UserAction>) => {
        dispath({
            type: UserActionType.FLAG_POST,
            payload: data
        })
    }
}
// export const 