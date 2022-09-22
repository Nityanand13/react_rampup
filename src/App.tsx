import './App.css';
import store,{persistor} from "./store";
import { Provider } from "react-redux";
import AppRoutes from "./routes"
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  
  return (
   <div className='App'>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRoutes/>
    </PersistGate>
    </Provider>
   </div>
  );
}

export default App;
