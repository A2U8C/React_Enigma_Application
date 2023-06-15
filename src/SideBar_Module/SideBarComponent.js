
import './SideBarComponent.css';
import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import CohortProjects from './CohortProjects.js';
import CohortProjectLists from './CohortProjectLists.js';


import Accordion from 'react-bootstrap/Accordion';

const {api_body_info} = require('../cred_details.js');



function SideBarComponent(prop) {

  const [isVisible, setvisibility] = useState(false)

  
  const [response, setResponse] = useState([])

  const invokeCollapse = () => {

    axios.post(api_body_info['backEndURL']+'cohorts/'+prop.cohortResult+'/projects',
    api_body_info
  )
  .then((res)=> {
    // console.log(res.data)
      setResponse(res.data);
      setvisibility(!isVisible)
    });

    // return isVisible
  }

    // return (
    //       <div className="CohortProjList_class">
    //         <div onClick={invokeCollapse} className="CohortProjList_class_head">
    //         <span>{'\u2B24'}</span>{prop.cohortResult.cohortName.value}
            
    //         </div>

    //         <Collapse in={isVisible} className="">
    //           <div>

    //             {/* <CohortProjects data={prop.cohortResult.cohortName.value} cohortInfoUpdate={prop.cohortInfoUpdate}/> */}
    //             {/* <CohortProjectLists data={prop.cohortResult.cohortName.value} cohortInfoUpdate={prop.cohortInfoUpdate}/> */}

    //             {response.length>0 ? response.map((cohort_projects) => (<CohortProjectLists key={prop.cohortResult.cohortName.value} projectsList={cohort_projects} projectName={prop.cohortResult.cohortName.value} cohortInfoUpdate={prop.cohortInfoUpdate}/>)) : null}
        

    //           </div>
    //       </Collapse>
            
    //       </div>
    //     );



    if(prop.missing_val_param){
  return (
  <div className="CohortProjList_class_new disabled">
        <Accordion.Item eventKey={prop.keyval} >
        <Accordion.Header onClick={invokeCollapse}>{prop.cohortResult}</Accordion.Header>
        
        </Accordion.Item>


        </div>)
    }
    else{
      return (
      <div className="CohortProjList_class_new">

      <Accordion.Item eventKey={prop.keyval}>
      <Accordion.Header onClick={invokeCollapse}>{prop.cohortResult}</Accordion.Header>
      <Accordion.Body  style={{ cursor: "pointer" }}>
      {response.length>0 ? response.map((cohort_projects) => (<CohortProjectLists key={prop.cohortResult} projectsList={cohort_projects} projectName={prop.cohortResult} cohortInfoUpdate={prop.cohortInfoUpdate}/>)) : "No cohort projects"}
        
      </Accordion.Body>
    </Accordion.Item>


      </div>
    );
    }

    





    }



  
export default SideBarComponent;