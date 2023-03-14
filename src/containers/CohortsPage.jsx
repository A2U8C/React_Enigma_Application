import {
  Box,
  Card,
  CardContent,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material";
import CohortsList from "../components/CohortsList";

import './CohortsPage.css';


import Cohort_Details_General from '../Details_Module/Cohort_Details_General.jsx';
import Cohort_full_information from '../Details_Module/Cohort_full_information.jsx';

import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Row,Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';



import emptyStateImg from "../static/Empty_State.gif";


const {api_body_info} = require('../cred_details.js');




// function CohortsPage() {
//   const [response, setResponse] = useState([])
//   const [cohortInfoResp, setcohortInfoResp] = useState(null)
//   const cohortInfoUpdate = useCallback(
//     (InfoResp) => {
//       setcohortInfoResp(InfoResp)
//     },
//     [cohortInfoResp],
//   );
//   useEffect(()=> {
//     axios.post('http://127.0.0.1:5000/cohorts',
//     api_body_info
//   )
//     .then((res)=> {
//       // console.log(res.data)
//         setResponse(res.data);
//       });
//   },[]);
//   // console.log(response)
//   var response2=[]
// var available_cohorts=[]
// var missing_cohorts=[]
// if (Object.keys(response).length>0){
//   available_cohorts=response.presentCohorts
//   missing_cohorts=response.Missing
// response2=[...response.presentCohorts,...response.Missing]
// }
// console.log(response2)
//   return (
// <div className="App">
//       <Row>
//               <Col sm={3}>
//                           Cohort Information
//                           <header>
//                                     {/* <div className="text-center">
//                                         <img src={brain} className="App-logo" alt="brain" />
//                                     </div> */}

//                                     <Accordion className="text-center">
//                                     <Accordion.Item eventKey='012'>
//                                     <Accordion.Header>Available Cohorts</Accordion.Header>
//                                     <Accordion.Body>
//                                     {/* <div> */}
//                                       {/* <h2>Available Cohorts</h2> */}
//                                     <Accordion defaultActiveKey={['0']} className="text-center no_arrow_class">
//                                     {
//                                     available_cohorts.length>0 ? available_cohorts.map((result_cohorts,idx) => (<Cohort_Details_General key={idx} missing_val_param={false} keyval={idx} cohortResult={result_cohorts} cohortInfoUpdate={cohortInfoUpdate}/>)) : "No Cohort projects"
//                                     }
//                                     </Accordion>
//                                     </Accordion.Body>
//                                     </Accordion.Item>
//                                     {/* </div> */}
                                    

//                                     <Accordion.Item eventKey='234'>
//                                     <Accordion.Header>Missing Cohorts</Accordion.Header>
//                                     <Accordion.Body>
//                                     {/* <div> */}
//                                     {/* <h2>Missing Cohorts</h2> */}
//                                     <Accordion defaultActiveKey={['0']} className="text-center">
//                                     {
//                                     missing_cohorts.length>0 ? missing_cohorts.map((result_cohorts,idx) => (<Cohort_Details_General key={idx} keyval={idx} missing_val_param={true} cohortResult={result_cohorts} cohortInfoUpdate={cohortInfoUpdate}/>)) : "No Data Available"
//                                     }
//                                     </Accordion>
//                                     </Accordion.Body>
//                                     </Accordion.Item>

//                                     {/* </div> */}

//                                     </Accordion>
                                  

//                           </header>
//                   </Col>
//                 <Col sm={9} className="mr-auto ml-auto text-center">
//                 {
//                         cohortInfoResp && 
//                         <Cohort_full_information cohortNameInfo={cohortInfoResp.cohortNameDets} />
//                 }



//                 </Col>
//       </Row>
         
//           </div>

//   );


// }


function CohortsPage() {
  const [cohortName, setCohortName] = useState("");
  const [cohortData, setCohortData] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://127.0.0.1:5000/cohorts/" + cohortName + "/details",
        api_body_info
      )
      .then((res) => {
        console.log(res);
        setCohortData(res.data);
      });
  }, [cohortName]);

  // make wrapper function to give child
  const wrapperSetCohortName = useCallback(
    (name) => {
      setCohortName(name);
    },
    [setCohortName]
  );


  

  return (
    <Box
      id="drawer__container"
      sx={{
        position: "relative",
        display: "flex",
        minHeight: "95%",
      }}
    >
      <CssBaseline />
      <CohortsList
        cohortName={cohortName}
        cohortnameSetter={wrapperSetCohortName}
      />

      {cohortName ? (
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginLeft: 10, marginRight: 15 }}
        >
          <Card>
            <CardContent>
              <Typography component="div" variant="h4">
                {cohortName}
              </Typography>
              <Divider
                sx={{
                  border: "2px solid #50CB86",
                  marginTop: 2,
                  marginBottom: 3,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                {Object.entries(cohortData).map((elem) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: 2,
                      borderBottom: "1px solid #DCDCDC",
                      padding: "2px 0",
                      fontSize: 18,
                    }}
                  >
                    {console.log(elem)}
                    <Box
                      sx={{
                        flex: 1,
                      }}
                    >
                      {elem[0]}
                    </Box>
                    <Box
                      sx={{
                        flex: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      {typeof elem[1] === "object"
                        ? elem[1].join(" | ")
                        : elem[1]}
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            textAlign: "center",
          }}
        >
          <img src={emptyStateImg} />
          <Typography component="div" variant="h6">
            Please Select a Cohort to Begin
          </Typography>
        </Box>
      )}
    </Box>
  );
}


export default CohortsPage;
