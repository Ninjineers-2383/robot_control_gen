import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import GroupEditor from './pages/GroupEditor';

const theme = createTheme({
  palette: {
    primary: {
      main: '#363737',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f9b51b',
      contrastText: '#000',
    },
    background: {
      default: '#363737',
      // Set the default background for papper to be primary dark
      paper: '#262727',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className="main-content">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/text"
              element={
                <Typography variant="h6" component="div">
                  Test
                </Typography>
              }
            />
            <Route path="/edit/:group" element={<GroupEditor />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}
