
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';


const {api_body_info} = require('../cred_details.js');



function Covariate_infoComponent(props) {
    // {Cohort_info,project_info}

    const [response, setResponse] = useState([])

    
    useEffect(()=> {

        // Object.keys(props.covariateInfoReq).length
        // if (Object.keys(props.covariateInfoReq).length>0 && Object.keys(props.covariateListInfoReq).length>0){
        //     console.log(Object.keys(props.covariateInfoReq).length)
        //http://127.0.0.1:5000/covariate/Has_cognitive_(E)/covarProp/WCST-SF_(E)
        console.log(props)
        if (props.covariateInfoReq!=undefined && props.covariateListInfoReq!=undefined){
            console.log('http://127.0.0.1:5000/covariate/'+props.covariateInfoReq.replace(" ","_")+'/covarProp/'+props.covariateListInfoReq.replace(" ","_"))
            axios.post('http://127.0.0.1:5000/covariate/'+props.covariateInfoReq.replace(" ","_")+'/covarProp/'+props.covariateListInfoReq.replace(" ","_"),
            api_body_info
    )
      .then((res)=> {
          setResponse(res.data);
        });

        } 
        
    },[props.covariateInfoReq,props.covariateListInfoReq]);

    if (!props.covariateInfoReq || !props.covariateListInfoReq){
        console.log("Return ")
        return
    }
    
        // alert(response)
        //  console.log(response)
        //  
    var data=JSON.parse(JSON.stringify(response))
    var data_present=[]
    var data_absent=[]
    var data_missing=[]


    if (data.GivenPresent!=undefined){
        data_present=data.GivenPresent
    }

    if (data.GivenPresent!=undefined){
        data_absent=data.GivenAbsent
    }

    if (data.GivenPresent!=undefined){
        data_missing=data.Missing
    }
    
    

    console.log(data)
    // console.log(data_absent)
    // console.log(data_missing)
    return (
        <div>

            <h1>{props.covariateListInfoReq}</h1>
            
            <Table bordered >
            <thead className="table-active">
                <tr>
                    <th>Properties present in(Cohorts)</th>
                    <th>Property not in(Cohorts)</th>
                    <th>Missing data(Cohorts)</th>
                </tr>
            </thead>
                <tbody>
                     
                    <tr align="center">
                        <td>
                        {data_present.map(e =>
                        <tr>
                            {e}
                            {/* <td>{e}</td> */}
                        </tr>
                        )}
                        </td>
                            
                        <td>
                        {data_absent.map(e =>
                        <tr>
                            {e}
                            {/* <td>{e}</td> */}
                        </tr>
                        )}
                        </td>

                        <td>
                        {data_missing.map(e =>
                        <tr>
                            {e}
                            {/* <td>{e}</td> */}
                        </tr>
                        )}
                        </td>

                    </tr>
                    
                </tbody>
            </Table>


           {/* {data_present.forEach(element => {
            console.log(element);
            })} */}

        </div>
      );
}


export default Covariate_infoComponent;