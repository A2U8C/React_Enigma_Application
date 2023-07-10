import React, { useEffect, useState } from "react";
import axios from "axios";
import MuiDrawer from "@mui/material/Drawer";

import Paper from '@mui/material/Paper';
import styled from "@emotion/styled";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Container, 
  TextField,

} from "@mui/material";

// Icons
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const {api_body_info} = require('../cred_details.js');


const drawerWidth = "240px";
const Drawer = styled(MuiDrawer)({
  // "& .MuiDrawer-paper": {
  //   backgroundColor: "#312F44",
  //   color: "#fff",
  // },
});

export default function CohortsList(props) {
  const [availOpen, setAvailOpen] = useState(false);
  const [unavailOpen, setUnavailOpen] = useState(false);
  const [cohortAllList, setcohortAllList] = useState([]);
  const [cohortMissingList, setCohortMissingList] = useState([]);
  const [childCohortName, setChildCohortName] = useState("");
  const [selected, setSelected] = useState("");


  
  var [def_cohorts_list, set_def_cohorts_list] = useState([]);
  var [searched, setSearched] = useState("");

  useEffect(
    (cohortnameSetter = props.cohortnameSetter) => {
      cohortnameSetter(childCohortName);
    },
    [props.cohortnameSetter, childCohortName]
  );

  // Get List of Cohorts
  useEffect(() => {
    axios.post(api_body_info['backEndURL']+"cohorts", api_body_info).then((res) => {
      setcohortAllList(res.data.presentCohorts);
      setCohortMissingList(res.data.Missing);
      set_def_cohorts_list(res.data.presentCohorts)
    });
  }, []);

  const handleAvailClick = (text, id) => {
    setChildCohortName(text);
  };


  var requestSearch = (searchedVal) => {
    console.log(searchedVal)//event.target.value
    setSearched(searchedVal.target.value)
    var filteredRows = def_cohorts_list.filter((row) => {
      return row.toLowerCase().includes(searchedVal.target.value.toLowerCase());
    });
    setcohortAllList(filteredRows);
  };
  
  var cancelSearch = () => {
    setSearched("");
    requestSearch(searched.target.value);
  };







  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{ style: { position: "absolute" } }}
      BackdropProps={{ style: { position: "absolute" } }}
      ModalProps={{
        container: document.getElementById("drawer__container"),
        style: { position: "absolute" },
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },

        "& ::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {/* Available Cohorts  */}
      <List
        subheader={
          <ListSubheader component="div">List of Cohorts</ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => {
            setAvailOpen((availOpen) => !availOpen);
          }}
        >
          <ListItemText primary="Available" />
          {availOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={availOpen} timeout="auto" unmountOnExit>

        <center>
          <TextField  
          component={Paper} type="search" 
          id="search" label="Search" 
          style={{ marginTop: '0.3rem',marginBottom: '0.3rem'  }} 
          aria-label="simple table"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          />

        </center>


          {cohortAllList.map((text, index) => (
            <Tooltip title={text} enterDelay={700} arrow>
              <Box key={index + "_" + text}>
                <ListItemButton
                  onClick={() => {
                    handleAvailClick(text, index);
                    setSelected(text);
                  }}
                  selected={selected === text}
                >
                  <ListItemText
                    primary={
                      text.length > 15 ? text.slice(0, 15) + "..." : text
                    }
                  />
                </ListItemButton>
              </Box>
            </Tooltip>
          ))}
        </Collapse>

        {/* Unavialable Cohorts  */}

        <ListItemButton
          onClick={() => {
            setUnavailOpen((unavailOpen) => !unavailOpen);
          }}
        >
          <ListItemText primary="Unavilable" />
          {unavailOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={unavailOpen} timeout="auto" unmountOnExit>
          {cohortMissingList.map((text, index) => (
            <Tooltip title={text} enterDelay={700} arrow>
              <Box key={index + "_" + text}>
                <ListItemButton disabled>
                  <ListItemText
                    primary={
                      text.length > 15 ? text.slice(0, 15) + "..." : text
                    }
                  />
                </ListItemButton>
              </Box>
            </Tooltip>
          ))}
        </Collapse>
      </List>
    </Drawer>
  );
}