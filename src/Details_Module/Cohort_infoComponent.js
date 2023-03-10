
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const {api_body_info} = require('../cred_details.js');



function Cohort_infoComponent(props) {
    // {Cohort_info,project_info}

    const [response, setResponse] = useState([])

    
    useEffect(()=> {
        console.log(props)

        // Object.keys(props.cohortInfoReq).length
        // if (Object.keys(props.cohortInfoReq).length>0 && Object.keys(props.projectInfoReq).length>0){
        //     console.log(Object.keys(props.cohortInfoReq).length)
        if (props.cohortInfoReq!=undefined && props.projectInfoReq!=undefined){
            console.log('http://127.0.0.1:5000/cohorts/'+props.cohortInfoReq.replace(" ","_")+'/projects/'+props.projectInfoReq.replace(" ","_"))
            axios.post('http://127.0.0.1:5000/cohorts/'+props.cohortInfoReq.replace(" ","_")+'/projects/'+props.projectInfoReq.replace(" ","_"),
            api_body_info
    )
      .then((res)=> {
          setResponse(res.data);
        });

        }

      
    },[props.cohortInfoReq,props.projectInfoReq]);

    // if (!props.cohortInfoReq || !props.projectInfoReq){
    //     console.log("Return ")
    //     return
    // }
    
        // alert(response)
         console.log(response)
        //  
    var data=JSON.parse(JSON.stringify(response))

    console.log(data)


    if(data.length>0){
        return (
            <div>
                <h1>{props.projectInfoReq}</h1>
                <Table striped bordered hover>
                    <tbody>
                        {data.map(e => 
                        <tr>
                        <td>{e.props.value}</td>
                        <td>{e.propsURI.value}</td>
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
                <h1>{props.projectInfoReq}</h1>
                <Card>
                <Card.Body>No data available</Card.Body>
                </Card>
            </div>
          );
    }


    
}


export default Cohort_infoComponent;