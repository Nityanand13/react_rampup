const initialState:InitialState = {
    token:localStorage.getItem('token'),
    userLoggedIn:!!localStorage.getItem('token'),
    userLoggingIn:false,
    userName:'',
    userId:'',
    recoverMsg:'',
    loginError:'',
    signupError:'',
    recoverError:''
}

export const userReducer = (state = initialState, action:GenericAction) =>{
    state= Object.assign({},state)
    switch(action.type){
        
        case "LOGIN_REQUEST":
            return {state,userLoggingIn:true,loginError:'',signupError:'',recoverError:''};
        case "LOGIN_SUCCESS":
            localStorage.setItem('token',action.payload.token);
            return {
                state,
                token:action.payload.token,
                userLoggedIn:true,
                userLoggingIn:false,
                loginError:'',
                signupError:'',
                recoverError:''
            }
        case "LOGIN_ERROR":
            localStorage.removeItem('token');
            return {
                state,
                token:null,
                userLoggingIn:false,
                loginError:action.payload,
                recoverError:'',
                signupError:''
            }
        default:
            return state;
    }
}