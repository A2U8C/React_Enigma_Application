import axios from 'axios';
import { useEffect, useState } from 'react';


import Covariate_infoComponent from '../Covariate_details/Covariate_infoComponent.js';
import './CovariateProjectLists.css';



const {api_body_info} = require('../cred_details.js');



function CovariateProjectLists(covariateProperty) {

    const [state, setstate] = useState({projName:null,cohortName:null})


    const changeState = () => {  
        console.log(covariateProperty)
        setstate({covName:covariateProperty.covariateName,covList:covariateProperty.covariateList}); 
        covariateProperty.covariateInfoUpdate({covName:covariateProperty.covariateName,covList:covariateProperty.covariateList})
       }; 

  


    return (
        <div className="cohortSubProjList_class" onClick={changeState}>
            <span>&rarr;</span> {covariateProperty.covariateList}

            {
                // state.cohortName!=null && state.projName!=null ? (<Cohort_infoComponent cohortInfoReq={state.projName} projectInfoReq={state.cohortName} cohortInfoUpdate={covariateProperty.cohortInfoUpdate}/>) : null
            }

            
        
        </div>
      );
}


export default CovariateProjectLists;
