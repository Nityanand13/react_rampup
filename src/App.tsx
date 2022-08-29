import React from 'react';
import {useState, useEffect} from 'react';
import {LoginPage,HomePage} from './component/forms/login'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store,{persistor} from "./store";
import { Provider } from "react-redux";
import AppRoutes from "./routes"
// delays the response jbtk hmara state vo local storage me save naa ho jaye aur vaha se retrieve naa ho jaye
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  console.log("66666666666666");
  
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

// type define of use state, funtion, ,login UI 
// use arrao function of ES6 
// component-type, functiontype 
// BEM architechture 
// 7-1 Architecture 
// SCSS-- Mixins 
// U can use react bootstrap
// Eslint explore, image shi krna h 



// email ,password ka border radius reduce
// change the box shadow according to the themes
// focus pe box shadow normally nhi
// box shadow 3d effect in card

