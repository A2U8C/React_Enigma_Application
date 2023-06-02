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



function CohortsPage() {
  const [cohortName, setCohortName] = useState("");
  const [cohortData, setCohortData] = useState([]);

  useEffect(() => {
    axios
      .post(
        api_body_info['backEndURL']+"cohorts/" + cohortName + "/details",
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
