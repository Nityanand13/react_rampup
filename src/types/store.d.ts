
// Generic action type
type GenericAction = {
  type: string;
  payload?: any;
};

// Action dispatch type ek function h jo ek argument accept krega jiska type GenericAction hai aure return bhi GenericAction yhi krega
type DispatchType = (args: GenericAction) => GenericAction;

type InitialLoginState = {
  token:string|null,
  userLoggedIn:boolean,
  userLoggingIn:boolean,
  error:string,
  userData:Record<string, string>|null
}

type GlobalState = {
    user: InitialLoginState
}