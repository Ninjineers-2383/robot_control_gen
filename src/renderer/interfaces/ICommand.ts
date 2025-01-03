import { ParameterTypes } from '../context/GlobalContext';

export type CommandGroupTypes = 'sequential' | 'parallel' | 'race' | 'deadline';
export type NonGroupCommandTypes = 'wait_until' | 'named' | 'wait';
export type CommandTypes = NonGroupCommandTypes | CommandGroupTypes;
export default interface ICommand {
  id: number;
  type: CommandTypes;
  data: any;
}

export interface ICommandParameterValue {
  value: string;
  type: ParameterTypes;
}

export interface INamedCommand extends ICommand {
  type: 'named';
  data: {
    name: string;
    parameters: {
      [parameter: string]: ICommandParameterValue;
    };
  };
}

export interface IWaitUntilCommand extends ICommand {
  type: 'wait_until';
  data: {
    condition: string;
  };
}

export interface IWaitCommand extends ICommand {
  type: 'wait';
  data: {
    duration: number;
  };
}
