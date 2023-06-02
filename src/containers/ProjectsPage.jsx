import React from "react";
import { useEffect, useState, useCallback } from 'react';
// import Table from 'react-bootstrap/Table';
import axios from 'axios';



import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

import CohortDetailsModal from "../components/CohortDetailsModal";

const {api_body_info} = require('../cred_details.js');

function ProjectsPage() {
  const [response, setResponse] = useState([])
  const [ModalOpenVar, setModalOpenVar]=useState(false)
  const [ModalTextVar, setModalTextVar]=useState("")


  var ModalOpen = (text) => {
    setModalOpenVar(!ModalOpenVar);
    // this.preventDefault();
    // setModalOpenVar(true);
    setModalTextVar(text)
  };

  useEffect(()=> {
    axios.post(api_body_info['backEndURL']+'projects',
    api_body_info
  )
    .then((res)=> {
      // console.log(res.data)
        setResponse(res.data);
      });
  },[]);


  var all_keys=Object.keys(response)

  const index = all_keys.indexOf("all_cohorts");

  const x = all_keys.splice(index, 1);

  // console.log(all_keys,typeof all_keys)
  // console.log(response)


  return (
    <TableContainer component={Paper}>
      <Table style={{ width: '60rem', margin: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
          {all_keys.map((elem) => (
             elem!="Unknown" ?<TableCell>{elem}</TableCell>:null
             
          ))}


          </TableRow>
        </TableHead>
        <TableBody>
        {response["all_cohorts"]!=undefined?(response["all_cohorts"].map((elem,index) => (
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
             <TableCell component="th" scope="row" onClick={() => {
                    ModalOpen(elem);
                  }}>{elem}{ModalOpenVar && elem==ModalTextVar && <CohortDetailsModal cohortName={elem}/> }</TableCell>
            {all_keys.map((cohortProj,i) => (
              // console.log("/////////////////////",cohortProj)
              (response[cohortProj].includes(elem)==true && cohortProj!="Unknown")?(<TableCell>
              <DoneOutlineIcon color="success" /></TableCell>):(<TableCell></TableCell>)
            // <TableCell align="right">{elem}</TableCell>
          ))}
          </TableRow>
          ))):null}
          {/* {rows.map((row) => (
            
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default ProjectsPage;


