import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import Routing from './routes/Routing';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <SnackbarProvider>
        <Routing />
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
