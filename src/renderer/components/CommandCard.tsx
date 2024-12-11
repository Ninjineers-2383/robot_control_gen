import { Paper } from '@mui/material';
import CommandGroup from './CommandGroup';
import ICommandGroup from '../interfaces/ICommandGroup';
import ICommand from '../interfaces/ICommand';

interface ICommandProps {
  command: ICommand;
  setCommandGroup: (
    commandGroupSupplier: (commandGroup: ICommandGroup[]) => ICommandGroup[],
  ) => void;
  commandIds: number[];
}

export default function CommandCard({
  command,
  setCommandGroup,
  commandIds,
}: ICommandProps) {
  switch (command.type) {
    case 'wait':
      return <Paper>Wait for {command.data.seconds} seconds</Paper>;
    case 'sequential':
    case 'deadline':
    case 'parallel':
    case 'race':
      return (
        <CommandGroup
          commandGroup={command as ICommandGroup}
          setCommandGroup={setCommandGroup}
          commandIds={commandIds}
        />
      );
    default:
      return <Paper>{command.type}</Paper>;
  }
}
