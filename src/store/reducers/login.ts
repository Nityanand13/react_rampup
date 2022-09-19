export const initialState:InitialLoginState = {
    token:null,
    userLoggedIn:false,
    userLoggingIn:false,
    error:'',
    userData:null
}

export const userReducer = (state = initialState, action:GenericAction) =>{
    // state= Object.assign({},state)
    switch(action.type){
        
        case "LOGIN_REQUEST":
            return {
                ...state,
                userLoggingIn:true
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                token:action.payload.token,
                userLoggedIn:true,
                userLoggingIn:false,
                error:'',
                userData:action.payload.userData
            }
        case "LOGIN_ERROR":
            
            localStorage.removeItem('token');
            return {
                ...state,
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