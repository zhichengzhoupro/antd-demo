import {combineReducers} from 'redux'


import Notification from './Notification.reducer'
import Authentification from './Auth.reducer'

export  default combineReducers({
    Notification,
    Authentification
})