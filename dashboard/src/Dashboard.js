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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  
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
    <Box sx={{ flexGrow: 2,m:1,mt:8 }}>
      <Grid container spacing={0}>
        <Grid xs={6}>

          <Item>
            Casual Graph
          <hr />
          <ForceGraph linksData={data.links} nodesData={data.nodes} />
          </Item>
        </Grid>
        <Grid xs={3}>
          <Item>
            {/* <Transfer></Transfer> */}
            Uncertainty Rank
          <hr />
          </Item>
        </Grid>
        <Grid xs>
          <Item>
            {/* <File></File> */}
            Validation View
          <hr />
          </Item>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
