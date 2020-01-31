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
        default:
            return state;
    }
}