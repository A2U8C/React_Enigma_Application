import brain from './brain.svg';
import './App.css';
import SideBarComponent from './SideBar_Module/SideBarComponent.js';
import Cohort_infoComponent from './Details_Module/Cohort_infoComponent.js';


import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Container,Row,Col } from 'react-bootstrap';

function App() {

  const [response, setResponse] = useState([])

  const [cohortInfoResp, setcohortInfoResp] = useState(null)


  const cohortInfoUpdate = useCallback(
    (InfoResp) => {
      setcohortInfoResp(InfoResp)
    },
    [cohortInfoResp],
  );


  useEffect(()=> {
    axios.post('http://127.0.0.1:5000/cohorts',{ 
      "name" : "Proj ENIGMA3 Cortical GWAS",
      "endpoint_id" : "https://enigma-endpoint.disk.isi.edu/enigma_dev/sparql"
  })
    .then((res)=> {
      // console.log(res.data)
        setResponse(res.data);
      });
  },[]);






  return (
    <div className="App">
            
          
      <Row>
        <Col sm={3}>
                    <header className="App-header">
                              <div className="text-center">
                                  <img src={brain} className="App-logo" alt="brain" />
                              </div>
                            {
                              response.length>0 ? response.map((result_cohorts,idx) => (<SideBarComponent key={idx} cohortResult={result_cohorts} cohortInfoUpdate={cohortInfoUpdate}/>)) : null
                            }
                    </header>
            </Col>
        <Col sm={9} className="mr-auto ml-auto text-center">
          
        {
                cohortInfoResp && 
                <Cohort_infoComponent cohortInfoReq={cohortInfoResp.projName} projectInfoReq={cohortInfoResp.cohortName}/>
        }
       
          

        </Col>
      </Row>
      
    </div>
  );
}

export default App;
