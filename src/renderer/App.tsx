import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import GroupEditor from './pages/GroupEditor';
import AppBar from './components/AppBar';
import {
  AppContext,
  globalReducer,
  GlobalState,
} from './context/GlobalContext';
import CommandEditor from './pages/CommandEditor';

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
  const [globalState, updateGlobalState] = useReducer(globalReducer, {
    groups: [],
  } as GlobalState);

  const context = useMemo(
    () => ({ globalState, updateGlobalState }),
    [globalState],
  );

  useEffect(() => {
    window.electron.ipcRenderer.once('load-user-settings', (arg) => {
      const settings = JSON.parse(arg as string);
      updateGlobalState({ type: 'set-project', payload: settings.project });
    });
    window.electron.ipcRenderer.sendMessage('load-user-settings');
  }, [updateGlobalState]);

  useEffect(() => {
    if (globalState.project === undefined) {
      return;
    }

    window.electron.ipcRenderer.once('load-project', (arg) => {
      updateGlobalState({ type: 'load-project', payload: arg });
    });
    window.electron.ipcRenderer.sendMessage(
      'load-project',
      globalState.project,
    );
  }, [globalState.project]);

  const openProject = useCallback(() => {
    window.electron.ipcRenderer.once('project', (arg) => {
      updateGlobalState({ type: 'set-project', payload: arg });
      window.electron.ipcRenderer.sendMessage('save-user-settings', {
        project: arg as string,
      });
    });
    window.electron.ipcRenderer.sendMessage('project');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={context}>
        <div className="main-content">
          <Router>
            <AppBar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Button onClick={openProject} style={{ color: 'wheat' }}>
                      Open Project
                    </Button>
                    <Home />
                  </>
                }
              />
              <Route
                path="/text"
                element={
                  <Typography variant="h6" component="div">
                    Test
                  </Typography>
                }
              />
              <Route path="/edit/:group" element={<GroupEditor />} />
              <Route path="/commands" element={<CommandEditor />} />
            </Routes>
          </Router>
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
