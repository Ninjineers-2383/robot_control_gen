import { Container, Grid2, IconButton, Paper, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Add, Delete, EditNote } from '@mui/icons-material';
import EditGroupNameModal from '../components/modals/EditGroupNameModal';
import { AppContext } from '../context/GlobalContext';

export default function Home() {
  const { globalState } = useContext(AppContext);
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);

  const [newOpen, setNewOpen] = useState(false);

  const [editOldName, setEditOldName] = useState('');

  const renameCallback = (name: string) => {
    setEditOpen(false);
    window.electron.ipcRenderer.sendMessage(
      'rename-group',
      globalState.project,
      editOldName,
      name,
    );

    window.location.reload();
  };

  const createCallback = (name: string) => {
    setNewOpen(false);
    window.electron.ipcRenderer.sendMessage(
      'create-group',
      globalState.project,
      name,
    );
    navigate(`/edit/${name}`);
  };

  return (
    <>
      <Paper elevation={1} style={{ padding: 20 }}>
        <Grid2 container justifyContent="center" alignItems="center">
          {globalState.groups
            .filter((file) => file.endsWith('.group'))
            .map((file) => file.slice(0, -6))
            .map((file) => (
              <Paper
                elevation={3}
                style={{ padding: 5, backgroundColor: 'cadetblue' }}
                key={file}
              >
                <Container onClick={() => navigate(`/edit/${file}`)}>
                  <Typography variant="h4">{file}</Typography>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        setEditOpen(true);
                        setEditOldName(file);
                      }}
                    >
                      <EditNote />
                    </IconButton>
                  </div>
                </Container>
              </Paper>
            ))}
        </Grid2>
        <IconButton
          color="info"
          size="large"
          style={{ position: 'absolute', bottom: 20, right: 20 }}
          onClick={() => setNewOpen(true)}
        >
          <Add />
        </IconButton>
      </Paper>
      <EditGroupNameModal open={editOpen} close={renameCallback} />

      <EditGroupNameModal open={newOpen} close={createCallback} />
    </>
  );
}
