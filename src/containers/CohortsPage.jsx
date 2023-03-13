import { Box, CssBaseline, Typography } from "@mui/material";
import CohortsList from "../components/CohortsList";

import './CohortsPage.css';


import Cohort_Details_General from '../Details_Module/Cohort_Details_General.jsx';
import Cohort_full_information from '../Details_Module/Cohort_full_information.jsx';

import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Row,Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


const {api_body_info} = require('../cred_details.js');


function CohortsPage() {

  const [response, setResponse] = useState([])
  const [cohortInfoResp, setcohortInfoResp] = useState(null)

  const cohortInfoUpdate = useCallback(
    (InfoResp) => {
      setcohortInfoResp(InfoResp)
    },
    [cohortInfoResp],
  );

  useEffect(()=> {
    axios.post('http://127.0.0.1:5000/cohorts',
    api_body_info
  )
    .then((res)=> {
      // console.log(res.data)
        setResponse(res.data);
      });
  },[]);




  // console.log(response)
  var response2=[]
var available_cohorts=[]
var missing_cohorts=[]
if (Object.keys(response).length>0){
  available_cohorts=response.presentCohorts
  missing_cohorts=response.Missing
response2=[...response.presentCohorts,...response.Missing]
}

console.log(response2)



  return (
<div className="App">
      <Row>
              <Col sm={3}>
                          Cohort Information
                          <header>
                                    {/* <div className="text-center">
                                        <img src={brain} className="App-logo" alt="brain" />
                                    </div> */}

                                    <Accordion className="text-center">
                                    <Accordion.Item eventKey='012'>
                                    <Accordion.Header>Available Cohorts</Accordion.Header>
                                    <Accordion.Body>
                                    {/* <div> */}
                                      {/* <h2>Available Cohorts</h2> */}
                                    <Accordion defaultActiveKey={['0']} className="text-center no_arrow_class">
                                    {
                                    available_cohorts.length>0 ? available_cohorts.map((result_cohorts,idx) => (<Cohort_Details_General key={idx} missing_val_param={false} keyval={idx} cohortResult={result_cohorts} cohortInfoUpdate={cohortInfoUpdate}/>)) : "No Cohort projects"
                                    }
                                    </Accordion>
                                    </Accordion.Body>
                                    </Accordion.Item>
                                    {/* </div> */}
                                    

                                    <Accordion.Item eventKey='234'>
                                    <Accordion.Header>Missing Cohorts</Accordion.Header>
                                    <Accordion.Body>
                                    {/* <div> */}
                                    {/* <h2>Missing Cohorts</h2> */}
                                    <Accordion defaultActiveKey={['0']} className="text-center">
                                    {
                                    missing_cohorts.length>0 ? missing_cohorts.map((result_cohorts,idx) => (<Cohort_Details_General key={idx} keyval={idx} missing_val_param={true} cohortResult={result_cohorts} cohortInfoUpdate={cohortInfoUpdate}/>)) : "No Data Available"
                                    }
                                    </Accordion>
                                    </Accordion.Body>
                                    </Accordion.Item>

                                    {/* </div> */}

                                    </Accordion>
                                  

                          </header>
                  </Col>
                <Col sm={9} className="mr-auto ml-auto text-center">
                {
                        cohortInfoResp && 
                        <Cohort_full_information cohortNameInfo={cohortInfoResp.cohortNameDets} />
                }



                </Col>
      </Row>
         
          </div>

  );





















  // return (
  //   <Box
  //     id="drawer__container"
  //     sx={{
  //       position: "relative",
  //       display: "flex",
  //       minHeight: "95%",
  //     }}
  //   >
  //     <CssBaseline />
  //     <CohortsList />
  //     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
  //       <Typography paragraph>
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
  //         totam quibusdam dolore, maxime placeat minima deserunt id quia dolorum
  //         beatae est ducimus. Esse modi amet ullam obcaecati nisi, veniam quos.
  //         Eius, quia, sapiente eum voluptate officiis unde tempora similique
  //         repellendus molestias repudiandae sit numquam. Libero cumque quos
  //         nihil ea ipsam officia saepe commodi veniam, corporis omnis culpa,
  //         unde iste cum! Perspiciatis laborum omnis eum velit eos nulla a
  //         nostrum fuga saepe fugiat nisi animi mollitia corrupti perferendis,
  //         veniam, eius vero? Obcaecati eos quam quod optio, ducimus iure illo
  //         quia asperiores? Autem totam sint vitae. Voluptatem perferendis
  //         deserunt asperiores aliquam iure! Quidem beatae iste quisquam numquam
  //         molestiae nesciunt quae maiores magnam, nostrum iusto dolores, neque
  //         sint, consequatur ab asperiores odio eaque. Expedita aspernatur
  //         ratione, ea quis ut odio quibusdam officiis sequi, minima molestias
  //         rerum facilis esse. Nostrum eos eligendi ratione, libero ipsam culpa
  //         nobis dolorem tempore iure suscipit vitae magni nisi.
  //       </Typography>
  //     </Box>
  //   </Box>
  // );




























}

export default CohortsPage;
