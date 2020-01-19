const initialState = {
    username: ''
}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'CACHE_USERNAME':
            return {
                username: action.payload
            }
        case 'SIGN_OUT':
            return {
                username: ''
            }
        default:
            return state;
    }
}