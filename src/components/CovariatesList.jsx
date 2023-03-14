import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const drawerWidth = "240px";
function CovariatesList(props) {
  const [open, setOpen] = useState({});

  function handleClick(id) {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  }

  const [covariateList, setCovariatesList] = useState({});

  const [covarPropName, setCovarPropName] = useState("");
  const [covarName, setCovarName] = useState("");

  const [selected, setSelected] = useState("");

  const [covarProp, setCovarProps] = useState([]);
  useEffect(() => {
    var api_body = {
      name: "PD WG",
      endpoint_id: "https://endpoint.linkedearth.isi.edu/enigma_pd/query",
      projType: "WorkingGroup (E)",
    };

    axios.post("http://127.0.0.1:5000/allcovariates", api_body).then((res) => {
      setCovariatesList(res.data);
    });
  }, []);

  // Set Parent state value
  useEffect(
    (covarPropNameSetter = props.covarPropNameSetter) => {
      covarPropNameSetter(covarPropName);
    },
    [props.covarPropNameSetter, covarPropName]
  );
  useEffect(
    (covarNameSetter = props.covarNameSetter) => {
      covarNameSetter(covarName);
    },
    [props.covarNameSetter, covarName]
  );

  const fetchData = (covariateVal) => {
    var api_body = {
      name: "PD WG",
      endpoint_id: "https://endpoint.linkedearth.isi.edu/enigma_pd/query",
      projType: "WorkingGroup (E)",
    };
    axios
      .post("http://127.0.0.1:5000/covariate/" + covariateVal, api_body)
      .then((res) => {
        setCovarProps(res.data);
      });
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
      <List
        subheader={
          <ListSubheader component="div">List of Covariates</ListSubheader>
        }
      >
        {Object.entries(covariateList).map((val) => (
          <Box>
            <ListItemButton
              id={val[1]}
              onClick={() => {
                handleClick(val[1]);
                fetchData(val[1]);
              }}
            >
              <ListItemText primary={val[0]} />
              {open[val[1]] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[val[1]]}>
              {covarProp ? (
                covarProp.map((prop) => (
                  <Tooltip title={prop} enterDelay={700} arrow>
                    <ListItemButton
                      selected={selected === prop}
                      onClick={() => {
                        setSelected(prop);
                        setCovarPropName(prop);
                        setCovarName(val[1]);
                      }}
                    >
                      <ListItemText
                        primary={
                          prop.length > 15 ? prop.slice(0, 15) + "..." : prop
                        }
                      />
                    </ListItemButton>
                  </Tooltip>
                ))
              ) : (
                <Box>Loading...</Box>
              )}
            </Collapse>
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

export default CovariatesList;
