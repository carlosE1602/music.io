import { BrowserRouter } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import Routing from './routes/Routing';

const App = () => {
  return (
    <Box
      sx={{
        scrollbarWidth: 'thin',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cor da thumb
          borderRadius: '4px', // Borda arredondada
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Cor de fundo da barra de rolagem
          borderRadius: '4px', // Borda arredondada
        },
      }}
    >
      <BrowserRouter>
        <CssBaseline />
        <SnackbarProvider autoHideDuration={2000}>
          <Routing />
        </SnackbarProvider>
      </BrowserRouter>
    </Box>
  );
};

export default App;
