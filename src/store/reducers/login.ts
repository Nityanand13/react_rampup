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
            console.log("SuccessSuccessSuccessSuccess555");
            console.log(
                JSON.stringify({token:action.payload.token,
                userLoggedIn:true,
                userLoggingIn:false,
                error:'',
                userData:action.payload.userData})
            );
            
            // localStorage.setItem('token',action.payload.token);
            return {
                // purani state ki feild automatic aa jati h
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
                // make userData as object
            }
        default:
            return state;
    }
}