import React from 'react';
import store,{persistor} from "./store";
import { Provider } from "react-redux";
import AppRoutes from "./routes"
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRoutes/>
    </PersistGate>
    </Provider>
  );
}

export default App;
