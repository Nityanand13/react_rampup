
// Generic action type
type GenericAction = {
  type: string;
  payload?: any;
};

// Action dispatch type ek function h jo ek argument accept krega jiska type GenericAction hai aure return bhi GenericAction yhi krega
type DispatchType = (args: GenericAction) => GenericAction;

type InitialState = {
    token: string|null;
    userLoggedIn: boolean;
    userLoggingIn: boolean;
    userName: string;
    userId: string;
    recoverMsg: string;
    loginError: string;
    signupError: string;
    recoverError: string;
}

type GlobalState = {
    user: InitialState
}