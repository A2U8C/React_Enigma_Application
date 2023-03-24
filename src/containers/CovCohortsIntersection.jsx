import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import CovariateIntersectionList from "../components/CovariateIntersectionList";
import './CohortsPage.css';
import Covariate_SideBarComponent from '../Covariate_sidebar/Covariate_SideBarComponent.js';
import Covariate_infoComponent from '../Covariate_details/Covariate_infoComponent.js';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Row,Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


const {api_body_info} = require('../cred_details.js');


function CovCohortsIntersection() {
    const [response, setResponse] = useState("");
    const [cohortData, setcovariateInfoResp] = useState({});

    var prev=response;
  
    useEffect(() => {
        api_body_info["data_covCoh"]=response;
        axios.post('http://127.0.0.1:5000/covariate_property_intersection',
          api_body_info
        )
        .then((res) => {
          setcovariateInfoResp(res.data);
          prev=response;
        });
      
    });
    // }, [response,prev]);
  

    // console.log(response)


    // make wrapper function to give child
    const wrapperSetCovariateInter = useCallback(
      (covDets) => {
        setResponse(covDets);
      },
      [setResponse]
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

        <CovariateIntersectionList
          response={response}
          covariateSetterInter={wrapperSetCovariateInter}
        />
        
      
        <TableContainer>

      {response.length>2? <Table aria-label="simple table">
        <TableHead >
          <TableRow sx={{
      "& th": {
        color: "#FFFFFF",
        backgroundColor: "#342c48",
        fontSize:"1.1rem"
      }
    }}>
          <TableCell align="center">Cohort Name</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {cohortData.length>0?(cohortData.map((elem) => (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row" align="center">{elem}</TableCell>
            <TableCell align="center"><DoneOutlineIcon color="success" /></TableCell>
            </TableRow>
          ))):<TableRow align="center">
            <TableCell colSpan={2} align="center">
              <Typography component="div" variant="h6">
              Such emptiness
              </Typography>
              </TableCell>
            </TableRow>}
        </TableBody>
      </Table>:(
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography component="div" variant="h6">
            Select covariates to find Cohorts
          </Typography>
        </Box>
      )}

</TableContainer>

        
      </Box>
    );
  }

export default CovCohortsIntersection;
