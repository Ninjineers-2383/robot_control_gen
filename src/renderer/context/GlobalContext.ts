import React from 'react';

export type ParameterTypes =
  | 'string'
  | 'number'
  | 'boolean'
  | 'condition'
  | 'command';

export interface ParameterType {
  name: string;
  type: ParameterTypes;
}

export interface CommandType {
  id: number;
  name: string;
  description: string;
  parameters: ParameterType[];
}

export interface ConditionType {
  id: number;
  name: string;
  description: string;
}

export interface ProjectConfig {
  commands: CommandType[];
  conditions: ConditionType[];
}

export interface GlobalStateAction {
  type: string;
  payload: any;
}

export interface GlobalState {
  groups: string[];
  project?: string;
  config?: ProjectConfig;
}

export interface GlobalContext {
  globalState: GlobalState;
  updateGlobalState: React.Dispatch<GlobalStateAction>;
}

export const AppContext = React.createContext<GlobalContext>(undefined as any);

export function globalReducer(
  state: GlobalState,
  action: GlobalStateAction,
): GlobalState {
  let newState: GlobalState;
  switch (action.type) {
    case 'set-project':
      newState = { ...state, project: action.payload };
      break;
    case 'load-project':
      newState = { ...state, ...action.payload };
      break;
    case 'new-command':
      newState = {
        ...state,
        config: {
          ...state.config,
          commands: [...(state.config?.commands || []), action.payload],
          conditions: state.config?.conditions || [],
        },
      };
      break;
    case 'new-condition':
      newState = {
        ...state,
        config: {
          ...state.config,
          commands: state.config?.commands || [],
          conditions: [...(state.config?.conditions || []), action.payload],
        },
      };
      break;
    case 'delete-command':
      newState = {
        ...state,
        config: {
          ...state.config,
          commands: [
            ...(state.config?.commands?.slice(0, action.payload) || []),
            ...(state.config?.commands?.slice(action.payload + 1) || []),
          ],
          conditions: state.config?.conditions || [],
        },
      };
      break;
    default:
      return state;
  }

  window.electron.ipcRenderer.sendMessage('save-config', newState);

  return newState;
}
