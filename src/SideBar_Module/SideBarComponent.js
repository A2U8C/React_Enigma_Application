
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

    axios.post('http://127.0.0.1:5000/cohorts/'+prop.cohortResult.cohortName.value+'/projects',
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


    return (
      <div className="CohortProjList_class_new">

      <Accordion.Item eventKey={prop.keyval}>
      <Accordion.Header onClick={invokeCollapse}>{prop.cohortResult.cohortName.value}</Accordion.Header>
      <Accordion.Body>
      {response.length>0 ? response.map((cohort_projects) => (<CohortProjectLists key={prop.cohortResult.cohortName.value} projectsList={cohort_projects} projectName={prop.cohortResult.cohortName.value} cohortInfoUpdate={prop.cohortInfoUpdate}/>)) : "No cohort projects"}
        
      </Accordion.Body>
    </Accordion.Item>


      </div>
    );





    }



  
export default SideBarComponent;