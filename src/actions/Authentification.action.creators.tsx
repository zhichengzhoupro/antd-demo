import ActionType from "./Action.types";
import {AuthService} from '../services/service'
import {removeAuthentificationFromStorage, putTokenIntoStorage, putUserInfoIntoStorage} from'../common/Util'


export const signIn = (user :{username: string, password: string, remember: boolean}) => {
    return (dispatch: any) => {
        dispatch(startSignIn());
        AuthService
            .signIn(user)
            .then((resp:any) => {
                if(resp.status) {
                    dispatch(signSuccess({
                        ...resp.data,
                        remember : user.remember
                    }));

                    putTokenIntoStorage(user.remember, resp.data.accessToken);
                    putUserInfoIntoStorage(user.remember, resp.data.userInfo);
                }
            }).catch(() => {
            dispatch(signInFailed());
        }).finally(() => {

        });
    }
}

const startSignIn = () => {
    return {
        type: ActionType.START_SIGN_IN
    }
}

export const signSuccess = (data:any) => {
    return {
        type: ActionType.SIGN_IN_SUCCESS,
        payload: {
            accessToken : data.accessToken,
            userInfo: data.userInfo

        }
    }
}

const signInFailed = () => {
    removeAuthentificationFromStorage();
    return {
        type: ActionType.SIGN_IN_FAIL
    }
}

export const signOut = () => {
    removeAuthentificationFromStorage();
    return {
        type: ActionType.SIGN_OUT
    }
}





