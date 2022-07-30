import React from 'react';
import {useState, useEffect} from 'react';
import LoginPage from './component/forms/login'
import './App.css';

let name: number= 65;

function App() {
  const [count, setCount]=useState(0)

  // useEffect(()=>{

  // });

  return (
   <div>
    <LoginPage />
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

