
import { Box, CssBaseline, Typography } from "@mui/material";
import CohortsList from "../components/CohortsList";

import './CohortsPage.css';

import SideBarComponent from '../SideBar_Module/SideBarComponent.js';
import Cohort_infoComponent from '../Details_Module/Cohort_infoComponent.js';

import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Row,Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


const {api_body_info} = require('../cred_details.js');


function CohortProjDetails() {

  const [response, setResponse] = useState([])
  const [cohortInfoResp, setcohortInfoResp] = useState(null)
  const cohortInfoUpdate = useCallback(
    (InfoResp) => {
      setcohortInfoResp(InfoResp)
    },
    [cohortInfoResp],
  );

  useEffect(()=> {
    axios.post('http://127.0.0.1:5000/cohorts',
    api_body_info
  )
    .then((res)=> {
      // console.log(res.data)
        setResponse(res.data);
      });
  },[]);



  console.log(response)
  var response2=[]
var available_cohorts=[]
var missing_cohorts=[]
if (Object.keys(response).length>0){
  available_cohorts=response.presentCohorts
  missing_cohorts=response.Missing
response2=[...response.presentCohorts,...response.Missing]
}

console.log(response2)



  return (
<div className="App">
      <Row>
              <Col sm={3}>
                Cohort Project Information
                          <header>

                                    <Accordion className="text-center">
                                    <Accordion.Item eventKey='012'>
                                    <Accordion.Header>Available Cohorts</Accordion.Header>
                                    <Accordion.Body>
                                    {/* <div>
                                      <h2>Available Cohorts</h2> */}
                                    <Accordion defaultActiveKey={['0']} alwaysOpen className="text-center">
                                    {
                                    available_cohorts.length>0 ? available_cohorts.map((result_cohorts,idx) => (<SideBarComponent key={idx} keyval={idx} missing_val_param={false} cohortResult={result_cohorts} cohortInfoUpdate={cohortInfoUpdate}/>)) : "No Cohort projects"
                                    }
                                    </Accordion>
                                    </Accordion.Body>
                                    </Accordion.Item>
                                    {/* </div> */}
                                    
                                    
                                    <Accordion.Item eventKey='234'>
                                    <Accordion.Header>Missing Cohorts</Accordion.Header>
                                    <Accordion.Body>
                                    {/* <div>
                                    <h2>Missing Cohorts</h2> */}
                                    <Accordion defaultActiveKey={['0']} alwaysOpen className="text-center disabled">
                                    {
                                    missing_cohorts.length>0 ? missing_cohorts.map((result_cohorts,idx) => (<SideBarComponent key={idx} keyval={idx} missing_val_param={true} cohortResult={result_cohorts} cohortInfoUpdate={cohortInfoUpdate}/>)) : "No Data Available"
                                    }
                                    </Accordion>
                                    </Accordion.Body>
                                    </Accordion.Item>

                                    {/* </div> */}

                                    </Accordion>
                                  

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

export default CohortProjDetails;
