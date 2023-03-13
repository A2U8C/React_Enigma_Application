import axios from 'axios';
import { useEffect, useState } from 'react';


import Covariate_infoComponent from '../Covariate_details/Covariate_infoComponent.js';
import './CovariateProjectLists.css';



const {api_body_info} = require('../cred_details.js');




function CovariateProjectLists(covariateProperty) {

    const [state, setstate] = useState({projName:null,cohortName:null})

var temp_name= covariateProperty.covariateList.length>20?covariateProperty.covariateList.slice(0,20)+"...":covariateProperty.covariateList

    const changeState = () => {  
        console.log(covariateProperty)
        setstate({covName:covariateProperty.covariateName,covList:covariateProperty.covariateList}); 
        covariateProperty.covariateInfoUpdate({covName:covariateProperty.covariateName,covList:covariateProperty.covariateList})
       }; 

  


    return (
        <div className="cohortSubProjList_class" onClick={changeState}>
            <span>&rarr;</span> {temp_name}

            {
                // state.cohortName!=null && state.projName!=null ? (<Cohort_infoComponent cohortInfoReq={state.projName} projectInfoReq={state.cohortName} cohortInfoUpdate={covariateProperty.cohortInfoUpdate}/>) : null
            }

            
        
        </div>
      );
}


export default CovariateProjectLists;
