
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const {api_body_info} = require('../cred_details.js');



function Cohort_full_information(props) {
    // {Cohort_info,project_info}

    const [response, setResponse] = useState([])

    
    useEffect(()=> {
        console.log(props)

        // Object.keys(props.cohortInfoReq).length
        // if (Object.keys(props.cohortInfoReq).length>0 && Object.keys(props.projectInfoReq).length>0){
        //     console.log(Object.keys(props.cohortInfoReq).length)
        if (props.cohortNameInfo!=undefined){
            console.log('http://127.0.0.1:5000/cohorts/'+props.cohortNameInfo.replace(" ","_")+'/details')
            axios.post('http://127.0.0.1:5000/cohorts/'+props.cohortNameInfo.replace(" ","_")+'/details',
            api_body_info
    )
      .then((res)=> {
          setResponse(res.data);
        });

        }

      
    },[props.cohortNameInfo]);

    if (!props.cohortNameInfo){
        // console.log("Return ")
        return
    }
    
    var data=JSON.parse(JSON.stringify(response))

    console.log(data)

    if(data.length>1){
            return (
                    <div>
                        <h1>{props.cohortNameInfo}</h1>
                        <Table striped bordered hover>
                            <tbody>
                                
                                {data.map(e => 
                                <tr>
                                <td>{e.prop.value}</td>
                                <td>{e.PropValURI.value}</td>
                                </tr>
                                )}
                                
                            </tbody>
                        </Table>

                    </div>
                );
    }
    else{
        return (
            <div>
                <h1>{props.cohortNameInfo}</h1>
                <Card>
                <Card.Body>No data available</Card.Body>
                </Card>
            </div>
        );
    }


    
}


export default Cohort_full_information;