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

const {api_body_info} = require('../cred_details.js');

function ProjectsPage() {
  const [response, setResponse] = useState([])

  useEffect(()=> {
    axios.post('http://127.0.0.1:5000/projects',
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

  console.log(all_keys,typeof all_keys)
  console.log(response)

  

  // return (
  // <div>
  //   <Table bordered >
  //           <thead className="table-active">
  //               <tr>
  //                  {all_keys.map(key_proj=>
  //                     <th>
  //                         {key_proj}
  //                     </th>
  //                     )}
  //               </tr>
  //           </thead>
  //               <tbody>
  //                   <tr>
  //                   {all_keys.map((e, index) => {
  //                     // console.log(response,e,response[e])
  //                     if (response[e]!=undefined){
  //                       return (
  //                       <td>
  //                         {
  //                         response[e].map((subItems, sIndex) => {
  //                           return <tr>  {subItems}</tr>
  //                         })
                          
  //                         }
  //                       </td>
  //                     );
  //                     }
  //                   })}
  //                   </tr>
  //               </tbody>
  //           </Table>
  // </div>
  // );


  return (
    <TableContainer component={Paper}>
      <Table style={{ width: '60rem', margin: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
          {all_keys.map((elem) => (
            <TableCell>{elem}</TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {response["all_cohorts"]!=undefined?(response["all_cohorts"].map((elem) => (
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">{elem}</TableCell>
            {all_keys.map((cohortProj,i) => (
              response[cohortProj].includes(elem)==true?(<TableCell>
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


