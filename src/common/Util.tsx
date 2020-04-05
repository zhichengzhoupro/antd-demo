const removeAuthentificationFromStorage =  () => {
    window.localStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('accessToken');
    window.localStorage.removeItem('userInfo');
    window.sessionStorage.removeItem('userInfo');
}

const removeUserInfoFromStorage =  () => {
    window.localStorage.removeItem('userInfo');
    window.sessionStorage.removeItem('userInfo');
    window.localStorage.removeItem('userInfo');
    window.sessionStorage.removeItem('userInfo');
}



const putUserInfoIntoStorage = (isRememberMe: boolean, userInfo: any) => {
    if(isRememberMe) {
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
}


const putTokenIntoStorage = (isRememberMe: boolean, token: string) => {
    if(isRememberMe) {
        window.localStorage.setItem('accessToken', token);
    } else {
        window.sessionStorage.setItem('accessToken', token);
    }

}

export  {
    putUserInfoIntoStorage,
    putTokenIntoStorage,
    removeAuthentificationFromStorage,
    removeUserInfoFromStorage
}