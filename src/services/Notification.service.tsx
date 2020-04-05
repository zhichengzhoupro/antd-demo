import {service} from "./common.service";

export const getNotifications = ({offset = 0, limited = 0}) => {

    return service.get('/notification', {
        params : {
            offset,
            limited
        }
    });
}