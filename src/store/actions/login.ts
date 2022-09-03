import axios from 'axios';

export const loginRequest = () => ({type:"LOGIN_REQUEST"});
export const loginError = (err: string) => ({type:"LOGIN_ERROR",payload:err});
export const loginSuccess = (userData: Record<string, string>,token: string) => ({type:"LOGIN_SUCCESS",payload:{userData,token}});

export const loginUser = (personalAccessToked: string,username: string) => {
    return (dispatch: DispatchType) => {
        dispatch(loginRequest());
        const config = { headers: { Authorization: `Bearer ${personalAccessToked}`}};
        if(personalAccessToked===""||username===""){
            return
        }
        axios.get('https://api.github.com/user',config)
        .then(response => {
            const userData = response.data
            if(username !== userData.login) {
                dispatch(loginError('Either username or personal Access Token is wrong'));
            }
            else {
                dispatch(loginSuccess(userData,personalAccessToked));
            }
        })
        .catch(err => {
            dispatch(loginError('Either username or personal Access Token is wrong'));
        });
    }
}
