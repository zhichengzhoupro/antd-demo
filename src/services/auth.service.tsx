import {serviceWithOutInterceptor, service} from "./common.service"


export const signIn = (user: {username: string, password: string }) => {

    return serviceWithOutInterceptor.post('/auth/signin', {...user});
}

export const signUp = (user: {username: string, password: string }) => {

    return serviceWithOutInterceptor.post('/auth/signup', {...user});
}


export const updateUserInfo = (userInfo: {username: string, password?: string, id: string, avatarUrl?: string, displayName: string}) => {

    return service.put('/auth/user', {...userInfo});
}

export const getUserInfo = () => {

    return service.get('/auth/user');
}