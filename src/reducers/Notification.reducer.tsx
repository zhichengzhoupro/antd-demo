import ActionTypes from '../actions/Action.types'

const initialState = {
    isLoading: false,
    list: [
        {
            id: 1,
            titile: " test notification title",
            description: "test notification description",
            isRed: false,
        },
        {
            id: 1,
            titile: " test notification title 2",
            description: "test notification description",
            isRed: true,
        }

    ]
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList = state.list.map(i => {
                if(i.id === action.payload.id) {
                    i.isRed = true
                }
                return i;
            });
            return {
                ...state,
                list: newList
            };
            break
        case ActionTypes.MARK_ALL_NOTIFICATIONS:
            const list = state.list.map(i => {
                i.isRed = true
                return i;
            });
            return {
                ...state,
                list: list
            };
        case ActionTypes.START_NOTIFICATION_LOADING:

            return {
                ...state,
                isLoading: true
            };
            break
        case ActionTypes.END_NOTIFICATION_LOADING:

            return {
                ...state,
                isLoading: false
            };
            break

        case ActionTypes.GET_NOTIFICATIONS:

            return {
                ...state,
                list: action.payload.list
            };
            break

        default:
            return state;

    }
}