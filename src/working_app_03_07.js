 


import logo from './logo.svg';
import './App.css';
import SideBarComponent from './SideBarComponent.js';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [response, setResponse] = useState([])

  useEffect(()=> {
    axios.get('https://web-tech-assignment8.wn.r.appspot.com/api/search/all_businessData?keyword=Donuts&distance=10&category=food&latitude=34.0522342&longitude=-118.2436849')
    .then((res)=> {
        setResponse(res.data.response);
      });
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {
          //response.alias? response.alias.map(( aliasval )=><SideBarComponent cohortResult={aliasval}/>):null


          response.length>0 ? response.map((business_val) => (<SideBarComponent cohortResult={business_val}/>)) : null


           //<SideBarComponent cohortResult={response}/>
        }
      </header>
    </div>
  );
}

export default App;
