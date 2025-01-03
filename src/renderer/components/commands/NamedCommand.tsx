import { Fragment, useContext, useMemo } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import ICommand, { INamedCommand } from '../../interfaces/ICommand';
import { AppContext, ParameterTypes } from '../../context/GlobalContext';
import NamedParameterBox from './NamedParameterBox';
import ICommandGroup from '../../interfaces/ICommandGroup';

interface INamedCommandProps {
  command: INamedCommand;
  commandIds: number[];
  onDelete: (commandIds: number[]) => void;
  setCommandGroup: (
    commandGroupSupplier: (commandGroup: ICommandGroup[]) => ICommandGroup[],
  ) => void;
}

export default function NamedCommand({
  command,
  onDelete,
  commandIds,
  setCommandGroup,
}: INamedCommandProps) {
  const { globalState } = useContext(AppContext);

  const commandType = useMemo(() => {
    return globalState.config?.commands?.find(
      (item) => item.name === command.data.name,
    );
  }, [command, globalState.config?.commands]);

  const onChange = (
    value: string,
    parameterName: string,
    parameterType: ParameterTypes,
    isName?: boolean,
  ) => {
    setCommandGroup((sourceList) => {
      const tempList = [...sourceList];
      const blockIds = [...commandIds];
      const lastId = blockIds.pop();
      let lastArr: ICommand[] = tempList;
      // eslint-disable-next-line no-restricted-syntax
      for (const id of blockIds) {
        lastArr = lastArr.find((item) => item.id === id)?.data?.commands;
      }
      if (lastArr === undefined) {
        throw new Error('lastArr is undefined');
      }

      const lastIndex = lastArr.findIndex((item) => item.id === lastId);

      if (isName) {
        lastArr[lastIndex] = {
          ...lastArr[lastIndex],
          data: {
            ...lastArr[lastIndex].data,
            name: value,
          },
        };
        return tempList;
      }

      lastArr[lastIndex] = {
        ...lastArr[lastIndex],
        data: {
          ...lastArr[lastIndex].data,
          parameters: {
            ...lastArr[lastIndex].data?.parameters,
            [parameterName]: {
              value,
              type: parameterType,
            },
          },
        } as INamedCommand['data'],
      };
      return tempList;
    });
  };

  return commandType !== undefined ? (
    <div
      style={{
        border: '1px solid black',
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '8px',
          margin: '8px',
        }}
      >
        {commandIds.length > 1 && (
          <IconButton
            color="error"
            style={{
              backgroundColor: 'darkgray',
            }}
            onClick={() => {
              // only add a new command menu
              onDelete(commandIds);
            }}
          >
            <Delete />
          </IconButton>
        )}
      </div>
      <NamedParameterBox
        parameter={{ type: 'command', name: 'name' }}
        value={command.data.name}
        onChange={(value) => onChange(value, 'name', 'command', true)}
      />
      <span style={{ marginLeft: '10px' }} />:
      {commandType.parameters.map((arg) => (
        <Fragment key={arg.name}>
          <span style={{ marginLeft: '10px' }} />
          <NamedParameterBox
            parameter={arg}
            value={command.data?.parameters?.[arg.name]?.value}
            onChange={(value) => onChange(value, arg.name, arg.type)}
          />
        </Fragment>
      ))}
    </div>
  ) : (
    <p>Command Not Found: {command.data.name}</p>
  );
}
