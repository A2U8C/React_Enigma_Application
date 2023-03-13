import React, { useState } from "react";

import MuiDrawer from "@mui/material/Drawer";
import styled from "@emotion/styled";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

// Icons
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = "240px";
const Drawer = styled(MuiDrawer)({
  //   ":root": {
  //     paper: {
  //       backgroundColor: "red",
  //     },
  //   },
});

const cohortListData = [
  "CHRISTCHURCH",
  "ROME",
  "ARMENIA",
  "VUMC2",
  "SHANGHAI",
  "UPENN",
  "STANFORD",
  "STELLENBOSCH",
  "AMSTERDAM",
  "BERN",
  "CAMPINAS",
  "GRAZ",
  "NW-ENGLAND",
  "NZPD",
  "OXFORD",
  "PPMI",
  "RADBOUD",
  "TAIWAN",
  "UCSF",
  "UKBB",
  "UVA",
  "COGTIPS",
  "BRISBANE",
  "CHARLOTTESVILLE",
  "DONDERS",
  "LIEGE",
  "MILAN",
  "NEUROCON",
  "ONJAPAN",
  "TAO WU",
  "UDAL",
];

const unAvailCohorts = [
  "COGTIPS",
  "BRISBANE",
  "CHARLOTTESVILLE",
  "DONDERS",
  "LIEGE",
  "MILAN",
  "NEUROCON",
  "ONJAPAN",
  "TAO WU",
  "UDAL",
];
// const renderRow = ()=>{
//     return(
//         <ListItem key={index}>
//         <ListItemButton onClick={handleClick}>
//           <ListItemText primary={text} />
//           {open ? <ExpandLess /> : <ExpandMore />}
//           <Collapse>
//           </Collapse>
//         </ListItemButton>
//       </ListItem>
//     )
// }

export default function CohortsList() {
  const [availOpen, setAvailOpen] = useState(true);
  const [unavailOpen, setUnavailOpen] = useState(false);
  const handleAvailClick = (text, id) => {
    // Do something
  };

  const handelUnavailClick = (text, id) => {
    /// do something
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
          {cohortListData.map((text, index) => (
            <Box key={index + "_" + text}>
              <ListItemButton
                onClick={() => {
                  handleAvailClick(text, index);
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </Box>
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
          {unAvailCohorts.map((text, index) => (
            <Box key={index + "_" + text}>
              <ListItemButton onClick={handelUnavailClick(text, index)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </Box>
          ))}
        </Collapse>
      </List>
    </Drawer>
  );
}
