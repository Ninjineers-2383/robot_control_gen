import ICommand from './ICommand';

export default interface ICommandGroup extends ICommand {
  type: 'sequential' | 'parallel' | 'race' | 'deadline';
  data: {
    commands: ICommand[];
  };
}
