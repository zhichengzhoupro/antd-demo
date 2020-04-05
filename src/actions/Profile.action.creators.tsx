import ActionType from "./Action.types";
import {storage, firebase} from '../firebase'
import {AuthService} from '../services/service'
import {putUserInfoIntoStorage, removeUserInfoFromStorage} from '../common/Util'
import ActionsDispatcher from "./index";
import {message} from "antd";

export const uploadAvatar = (file: any) => {
    return (dispatch: any) => {

        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            //progress
            (snapshot: any) => {
                dispatch(startUploadAvatar());
            },
            // error
            (error:any) => {
                dispatch(uploadAvatarFailed())
            },
            () => {
                storage.ref('images').child(file.name).getDownloadURL().then((url: string) => {
                    dispatch(uploadAvatarSuccess(url));
                })
            }
        )
    }
};

 const startUploadAvatar = () => {
    return {
        type: ActionType.START_AVATAR_UPLOAD
    }
}

 const uploadAvatarFailed = () => {
    return {
        type: ActionType.AVATAR_UPLOAD_FAILED
    }
}

 const uploadAvatarSuccess = (avatarUrl: string) => {
    return {
        type: ActionType.AVATAR_UPLOAD_SUCCESS,
        payload: {
            avatarUrl
        }
    }
}

export const getUserInfo = () => {
     return (dispatch: any) => {
         dispatch(startGetUserInfo());
         AuthService.getUserInfo().then((data: any) => {
             dispatch(getUserInfoSuccess(data));
         }).catch((error) => {
             dispatch(getUserInfoFailed(error))
         })
     }
}

const startGetUserInfo = () => {
    return {
        type: ActionType.START_GET_USERINFO
    }
}

const getUserInfoFailed = (error: any) => {
    return {
        type: ActionType.GET_USERINFO_FAILED,
        payload: {
            error
        }
    }
};

const getUserInfoSuccess = (userInfo: any) => {
    return {
        type: ActionType.GET_USERINFO_SUCCESS,
        payload: {
            userInfo
        }
    }
}


export const updateUserInfo = (userInfo: any) => {
    return (dispatch: any) => {
        dispatch(startUpdateUserInfo());
        AuthService.updateUserInfo(userInfo)
            .then((data) => {
                dispatch(updateUserInfoSuccess(userInfo));
                removeUserInfoFromStorage();
                putUserInfoIntoStorage(true, userInfo);
            })
            .catch((error:any) => {
                dispatch(updateUserInfoFailed(error));
            })
    }
 };

const startUpdateUserInfo = () => {
    return {
        type: ActionType.START_UPDATE_USERINFO
    }
}

const updateUserInfoFailed = (error: any) => {
    return {
        type: ActionType.UPDATE_USERINFO_FAILED,
        payload: {
            error
        }
    }
};

const updateUserInfoSuccess = (userInfo: any) => {
    message.success('Profile has been saved')
    return {
        type: ActionType.UPDATE_USERINFO_SUCCESS,
        payload: {
            userInfo
        }
    }
}