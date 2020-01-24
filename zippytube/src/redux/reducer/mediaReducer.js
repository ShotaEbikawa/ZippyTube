const initialState = {
    results: [],
    video: [],
}

export const mediaReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_QUERY':
            return {
                ...state,
                results: action.payload
            }
        case 'GET_VIDEO':
            return {
                ...state,
                video: action.payload,
                comment: action.payload
            }
        default:
            return state;
    }
}