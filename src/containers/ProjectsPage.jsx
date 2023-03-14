import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#312F44",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

// const projectData = {
//   projects: ["PD proj TBSS", "PD proj FS", "Unknown"],
//   cohorts: {
//     CHRISTCHURCH: ["PD proj FS"],
//     ROME: ["PD proj FS", "PD proj TBSS"],
//     GRAZ: ["PD proj FS", "PD proj TBSS"],
//     VUMC2: ["PD proj TBSS"],
//     UPENN: ["PD proj FS", "PD proj TBSS"],
//     STANFORD: ["PD proj FS", "PD proj TBSS"],
//     STELLENBOSCH: ["PD proj TBSS"],
//     AMSTERDAM: ["PD proj FS"],
//     BERN: ["PD proj FS"],
//     CAMPINAS: ["PD proj FS", "PD proj TBSS"],
//     "NW-ENGLAND": ["PD proj FS", "PD proj TBSS"],
//     NZPD: ["PD proj TBSS"],
//     OXFORD: ["PD proj FS", "PD proj TBSS"],
//     PPMI: ["PD proj FS", "PD proj TBSS"],
//     RADBOUD: ["PD proj TBSS"],
//     TAIWAN: ["PD proj TBSS"],
//     UCSF: ["PD proj TBSS"],
//     UKBB: ["PD proj TBSS"],
//     UVA: ["PD proj TBSS"],
//     COGTIPS: ["PD proj TBSS"],
//     CHARLOTTESVILLE: ["PD proj FS"],
//     DONDERS: ["PD proj FS"],
//     LIEGE: ["PD proj FS"],
//     MILAN: ["PD proj FS"],
//     NEUROCON: ["PD proj FS"],
//     ONJAPAN: ["PD proj FS"],
//     "TAO WU": ["PD proj FS"],
//     SHANGHAI: ["Unknown"],
//     UDAL: ["Unknown"],
//     UCKK: ["Unknown"],
//     ARMENIA: ["Unknown"],
//     BRISBANE: ["Unknown"],
//   },
// };
function ProjectsPage() {
  const [projectData, setProjectData] = useState([]);
  const [cohortData, setCohortData] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    var api_body = {
      name: "PD WG",
      endpoint_id: "https://endpoint.linkedearth.isi.edu/enigma_pd/query",
      projType: "WorkingGroup (E)",
    };
    axios.post("http://127.0.0.1:5000/projects", api_body).then((res) => {
      console.log(res);
      setProjectData(res.data.projects);
      setCohortData(res.data.cohorts);
    });
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
      }}
    >
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 650, fontSize: 20 }}
          aria-label="Projects Table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Cohorts</StyledTableCell>
              {projectData.map((elem) => (
                <StyledTableCell>{elem}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(cohortData)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((elem) => (
                <TableRow key={elem[0]}>
                  <TableCell>{elem[0]}</TableCell>
                  <TableCell>
                    {elem[1].includes(projectData[0]) ? <CheckIcon /> : null}
                  </TableCell>
                  <TableCell>
                    {elem[1].includes(projectData[1]) ? <CheckIcon /> : null}
                  </TableCell>
                  <TableCell>
                    {elem[1].includes(projectData[2]) ? <CheckIcon /> : null}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Object.keys(cohortData).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default ProjectsPage;
