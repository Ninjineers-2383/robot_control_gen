import { Container, Grid, Grid2, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface GlobalState {
  files: string[];
}

export default function Home() {
  const [globalState, setGlobalState] = useState<GlobalState>({ files: [] });

  useEffect(() => {
    window.electron.ipcRenderer.once('files', (arg) => {
      setGlobalState((state) => ({ ...state, files: arg as string[] }));
      console.log(arg);
    });
    window.electron.ipcRenderer.sendMessage('files', [
      'C:\\Users\\lecom\\Documents\\repos\\2025_Base_robot\\src\\main\\deploy\\robotcontrol\\groups',
    ]);
  }, []);

  return (
    <Paper elevation={1} style={{ height: '100vh' }}>
      <Grid2 container justifyContent="center" alignItems="center">
        {globalState.files
          .filter((file) => file.endsWith('.group'))
          .map((file) => file.slice(0, -6))
          .map((file) => (
            <Paper
              elevation={3}
              style={{ padding: 20, backgroundColor: 'cadetblue' }}
              key={file}
            >
              <Link to={`/edit/${file}`}>
                <Container>
                  <Typography variant="h4">{file}</Typography>
                </Container>
              </Link>
            </Paper>
          ))}
      </Grid2>
    </Paper>
  );
}
