import React from "react";


import { Box, CssBaseline, Typography } from "@mui/material";
import CohortsList from "../components/CohortsList";

import './CohortsPage.css';


import Covariate_SideBarComponent from '../Covariate_sidebar/Covariate_SideBarComponent.js';
import Covariate_infoComponent from '../Covariate_details/Covariate_infoComponent.js';

import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Row,Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


const {api_body_info} = require('../cred_details.js');


function CovPage() {

  const [response, setResponse] = useState([])
  const [cavariateInfoResp, setcovariateInfoResp] = useState(null)
  const covariateInfoUpdate = useCallback(
    (covariateInfoResp) => {
      setcovariateInfoResp(covariateInfoResp)
    },
    [cavariateInfoResp],
  );

  useEffect(()=> {
    axios.post('http://127.0.0.1:5000/allcovariates',
    api_body_info
  )
    .then((res)=> {
      // console.log(res.data)
        setResponse(res.data);
      });
  },[]);





  return (
<div className="App">
         <Row>
        <Col sm={3}>
                    <header>
                              {/* <div className="text-center">
                                  <img src={brain} className="App-logo" alt="brain" />
                              </div> */}

                              <Accordion defaultActiveKey={['0']} alwaysOpen className="text-center">
                            {
                              Object.keys(response).length>0 ? Object.keys(response).map((result_cohorts,idx) => (<Covariate_SideBarComponent key={idx} keyval={idx} covariateName={result_cohorts} covariateResult={response[result_cohorts]} covariateInfoUpdate={covariateInfoUpdate}/>)) : null
                            }
                              </Accordion>          
                    </header>
            </Col>
        <Col sm={9} className="mr-auto ml-auto text-center">
        {
                cavariateInfoResp && 
                <Covariate_infoComponent covariateInfoReq={cavariateInfoResp.covName} covariateListInfoReq={cavariateInfoResp.covList}/>
        }
        </Col>
</Row>



          </div>

  );

}


export default CovPage;
