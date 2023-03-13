
import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';


import Accordion from 'react-bootstrap/Accordion';
import './Covariate_SideBarComponent.css';
import CovariateProjectLists from './CovariateProjectLists.js';


const {api_body_info} = require('../cred_details.js');




function Covariate_SideBarComponent(prop) {

  const [isVisible, setvisibility] = useState(false)

  
  const [response, setResponse] = useState([])

  const invokeCollapse = () => {

    axios.post('http://127.0.0.1:5000/covariate/'+prop.covariateResult,
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
    //         <span>{'\u2B24'}</span>{prop.covariateName}
            
    //         </div>

    //         <Collapse in={isVisible} className="">
    //           <div>
    //                                                       {/* projectsList:covariateList {covariate_property}  projectName=covariateName  {prop.covariateResult} */}
    //             {response.length>0 ? response.map((covariate_property,idx) => (<CovariateProjectLists key={idx} covariateList={covariate_property} covariateName={prop.covariateResult} covariateInfoUpdate={prop.covariateInfoUpdate}/>)) : null}
        

    //           </div>
    //       </Collapse>
            
    //       </div>
    //     );






        return (
          <div className="CohortProjList_class_new">

          <Accordion.Item eventKey={prop.keyval}>
          <Accordion.Header onClick={invokeCollapse}>{prop.covariateName}</Accordion.Header>
          <Accordion.Body>
          {response.length>0 ? response.map((covariate_property,idx) => (<CovariateProjectLists key={idx} covariateList={covariate_property} covariateName={prop.covariateResult} covariateInfoUpdate={prop.covariateInfoUpdate}/>)) : null}
        
          </Accordion.Body>
        </Accordion.Item>


          </div>
        );








    }



  
export default Covariate_SideBarComponent;