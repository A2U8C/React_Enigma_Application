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


import axios from 'axios';

import './CohortDetailsModal.css';
import CohortCovariateModal from "./CohortCovariateModal"
const {api_body_info} = require('../cred_details.js');

export default function CohortDetailsModal(props) {


    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const cohortName=props.cohortName;
    const [cohortDataInfo, setcohortDataInfo] = useState([]);

    useEffect(() => {
        axios
          .post(
            api_body_info['backEndURL']+"cohorts/" + cohortName + "/details",
            api_body_info
          )
          .then((res) => {
            console.log(res);
            setcohortDataInfo(res.data);
          });
      }, [cohortName]);


      var dict_covariateMapping = {
        'Has PD Demographics':'Has PD Demographics (E)',
        'Has neuropsychiatric':'Has neuropsychiatric (E)',
        'Has cognitive':'Has cognitive (E)'
      };

      console.log(cohortDataInfo)

      const [ModalOpenVar, setModalOpenVar]=useState(false)
      const [ModalTextVar, setModalTextVar]=useState("")
      const [ModalCovariateVar, setModalCovariateVar]=useState("")


  var ModalOpen = (text) => {
    setModalOpenVar(!ModalOpenVar);
    setModalTextVar(dict_covariateMapping[text[0]]);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",dict_covariateMapping[text[0]])
    setModalCovariateVar(text[0]);
  };
      


  return (
    <div className="modal show" >

      <Modal show={show}
      size="lg"
      onClick={e => e.stopPropagation()}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>{cohortName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            
            
            

            {Object.keys(cohortDataInfo).length>0 ? (
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 1, marginLeft: 0, marginRight: 0 }}
        >
            <CardContent>
              <Box sx={{ flexGrow: 1 }}>
                {Object.entries(cohortDataInfo).map((elem) => (
                  
                    <div>

{/* {['Has PD Demographics (E)', 'Has neuropsychiatric (E)', 'Has cognitive (E)'].includes(elem[0])? */}
{['Has PD Demographics', 'Has neuropsychiatric', 'Has cognitive'].includes(elem[0])?
                    <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: 0,
                      borderBottom: "1px solid #DCDCDC",
                      padding: "0px 0",
                      fontSize: 17,
                      color: "#0000FF" // Specify the desired font color  
                    }}
                      onClick={() => {
                        ModalOpen(elem);
                      }}
                  >
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
                        {ModalOpenVar && elem[0]==ModalCovariateVar && <CohortCovariateModal cohortName={cohortName} covariateFullName={ModalTextVar}/> }
                    </Box>
                    </Box>:
                      <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: 0,
                        borderBottom: "1px solid #DCDCDC",
                        padding: "0px 0",
                        fontSize: 17,
                      }}
                    ><Box
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
                    </Box>}



                    </div>
                    
                    


                    






                  
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
        <Modal.Footer>
        <p variant="primary"  class="d-flex flex-grow-1">
            Get more details from the &nbsp;<span><a href={'https://www.organicdatacuration.org/enigma_pd/index.php/'+cohortName} target='_blank'>{cohortName}</a></span>&nbsp; Wiki
        </p>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>



  )
}
