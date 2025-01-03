import { useContext } from 'react';
import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material';
import { AppContext, ParameterType } from '../../context/GlobalContext';

export interface INamedParameterBoxProps {
  parameter: ParameterType;
  value: any;
  onChange: (value: any) => void;
}

export default function NamedParameterBox({
  parameter,
  value,
  onChange,
}: INamedParameterBoxProps) {
  const { globalState } = useContext(AppContext);

  const getOptions = () => {
    switch (parameter.type) {
      case 'command':
        return globalState.config?.commands?.map((item) => item.name) || [];
      case 'condition':
        return globalState.config?.conditions?.map((item) => item.name) || [];
      default:
        return [];
    }
  };

  const style = {
    width: '15vw',
  };
  switch (parameter.type) {
    case 'string':
    case 'number':
      return (
        <TextField
          label={parameter.name}
          variant="outlined"
          size="small"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={style}
        />
      );
    case 'boolean':
      return (
        <FormControlLabel
          control={<Checkbox value={value} />}
          label={parameter.name}
          style={style}
        />
      );
    case 'command':
    case 'condition':
      return (
        <TextField
          select
          label={parameter.name}
          variant="outlined"
          size="small"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={style}
        >
          {getOptions().map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={{ color: 'blue', backgroundColor: 'lightgray' }}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      );
    default:
      return null;
  }
}
