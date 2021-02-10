 const initialState = {
     accessToken : 'NONE',
     refreshToken: 'NONE',
 }

const reducer = (state = initialState, action) => {
    if (action.type === 'addAccessRefreshToken'){
         if (state.accessToken === 'NONE') {
            console.log('From reducer state: ', action.newAccessToken)
             state.accessToken = action.newAccessToken
         }
         if (state.refreshToken === 'NONE') {
            state.refreshToken = action.newRefreshToken
        }

    }
    return state
}

export default reducer;