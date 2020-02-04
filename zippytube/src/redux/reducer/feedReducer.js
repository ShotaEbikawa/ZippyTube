const initialState = {
    feeds: [],
}

export const feedReducer = (state=initialState,action) => {
    switch(action.type) {
        case 'GET_FEED': 
            return {
                ...state,
                feeds: action.payload,
            }
        case 'SIGN_OUT':
            return {
                ...state,
                feeds:[],
            }
        default:
            return state;
    }
}