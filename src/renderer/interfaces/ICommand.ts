export default interface ICommand {
  id: number;
  type:
    | 'wait_until'
    | 'named'
    | 'wait'
    | 'sequential'
    | 'parallel'
    | 'race'
    | 'deadline';
  data: any;
}

export interface INamedCommand extends ICommand {
  type: 'named';
  data: {
    name: string;
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
