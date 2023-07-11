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

import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { Container, TextField } from "@mui/material";

import CohortDetailsModal from "../components/CohortDetailsModal";


import { DataGrid } from '@mui/x-data-grid';



const {api_body_info} = require('../cred_details.js');

function ProjectsPage() {
  const [response, setResponse] = useState([])
  const [ModalOpenVar, setModalOpenVar]=useState(false)
  const [ModalTextVar, setModalTextVar]=useState("")
  var [cohorts_list, set_cohorts_list] = useState([]);
  var [def_cohorts_list, set_def_cohorts_list] = useState([]);
  var [searched, setSearched] = useState("");
  
  const [sortBy, setSortBy] = useState('Cohorts');
  const [sortOrder, setSortOrder] = useState('asc');


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
        set_cohorts_list(res.data.all_cohorts);
        set_def_cohorts_list(res.data.all_cohorts)
        // console.log(typeof res.data.all_cohorts);
      });
  },[]);


  var all_keys=Object.keys(response);
  var tab_wdth=`${60/(all_keys.length-1)}rem`;
  var font_size='1.2rem';
  var index_all = all_keys.indexOf("all_cohorts");
  var x = all_keys.splice(index_all, 1);

  var requestSearch = (searchedVal) => {
    console.log(searchedVal)//event.target.value
    setSearched(searchedVal.target.value)
    var filteredRows = def_cohorts_list.filter((row) => {
      return row.toLowerCase().includes(searchedVal.target.value.toLowerCase());
    });
    set_cohorts_list(filteredRows);
  };
  
  var cancelSearch = () => {
    setSearched("");
    requestSearch(searched.target.value);
  };
  
  function sort_by_key(ct_sort)
  {
      function sortByKey_inc(x, y) {
          return ((x.toLowerCase() < y.toLowerCase()) ? -1 : ((x.toLowerCase() > y.toLowerCase()) ? 1 : 0));
          
      }
  
      function sortByKey_dec(x, y) {

          return ((x.toLowerCase() > y.toLowerCase()) ? -1 : ((x.toLowerCase() < y.toLowerCase()) ? 1 : 0));
          
      }
  
  
      if (ct_sort=='asc'){
        set_cohorts_list(cohorts_list.sort(sortByKey_inc));
      }
      else{
        set_cohorts_list(cohorts_list.sort(sortByKey_dec));
      }
  }


  const handleSort = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      sort_by_key(sortOrder)
      // console.log(sortedRows)
    }


  
  // console.log(all_keys,typeof all_keys)
  // console.log(cohorts_list);


  return (

    
    <div style={{width:'60rem'}}>
        {/* <center> */}
          <TextField  
          component={Paper} type="search" 
          id="search" label="Search" 
          style={{ width: '60rem', margin: 'auto' }} 
          aria-label="simple table"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          />

        {/* </center> */}
        
<TableContainer component={Paper}>
      <Table style={{ width: '60rem', margin: 'auto'}} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell
                onClick={() => handleSort()}
                style={{ cursor: 'pointer', fontWeight: 'bold', fontSize:font_size}}
              >
                Cohorts{sortOrder === "asc" ? (
              <ArrowUpward onClick={handleSort} />
            ) : (
              <ArrowDownward onClick={handleSort} />
            )}
              </TableCell>
          {all_keys.map((elem) => (
             elem!="Unknown" ?<TableCell style={{ width: tab_wdth, fontSize:font_size}}>{elem}</TableCell>:null
             
          ))}


          </TableRow>
        </TableHead>
        <TableBody>
        {/* {response["all_cohorts"]!=undefined?(response["all_cohorts"].map((elem,index) => ( */}
        {response["all_cohorts"]!=undefined?(cohorts_list.map((elem,index) => (
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
             <TableCell style={{ fontSize:font_size}} component="td" scope="row" onClick={() => {
                    ModalOpen(elem);
                  }}>{elem}{ModalOpenVar && elem==ModalTextVar && <CohortDetailsModal cohortName={elem}/> }</TableCell>
            {all_keys.map((cohortProj,i) => (
              (cohortProj!="Unknown")?(
              (response[cohortProj].includes(elem)==true )?(<TableCell><DoneOutlineIcon color="success" /></TableCell>):(<TableCell></TableCell>)
              ):(null)
          ))}
          </TableRow>
          ))):null}
          {/* {rows.map((row) => (
            
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>

    
    );
}

export default ProjectsPage;


