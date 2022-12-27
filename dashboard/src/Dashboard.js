import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Consequence from './logo.png'
import './dashboard.css'
import picGraph from './graph.png'
import File from './file.png'
import Transfer from './transfer.png'
import GTranslateIcon from '@mui/icons-material/GTranslate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {ForceGraph} from './CasualGraph/ForceGraph'
import data from './data/data.json';
import data2 from './data/data2.json';
import { Rank } from './Uncertainty_rank/Rank';
import ViolinPlot from './Validation_view/Violinplot';
import { Heatmap } from './Validation_view/Heatmap/Heatmap';
import { random_data } from './data/data'; 
import { Scatterplot } from './Validation_view/Scatterplot/Scatterplot';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
let edgeCount = 5
export default function AutoGrid() {
  const numbers = [1,2,3,4,5];
  const total = 250;
  let random_number = [];
  for (let x = 0; x < edgeCount; x++) {
      random_number.push(Math.floor(Math.random() * total + 1));
      console.log(random_number[x]);
  }
  const listRanks = numbers.map((number)=>
    
    <Rank A={"A"} B={"B"} x={0} y={5} full={total} data={random_number[number-1]}></Rank>
  )
  
  return (
    <>
    <AppBar sx={{bgcolor:"#384142",height: '60px'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img className="logo" src={Consequence} alt=""/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 200,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CasualLens
          </Typography>
          <GTranslateIcon className='translate' fontSize='medium'></GTranslateIcon>
          <HelpOutlineIcon className='help' fontSize='medium'></HelpOutlineIcon>
        </Toolbar>
      </Container>
    </AppBar>
     <Box sx={{ flexGrow: 0,m:0,mt:8 }}>
      <Grid container spacing={0}>
        <Grid xs={4}>

          <Item>
            Casual Graph
          <hr /> 
        
         </Item> 
         <ForceGraph linksData={data.links} nodesData={data.nodes} />
        </Grid>
        <Grid xs={3}>
          <Item> 
            {/* <Transfer></Transfer> */}
             Uncertainty Rank
          <hr />
         <Typography> #Edges:{edgeCount}</Typography>
          {/* rank */}
          {listRanks}
          {/* <Rank A={"A"} B={"B"} x={0} y={10}></Rank> */}
          </Item>
        </Grid>
        <Grid xs>
          <Item>
            {/* <File></File> */}
             Validation View
          <hr />
          <ViolinPlot></ViolinPlot>
          {/* <hr></hr> */}
          <Heatmap data={random_data} width={500} height={300} />
          
          <Scatterplot data={data2} width={500} height={300} />
          </Item>
        </Grid>
      </Grid>
        </Box>
    </>  
  );
}
