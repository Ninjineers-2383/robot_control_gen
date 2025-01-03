import { useCallback, useContext, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  AppContext,
  CommandType,
  ConditionType,
} from '../context/GlobalContext';
import NewCommandModal from '../components/modals/NewCommandModal';

export default function CommandEditor() {
  const { globalState, updateGlobalState } = useContext(AppContext);

  const [newCommandOpen, setNewCommandOpen] = useState(false);

  const addCommand = useCallback(
    (command: CommandType) => {
      updateGlobalState({
        type: 'new-command',
        payload: {
          ...command,
          id: globalState.config?.commands?.length || 0,
        },
      });
    },
    [updateGlobalState, globalState.config?.commands?.length],
  );

  const addCondition = useCallback(() => {
    const condition: ConditionType = {
      id: globalState.config?.conditions?.length || 0,
      name: 'GreaterThan',
      description: 'Check if the value is greater than a certain number',
    };

    updateGlobalState({
      type: 'new-condition',
      payload: condition,
    });
  }, [updateGlobalState, globalState.config?.conditions?.length]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <h1>Command Editor</h1>
        {globalState.config?.commands?.map((command, index) => (
          <div
            key={command.id}
            style={{
              position: 'relative',
              padding: '8px',
              margin: '8px',
              border: '1px solid',
              backgroundColor: 'darkgray',
            }}
          >
            <h2>{command.name}</h2>
            <p>{command.description}</p>
            {command?.parameters?.map((parameter) => (
              <p key={parameter.name}>
                {parameter.name}: {parameter.type}
              </p>
            ))}
            <div
              style={{
                position: 'absolute',
                right: '8px',
                top: '8px',
                margin: '8px',
              }}
            >
              <IconButton
                color="error"
                style={{
                  backgroundColor: 'darkgray',
                }}
                onClick={() => {
                  updateGlobalState({
                    type: 'delete-command',
                    payload: index,
                  });
                }}
              >
                <Delete />
              </IconButton>
            </div>
          </div>
        ))}
        <Button
          style={{ width: '50%', margin: '0 auto' }}
          variant="contained"
          color="primary"
          onClick={() => setNewCommandOpen(true)}
        >
          Add Command
        </Button>
      </div>
      <div
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1>Condition Editor</h1>
        {globalState.config?.conditions?.map((condition) => (
          <div
            key={condition.id}
            style={{
              position: 'relative',
              padding: '8px',
              margin: '8px',
              border: '1px solid',
              backgroundColor: 'darkgray',
            }}
          >
            <h2>{condition.name}</h2>
            <p>{condition.description}</p>
          </div>
        ))}
        <Button
          style={{ width: '50%', margin: '0 auto' }}
          variant="contained"
          color="primary"
          onClick={addCondition}
        >
          Add Condition
        </Button>
      </div>

      <NewCommandModal
        open={newCommandOpen}
        close={() => setNewCommandOpen(false)}
        createCommand={addCommand}
      />
    </div>
  );
}
