import * as NotificationAction from './Notification.action.creators'
import * as AuthentificationAction  from './Authentification.action.creators'
import * as ProfileAction  from './Profile.action.creators'

export default {
    notificationAction_markNotificationAsReadById: NotificationAction.markNotificationAsReadById,
    notificationAction_markAllNotifications: NotificationAction.markNotifications,
    notificationAction_startNotificationLoading: NotificationAction.startNotificationLoading,
    notificationAction_endNotificationLoading: NotificationAction.endNotificationLoading,
    notificationAction_getNotifications: NotificationAction.getNotifications,

    authAction_signIn: AuthentificationAction.signIn,
    authAction_signIn_success: AuthentificationAction.signSuccess,
    authAction_signOut: AuthentificationAction.signOut,

    profilAction_uploadAvatar: ProfileAction.uploadAvatar,
    profilAction_updateUserInfo: ProfileAction.updateUserInfo
}