import { Paper } from '@mui/material';
import ICommandGroup from '../interfaces/ICommandGroup';
import ICommand, { INamedCommand } from '../interfaces/ICommand';
import { WaitCommand, CommandGroup } from './commands';
import NamedCommand from './commands/NamedCommand';

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
  // Lighter grey for even rows, darker for odd rows
  const backgroundColor = commandIds.length % 2 === 0 ? '#f0f0f0' : '#e0e0e0';

  const commandRenderer = (() => {
    switch (command.type) {
      case 'wait':
        return <WaitCommand />;
      case 'named':
        return <NamedCommand command={command as INamedCommand} />;
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
        return <div>Unknown command type: {command.type}</div>;
    }
  })();

  return (
    <Paper style={{ backgroundColor, margin: '8px 0 8px 0' }} elevation={5}>
      {commandRenderer}
    </Paper>
  );
}
