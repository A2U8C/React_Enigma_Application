import axios from 'axios';
import { useEffect, useState,useCallback } from 'react';

import CohortProjectLists from './CohortProjectLists.js';
import './CohortProjects.css';



function CohortProjects(cohort_name) {


    const [response, setResponse] = useState([])


    // const cohortInfoUpdate = useCallback(
    //   (InfoResp) => {
    //     setcohortInfoResp(InfoResp)
    //   },
    //   [cohortInfoResp],
    // );

  // useEffect(()=> {
  //   axios.post('http://127.0.0.1:5000/cohorts/'+cohort_name.data+'/projects',{ 
  //       "name" : "Proj ENIGMA3 Cortical GWAS",
  //       "endpoint_id" : "https://enigma-endpoint.disk.isi.edu/enigma_dev/sparql"
  //   })
  //   .then((res)=> {
  //     // console.log(res.data)
  //       setResponse(res.data);
  //     });
  // },[cohort_name.data]);



        // console.log(response)

    return (
        <div className='subProjectList_class'>
            {response.length>0 ? response.map((cohort_projects) => (<CohortProjectLists projectsList={cohort_projects} projectName={cohort_name.data} cohortInfoUpdate={cohort_name.cohortInfoUpdate}/>)) : null}
        </div>
      );
}


export default CohortProjects;
