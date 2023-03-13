import axios from 'axios';
import { useEffect, useState } from 'react';


import Cohort_infoComponent from '../Details_Module/Cohort_infoComponent.js';
import './CohortProjectLists.css';



const {api_body_info} = require('../cred_details.js');



function CohortProjectLists(cohortListsProj) {

    const [state, setstate] = useState({projName:null,cohortName:null})


    const changeState = () => {  
        setstate({projName:cohortListsProj.projectName,cohortName:cohortListsProj.projectsList.cohortProjName.value}); 
        cohortListsProj.cohortInfoUpdate({projName:cohortListsProj.projectName,cohortName:cohortListsProj.projectsList.cohortProjName.value})
       }; 



    return (
        <div className="cohortSubProjList_class" onClick={changeState}>
            
            <span>&rarr;</span> {cohortListsProj.projectsList.cohortProjName.value}


            {
                // state.cohortName!=null && state.projName!=null ? (<Cohort_infoComponent cohortInfoReq={state.projName} projectInfoReq={state.cohortName} cohortInfoUpdate={cohortListsProj.cohortInfoUpdate}/>) : null
            }

            
        
        </div>
      );
}


export default CohortProjectLists;
