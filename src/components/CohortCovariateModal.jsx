import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    Box,
    Card,
    CardContent,
    CssBaseline,
    Divider,
    Typography,
  } from "@mui/material";

  import { styled, useTheme } from "@mui/material/styles";


import axios from 'axios';
import zIndex from '@mui/material/styles/zIndex.js';
import './CohortDetailsModal.css';



const {api_body_info} = require('../cred_details.js');

export default function CohortCovariateModal(props) {


        const [show, setShow] = useState(true);
        const handleClose = () => setShow(false);

    const cohortName=props.cohortName;
    const [cohortDataInfo, setcohortDataInfo] = useState([]);

    useEffect(() => {
        api_body_info['covariate_Name']=props.covariateFullName;
        axios
          .post(
            api_body_info['backEndURL']+"covariateCohortList/" + cohortName ,
            api_body_info
          )
          .then((res) => {
            console.log(res);
            setcohortDataInfo(res.data);
          });
      }, [cohortName]);


      console.log(cohortDataInfo)

  return (
    <div className="modal show">

      <Modal show={show} onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      bac
      centered 
      style={{ backgroundColor: "rgba(242, 242, 242, 0.5)" }}
      >
        <Modal.Header closeButton
      className='Modal_in_Modal'>
          <Modal.Title>{cohortName} : {props.covariateFullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='ModalMaintain'>
            
            
            
            

            {Object.keys(cohortDataInfo).length>0 ? (
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 1, marginLeft: 0, marginRight: 0 }}
        >
            <CardContent>
              <Box sx={{ flexGrow: 1 }}>
                {Object.entries(cohortDataInfo).map((elem) => (
                  
                    
                  <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  {elem[1]['prop']['value']}
                </Box>


                
                  
                ))}
              </Box>
            </CardContent>
        </Box>


      ) : (
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography component="div" variant="h6">
          No data available for {cohortName}
          </Typography>
        </Box>
      )}           
            
            
            
            </Modal.Body>
      </Modal>
    </div>



  )
}
