import { useState } from 'react';
import { Button, IconButton, MenuItem, Modal, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  CommandType,
  ParameterType,
  ParameterTypes,
} from '../../context/GlobalContext';

export interface NewCommandModalProps {
  open: boolean;
  close: () => void;
  createCommand: (command: CommandType) => void;
}

export default function NewCommandModal({
  open,
  close,
  createCommand,
}: NewCommandModalProps) {
  const [parameters, setParameters] = useState<ParameterType[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: '50%',
    height: 'fit-content',
  };
  return (
    <Modal
      open={open}
      onClick={() => {
        close();
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        style={{ position: 'absolute', ...modalStyle }}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 style={{ textAlign: 'center' }}>New Command</h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            style={{ margin: '0 auto' }}
            label="Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            style={{ margin: '0 auto' }}
            label="Description"
            variant="outlined"
            size="small"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <h3 style={{ textAlign: 'center' }}>Parameters</h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: '0 auto',
            }}
          >
            {parameters.map((parameter, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {index}
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={parameter.name}
                  onChange={(event) => {
                    const newParams = [...parameters];
                    newParams[index].name = event.target.value;
                    setParameters(newParams);
                  }}
                />
                <TextField
                  label="Type"
                  variant="outlined"
                  size="small"
                  value={parameter.type}
                  select
                  onChange={(event) => {
                    const newParams = [...parameters];
                    newParams[index].type = event.target
                      .value as ParameterTypes;
                    setParameters(newParams);
                  }}
                >
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="boolean">Boolean</MenuItem>
                  <MenuItem value="condition">Condition</MenuItem>
                  <MenuItem value="command">Command</MenuItem>
                </TextField>
                <IconButton
                  color="error"
                  style={{
                    backgroundColor: 'darkgray',
                  }}
                  onClick={() => {
                    const newParams = [...parameters];
                    newParams.splice(index, 1);
                    setParameters(newParams);
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            ))}
          </div>
          <Button
            style={{
              backgroundColor: '#303030',
              color: 'white',
              margin: '0 auto',
            }}
            onClick={() =>
              setParameters([...parameters, { name: '', type: 'string' }])
            }
          >
            Add Parameter
          </Button>
          <Button
            style={{
              backgroundColor: '#303030',
              color: 'white',
              margin: '0 auto',
            }}
            onClick={() => {
              createCommand({
                id: 0,
                name,
                description,
                parameters,
              });
              setParameters([]);
              setName('');
              setDescription('');
              close();
            }}
          >
            Create Command
          </Button>
        </div>
      </div>
    </Modal>
  );
}
