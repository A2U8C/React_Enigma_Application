import { Box, CssBaseline, Typography } from "@mui/material";
import CohortsList from "../components/CohortsList";

import '../containers/CohortsPage.css';

import './Cohort_Details_General.css';

import SideBarComponent from '../SideBar_Module/SideBarComponent.js';
import Cohort_infoComponent from '../Details_Module/Cohort_infoComponent.js';

import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Row,Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


const {api_body_info} = require('../cred_details.js');



function Cohort_Details_General(prop){


  const [state, setstate] = useState({cohortNameDets:null})


  const changeState = () => {  
      setstate({cohortNameDets:prop.cohortResult}); 
      prop.cohortInfoUpdate({cohortNameDets:prop.cohortResult})
     }; 



    if(prop.missing_val_param){
  return (
  <div className="CohortProjList_class_new no_arrow_class disabled">
        <Accordion.Item className="no_arrow_class" eventKey={prop.keyval}>
        <Accordion.Header>{prop.cohortResult}</Accordion.Header>
        
        </Accordion.Item>


        </div>)
    }
    else{
      return (
      <div className="CohortProjList_class_new">

      <Accordion.Item eventKey={prop.keyval} onClick={changeState} disabled>
      <Accordion.Header>{prop.cohortResult}</Accordion.Header>
    </Accordion.Item>


      </div>
    );
    }

    









}
export default Cohort_Details_General;