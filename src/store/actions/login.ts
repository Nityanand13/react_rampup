import axios from 'axios';

import { Dispatch } from 'redux';




export const incNumber = () =>{
    console.log("3333333333333333");
    return{
        type: "INCREMENT"
    }
}
export const decNumber = () =>({type: "DECREMENT"})

export const loginRequest = () => ({type:"LOGIN_REQUEST"});
export const loginError = (err: any) => ({type:"LOGIN_ERROR",payload:err});
export const loginSuccess = (userData: any) => ({type:"LOGIN_SUCCESS",payload:userData});

export const loginUser = (personalAccessToked: string,username: string) => {
    
    const config = {
      headers: { Authorization: `Bearer ${personalAccessToked}` }
    };
    return (dispatch: DispatchType) => {
        console.log("AAAAAAAAAA");
        
        dispatch(loginRequest());
        axios.get('https://api.github.com/user',config)
        .then(response => {
            const userData = response.data;
            if(userData.errorMsg)
                dispatch(loginError(userData.errorMsg));
            else
                dispatch(loginSuccess(userData));
        })
        .catch(err => {
            dispatch(loginError('Something went wrong'));
        });
    }
}