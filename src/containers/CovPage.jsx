import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import CovariatesList from "../components/CovariatesList";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const iconHash = {
  Absent: <CancelOutlinedIcon color="error" />,
  Present: <CheckCircleOutlineRoundedIcon color="success" />,
  Missing: <HelpOutlineOutlinedIcon color="warning" />,
};

function CovPage() {
  const [covarName, setCovarName] = useState("");
  const [covarPropName, setCovarPropName] = useState("");

  const [covariateData, setCovariateData] = useState({});

  useEffect(() => {
    var api_body = {
      name: "PD WG",
      endpoint_id: "https://endpoint.linkedearth.isi.edu/enigma_pd/query",
      projType: "WorkingGroup (E)",
    };
    axios
      .post(
        "http://127.0.0.1:5000/covariate/" +
          covarName.replace(/ /g, "_") +
          "/covarProp/" +
          covarPropName.replace(/ /g, "_"),
        api_body
      )
      .then((res) => {
        setCovariateData(res.data);
      });
  }, [covarName, covarPropName]);

  const wrapperSetCovariatePropName = useCallback(
    (name) => {
      setCovarPropName(name);
    },
    [setCovarPropName]
  );
  const wrapperSetCovariateName = useCallback(
    (name) => {
      setCovarName(name);
    },
    [setCovarName]
  );

  return (
    <Box
      id="drawer__container"
      sx={{
        position: "relative",
        display: "flex",
        height: "95%",
      }}
    >
      <CovariatesList
        covarPropName={covarName}
        covarPropNameSetter={wrapperSetCovariatePropName}
        covarName={covarName}
        covarNameSetter={wrapperSetCovariateName}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: 3,
          gap: 5,
        }}
      >
        <Typography component="div" variant="h6">
          Property Name: {covarPropName}{" "}
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Cohort Name</TableCell>
                <TableCell>Property</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(covariateData).map((row) => (
                <TableRow
                  key={row[0]}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row[0]}</TableCell>
                  <TableCell component="th" scope="row">
                    <Tooltip title={row[1]} enterDelay={500} arrow>
                      {iconHash[row[1]]}
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CovPage;
