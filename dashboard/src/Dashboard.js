import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Consequence from "./logo.png";
import "./dashboard.css";
import picGraph from "./graph.png";
import File from "./file.png";
import Transfer from "./transfer.png";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ForceGraph } from "./CasualGraph/ForceGraph";

import { Heatmap } from "./Validation_view/Heatmap/Heatmap";
import { Scatterplot } from "./Validation_view/Scatterplot/Scatterplot";
import Parallel from "./Validation_view/Parallel";
import { ListRanks } from "./Uncertainty_rank/ListRank";
import Dim_reduction from "./Validation_view/Dim_reduction";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


export default function AutoGrid() {
  return (
    <>
      <AppBar sx={{ bgcolor: "#384142", height: "60px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img className="logo" src={Consequence} alt="" />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 200,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CasualLens
            </Typography>
            <GTranslateIcon
              className="translate"
              fontSize="medium"
            ></GTranslateIcon>
            <HelpOutlineIcon
              className="help"
              fontSize="medium"
            ></HelpOutlineIcon>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ flexGrow: 0, m: 0, mt: 8 }}>
        <Grid container spacing={0}>
          <Grid xs={4}>
            <Item>
              Casual Graph
              <hr />
            </Item>
            <ForceGraph  />
          </Grid>
          <Grid xs={4} >
            <Item>
              {/* <Transfer></Transfer> */}
              Uncertainty
              <hr />
              <Dim_reduction></Dim_reduction>
              <br />
              <Parallel></Parallel>
              {/* Uncertainty Rank
          <hr />
         
        
              {/* rank */}
            </Item>
            <Item>
              
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              {/* <File></File>  */}
              Validation View
              <hr />
            
              <ListRanks></ListRanks>
              {/* <ViolinPlot></ViolinPlot> */}
              <hr></hr>
   
              {/* <Heatmap data={random_data} width={500} height={300} /> */}
              {/* <Scatterplot data={data2} width={500} height={300} /> */}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
