import { INamedCommand } from '../../interfaces/ICommand';

interface INamedCommandProps {
  command: INamedCommand;
  onDelete: ((commandIds: number[]) => void) | undefined;
}

export default function NamedCommand({
  command,
  onDelete,
}: INamedCommandProps) {
  return <div>{command.data.name}</div>;
}
