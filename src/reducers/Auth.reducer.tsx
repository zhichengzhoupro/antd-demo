import ActionTyps from '../actions/Action.types'
import Immutable from 'immutable'

const isSignIn = (Boolean('accessToken' in window.localStorage ) || Boolean('accessToken' in window.sessionStorage ));

const userInfo = () => {
    if(Boolean('userInfo' in window.localStorage )) {
       return JSON.parse(window.localStorage['userInfo'])
    }
    if(Boolean('userInfo' in window.sessionStorage )) {
        return JSON.parse(window.sessionStorage['userInfo'])
    }
    return {}
}

interface AuthentificationState {
    id?: string,
    username?: string,
    role?: string,
    avatarUrl?:string,
    displayName?: string

    isSignIn: boolean,
    isSignInLoading: boolean,

    avatarUploading?: boolean,
    avatarUploadError?: any
    avatarChanged?: boolean,

    userInfoLoading?: boolean,
    userInfoLoaded?: boolean,
    userInfoLoadError?: any

    isSignUp: boolean,
    isSignUpLoading: boolean,

}

const initState: any = Immutable.fromJS({
    ...userInfo(),

    isSignIn: isSignIn,
    isSignInLoading: false,

    avatarUploading: false,
    avatarUploadError: '',
    avatarChanged: false,

    userInfoLoading: false,
    userInfoLoaded: false,
    userInfoLoadError: ''
})


export default (state:any = initState, action: any) => {
    switch (action.type) {
        case ActionTyps.SIGN_IN_SUCCESS:
            const {id, username, avatarUrl, displayName, role, password} = action.payload.userInfo;
            return state
                .set('id', id)
                .set('username', username)
                .set('avatarUrl', avatarUrl)
                .set('displayName', displayName)
                .set('role', role)
                .set('password', password)
                .set('isSignIn', true)
                .set('isSignInLoading', false);
            break;
        case ActionTyps.START_SIGN_IN:
            return state
                .set('isSignIn', false)
                .set('isSignInLoading', true);
            break;
        case ActionTyps.SIGN_IN_FAIL:
            return state
                .set('isSignIn', false)
                .set('isSignInLoading', false);
            break;
        case ActionTyps.SIGN_OUT:
            return state
                .set('isSignIn', false)
                .set('isSignInLoading', false);
            break;
        case ActionTyps.START_AVATAR_UPLOAD:
            return state
                .set('avatarUploading', true);
            break;
        case ActionTyps.AVATAR_UPLOAD_SUCCESS:
            return state
                .set('avatarUrl', action.payload.avatarUrl)
                .set('avatarUploading', false)
                .set('avatarChanged', true)
            break;

        case ActionTyps.AVATAR_UPLOAD_SUCCESS:
            return state
                .set('avatarUploadError', 'error')
                .set('avatarUploading', false);
            break;
        case ActionTyps.START_GET_USERINFO:
            return state
                .set('userInfoLoading', true)
                .set('userInfoLoaded', false)
                .set('userInfoLoadError', '');
            break
        case ActionTyps.GET_USERINFO_SUCCESS: {
            const {id, username, avatarUrl, displayName, role, password} = action.payload.userInfo;
            return state
                .set('id', id)
                .set('username', username)
                .set('avatarUrl', avatarUrl)
                .set('displayName', displayName)
                .set('role', role)
                .set('password', password)
                .set('userInfoLoading', false)
                .set('userInfoLoaded', true)
                .set('userInfoLoadError', '')
            break;
        }

        case ActionTyps.GET_USERINFO_FAILED:
            return state
                .set('userInfoLoading', false)
                .set('userInfoLoaded', true)
                .set('userInfoLoadError', action.payload.error)
            break;


        case ActionTyps.START_UPDATE_USERINFO:
            return state
                .set('userInfoLoading', true)
                .set('userInfoLoaded', false)
                .set('userInfoLoadError', '')
            break
        case ActionTyps.UPDATE_USERINFO_SUCCESS: {
            const {id, username, avatarUrl, displayName, role, password} = action.payload.userInfo;
            return state
                .set('id', id)
                .set('username', username)
                .set('avatarUrl', avatarUrl)
                .set('displayName', displayName)
                .set('role', role)
                .set('password', password)
                .set('userInfoLoading', false)
                .set('userInfoLoaded', true)
                .set('userInfoLoadError', '')
                .set('avatarChanged', false)
            break;
        }


        case ActionTyps.UPDATE_USERINFO_FAILED:

            return state
                .set('userInfoLoading', false)
                .set('userInfoLoaded', true)
                .set('userInfoLoadError', action.payload.error)
            break;
        default:
            return state;
    }
}