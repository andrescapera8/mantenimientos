import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9C27B0',
    },
    secondary: {
      main: '#5B5B5B',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
