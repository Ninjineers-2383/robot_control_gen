import { INamedCommand } from '../../interfaces/ICommand';

interface INamedCommandProps {
  command: INamedCommand;
}

export default function NamedCommand({ command }: INamedCommandProps) {
  return <div>{command.data.name}</div>;
}
