import React from "react";


import { Box, CssBaseline, Typography } from "@mui/material";
import CovariateList from "../components/CovariateList";

import './CohortsPage.css';


import Covariate_SideBarComponent from '../Covariate_sidebar/Covariate_SideBarComponent.js';
import Covariate_infoComponent from '../Covariate_details/Covariate_infoComponent.js';

import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Row,Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


import emptyStateImg from "../static/Empty_State.gif";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


const {api_body_info} = require('../cred_details.js');




function CovPage() {


    const [response, setResponse] = useState("");
    const [cohortData, setcovariateInfoResp] = useState([]);
  
    useEffect(() => {
      if(response.covName!=undefined && response.covList!=undefined ){
        axios.post(api_body_info['backEndURL']+'covariate/'+response.covList+'/covarProp/'+response.covName,
          api_body_info
        )
        .then((res) => {
          setcovariateInfoResp(res.data);
          console.log(cohortData)
        });
      }
      
    }, [response]);
  



    // make wrapper function to give child
    const wrapperSetCovariate = useCallback(
      (covDets) => {
        setResponse(covDets);
      },
      [setResponse]
    );
  

    var all_keys=Object.keys(cohortData)

    const index = all_keys.indexOf("all_cohorts");
  
    const x = all_keys.splice(index, 1);

    console.log(all_keys)


    var col_name={"GivenPresent":"Cohorts with property","GivenAbsent":"Cohorts without property","Missing":"Cohorts missing information"}



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
        <CovariateList
          response={response}
          covariateSetter={wrapperSetCovariate}
        />
        

        {/* {console.log(cohortData.length)} */}
        {"all_cohorts" in cohortData===true?(<TableContainer component={Paper} style={{ width: '60rem', margin: 'auto' }}>
        <Typography component="div" variant="h6" align="center" sx={{
        fontSize:"1.6rem"
    }}>
          Property Name: {response.covName.replace("(E)","")}
        </Typography>

      <Table aria-label="simple table">
        <TableHead >
          <TableRow sx={{
      "& th": {
        color: "#FFFFFF",
        backgroundColor: "#342c48",
        fontSize:"1.1rem"
      }
    }}>
          <TableCell></TableCell>
          {all_keys.map((elem) => (
            <TableCell>{col_name[elem]}</TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {cohortData["all_cohorts"]!=undefined?(cohortData["all_cohorts"].map((elem) => (
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">{elem}</TableCell>
            {all_keys.map((cohortProj,i) => (
              cohortData[cohortProj].includes(elem)==true?(<TableCell align="center">
              <DoneOutlineIcon color="success" /></TableCell>):(<TableCell></TableCell>)
            // <TableCell align="right">{elem}</TableCell>
          ))}
          </TableRow>
          ))):null}
          {/* {rows.map((row) => (
            
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>):(
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            textAlign: "center",
          }}
        >
          <img src={emptyStateImg} />
          <Typography component="div" variant="h6">
            Please Select a Covariate to Begin
          </Typography>
        </Box>
      )}
        
        





      </Box>
    );
  }

export default CovPage;
