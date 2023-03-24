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
  Checkbox,
  FormGroup,
  FormControlLabel,
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

export default function CovariateIntersectionList(props) {


    var [Demoavail, setDemoavail] = useState(false);
    var [Cognitiveavail, setCognitiveavail] = useState(false);
    var [Neuroavail, setNeuroavail] = useState(false);
  
    var [cognitiveAllList, setcognitiveAllList] = useState([]);
    var [DemoAllList, setDemoAllList] = useState([]);
    var [NeuroAllList, setNeuroAllList] = useState([]);


    var [allCovariateList, setallCovariateList] = useState([]);


    //const [childCohortName, setChildCohortName] = useState({"Has PD Demographics (E)":[],"Has cognitive (E)":[],"Has neuropsychiatric (E)":[]});
    
    var [childCohortName, setChildCohortName] = useState({});
    
    
    var [selected, setSelected] = useState("");
  
    useEffect((covariateSetterInter = props.covariateSetterInter) => {
        covariateSetterInter(JSON.stringify(childCohortName));
      },[props.covariateSetterInter, JSON.stringify(childCohortName)]
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
  
    var handleAvailClick = (event,text,covariateName, id) => {
        var { value, checked } = event.target;
        var childCohortsDict = childCohortName;
        
            if (checked) {
                if (covariateName in childCohortsDict){
                    childCohortsDict[covariateName]=[...childCohortsDict[covariateName], text]
                }
                else{
                    childCohortsDict[covariateName]=[text]
                }
          }
        
          // Case 2  : The user unchecks the box
          else {
            if (covariateName in childCohortsDict){
                childCohortsDict[covariateName]=childCohortsDict[covariateName].filter((e) => e !== text)
            if (childCohortsDict[covariateName].length==0){
                delete childCohortsDict[covariateName];
            }
            }
            
            }
        setChildCohortName(childCohortsDict);
        // console.log(childCohortName);
}
            



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
  
          <Collapse in={Demoavail} timeout="auto">
            {DemoAllList.map((text, index) => (
              <Tooltip title={text} enterDelay={700} arrow>
                <Box key={index + "_" + text}>

                

                    <FormGroup>
                            <FormControlLabel
                                control={
                                <Checkbox onChange={(event) => {
                                    handleAvailClick(event,text,"Has PD Demographics (E)", index);
                                    setSelected(text);
                                    
                                  }} name={text} 
                                  checked={text.checked}
                                //   checked={"Has PD Demographics (E)" in childCohortName && childCohortName["Has PD Demographics (E)"].includes(text)}
                                  />
                                }
                                label={text.length > 20 ? text.slice(0, 20) + "..." : text}
                            />
                    </FormGroup>



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
  
          <Collapse in={Cognitiveavail} timeout="auto">
            {cognitiveAllList.map((text, index) => (
              <Tooltip title={text} enterDelay={700} arrow>
                <Box key={index + "_" + text}>


                    <FormGroup>
                            <FormControlLabel
                                control={
                                <Checkbox onChange={(event) => {
                                    handleAvailClick(event,text,"Has cognitive (E)", index);
                                    setSelected(text);
                                  }} name={text} 
                                  checked={text.checked}
                                //   checked={"Has cognitive (E)" in childCohortName && childCohortName["Has cognitive (E)"].includes(text)}
                                  />
                                }
                                label={text.length > 20 ? text.slice(0, 20) + "..." : text}
                            />
                    </FormGroup>


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
  
          <Collapse in={Neuroavail} timeout="auto">
            {NeuroAllList.map((text, index) => (
              <Tooltip title={text} enterDelay={700} arrow>
                <Box key={index + "_" + text}>


                    <FormGroup>
                            <FormControlLabel
                                control={
                                <Checkbox onChange={(event) => {
                                    handleAvailClick(event,text,"Has neuropsychiatric (E)", index);
                                    setSelected(text);
                                  }} name={text} 
                                  checked={text.checked}
                                //   checked={"Has neuropsychiatric (E)" in childCohortName && childCohortName["Has neuropsychiatric (E)"].includes(text)}
                                  />
                                }
                                label={text.length > 20 ? text.slice(0, 20) + "..." : text}
                            />
                    </FormGroup>

                </Box>
              </Tooltip>
            ))}
          </Collapse>



        </List>
      </Drawer>
    );




}