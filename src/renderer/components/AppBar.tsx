import { useNavigate } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function AppBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Drawer
          </Typography>
          <Button
            color="info"
            disableRipple
            onClick={() => {
              setOpen(false);
              navigate('/');
            }}
          >
            Home
          </Button>

          <Button
            color="info"
            disableRipple
            onClick={() => {
              setOpen(false);
              navigate('/commands');
            }}
          >
            Command Editor
          </Button>
        </div>
      </Drawer>
    </MuiAppBar>
  );
}
