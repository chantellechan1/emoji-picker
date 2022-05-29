import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import AllUsers from './components/AllUsers';
import CurrentUser from './components/CurrentUser';

function App() {
  return (
    <Grid h='100vh' w='100vw' templateColumns='repeat(3, 1fr)' gap={2}>
      <GridItem colSpan={1} background='blue.100'>
        <CurrentUser />
      </GridItem>
      <GridItem colSpan={2} background='blue.200'>
        <AllUsers />
      </GridItem>
    </Grid>
  );
}

export default App;
