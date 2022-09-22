type GenericAction = {
  type: string;
  payload?: any;
};

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
