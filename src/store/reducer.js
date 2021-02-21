 const initialState = {
     accessToken : 'NONE',
     refreshToken: 'NONE',
     userName: 'NONE'
 }

const reducer = (state = initialState, action) => {
    if (action.type === 'addAccessRefreshToken'){
         if (state.accessToken === 'NONE') {
            state.accessToken = action.newAccessToken
            state.refreshToken = action.newRefreshToken
            state.userName = action.newUserName
         }
    }
    if (action.type === 'resetStore'){
        state.accessToken = 'NONE'
        state.refreshToken = 'NONE'
        state.userName = 'NONE'
    }
    return state
}

export default reducer;