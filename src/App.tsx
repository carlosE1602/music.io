import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import React from 'react';

import { Box } from '@mui/material';
import logo from '@/assets/imgs/logo.png';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={logo} alt="Logo" width={350} height={100} />
        </Box>
        <Routing />
      </Box>
    </BrowserRouter>
  );
};

export default App;
