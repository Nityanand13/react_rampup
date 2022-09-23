import * as Constants from '../../constants/constants'

const initialState:InitialLoginState = {
    token:null,
    userLoggedIn:false,
    userLoggingIn:false,
    error:'',
    userData:null
}

export const userReducer = (state = initialState, action:GenericAction) =>{
    switch(action.type){
        case Constants.LOGIN_REQUEST:
            return {
                userLoggingIn:true
            };
        case Constants.LOGIN_SUCCESS:
            return {
                token:action.payload.token,
                userLoggedIn:true,
                userLoggingIn:false,
                error:'',
                userData:action.payload.userData
            }
        case Constants.LOGIN_ERROR:
            return {
                token:null,
                userLoggedIn:false,
                userLoggingIn:false,
                error:action.payload,
                userData:null
            }
        default:
            return state;
    }
}
