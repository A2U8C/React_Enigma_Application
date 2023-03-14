import React, { useEffect, useState } from "react";
import axios from "axios";
import MuiDrawer from "@mui/material/Drawer";
import styled from "@emotion/styled";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
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

export default function CovariateList(props) {


    const [Demoavail, setDemoavail] = useState(false);
    const [Cognitiveavail, setCognitiveavail] = useState(false);
    const [Neuroavail, setNeuroavail] = useState(false);
  
    const [cognitiveAllList, setcognitiveAllList] = useState([]);
    const [DemoAllList, setDemoAllList] = useState([]);
    const [NeuroAllList, setNeuroAllList] = useState([]);


    const [allCovariateList, setallCovariateList] = useState([]);


    const [childCohortName, setChildCohortName] = useState({});
    const [selected, setSelected] = useState("");
  
    useEffect((covariateSetter = props.covariateSetter) => {
        covariateSetter(childCohortName);
      },[props.covariateSetter, childCohortName]
    );
  
    // Get List of Cohorts
    useEffect(() => {
      axios.post("http://127.0.0.1:5000/covariate/Has_PD_Demographics_(E)", api_body_info).then((res) => {
        // console.log(res)
        setDemoAllList(res.data);
      });
    }, []);

    useEffect(() => {
        axios.post("http://127.0.0.1:5000/covariate/Has_cognitive_(E)", api_body_info).then((res) => {
          // console.log(res)
          setcognitiveAllList(res.data);
        });
      }, []);

      useEffect(() => {
        axios.post("http://127.0.0.1:5000/covariate/Has_neuropsychiatric_(E)", api_body_info).then((res) => {
          // console.log(res)
          setNeuroAllList(res.data);
        });
      }, []);
  
    const handleAvailClick = (text,covariateName, id) => {
      setChildCohortName({covName:text,covList:covariateName});
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


        {/* Demo Cohorts  */}
        <List
          subheader={
            <ListSubheader component="div">List of Covariates</ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => {
              setDemoavail((Demoavail) => !Demoavail);
            }}
          >
            <ListItemText primary="Demographic: " />
            {Demoavail ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
  
          <Collapse in={Demoavail} timeout="auto" unmountOnExit>
            {DemoAllList.map((text, index) => (
              <Tooltip title={text} enterDelay={700} arrow>
                <Box key={index + "_" + text}>
                  <ListItemButton
                    onClick={() => {
                      handleAvailClick(text,"Has PD Demographics (E)", index);
                      setSelected(text);
                    }}
                    selected={selected === text}
                  >
                    <ListItemText
                    primaryTypographyProps={{fontSize: '0.8rem'}} 
                      primary={
                        text.length > 20 ? text.slice(0, 20) + "..." : text
                      }
                    />
                  </ListItemButton>
                </Box>
              </Tooltip>
            ))}
          </Collapse>
  





          {/* Cognitive Cohorts  */}
  
          <ListItemButton
            onClick={() => {
              setCognitiveavail((Cognitiveavail) => !Cognitiveavail);
            }}
          >
            <ListItemText primary="Cognitive: " />
            {Cognitiveavail ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
  
          <Collapse in={Cognitiveavail} timeout="auto" unmountOnExit>
            {cognitiveAllList.map((text, index) => (
              <Tooltip title={text} enterDelay={700} arrow>
                <Box key={index + "_" + text}>
                <ListItemButton
                    onClick={() => {
                      handleAvailClick(text,"Has cognitive (E)", index);
                      setSelected(text);
                    }}
                    selected={selected === text}
                  >
                    <ListItemText
                    primaryTypographyProps={{fontSize: '0.8rem'}} 
                      primary={
                        text.length > 15 ? text.slice(0, 15) + "..." : text
                      }
                    />
                  </ListItemButton>
                </Box>
              </Tooltip>
            ))}
          </Collapse>







{/* Neuro Cohorts  */}
  
<ListItemButton
            onClick={() => {
              setNeuroavail((Neuroavail) => !Neuroavail);
            }}
          >
            <ListItemText primary="Neuro Psychiatric:" />
            {Neuroavail ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
  
          <Collapse in={Neuroavail} timeout="auto" unmountOnExit>
            {NeuroAllList.map((text, index) => (
              <Tooltip title={text} enterDelay={700} arrow>
                <Box key={index + "_" + text}>
                <ListItemButton
                    onClick={() => {
                      handleAvailClick(text,"Has neuropsychiatric (E)", index);
                      setSelected(text);
                    }}
                    selected={selected === text}
                  >
                    <ListItemText
                    primaryTypographyProps={{fontSize: '0.8rem'}} 
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