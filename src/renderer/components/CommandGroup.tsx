import { Typography } from '@mui/material';
import { ReactSortable } from 'react-sortablejs';
import ICommandGroup from '../interfaces/ICommandGroup';
import CommandCard from './CommandCard';
import ICommand from '../interfaces/ICommand';

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
};

interface ICommandGroupProps {
  commandGroup: ICommandGroup;
  setCommandGroup: (
    commandGroupSupplier: (commandGroup: ICommandGroup[]) => ICommandGroup[],
  ) => void;
  commandIds: number[];
}

export default function CommandGroup({
  commandGroup,
  setCommandGroup,
  commandIds,
}: ICommandGroupProps) {
  return (
    <div>
      <Typography variant="h4">{commandGroup.type}</Typography>
      <div style={{ paddingLeft: '8px' }}>
        <ReactSortable
          list={commandGroup.data.commands}
          setList={(currentList) => {
            console.log(currentList);
            setCommandGroup((sourceList) => {
              const tempList = [...sourceList];
              const blockIds = [...commandIds];
              const lastId = blockIds.pop();
              let lastArr: ICommand[] = tempList;
              // eslint-disable-next-line no-restricted-syntax
              for (const id of blockIds) {
                lastArr = lastArr.find((item) => item.id === id)?.data
                  ?.commands;
              }
              if (lastArr === undefined) {
                console.error('lastArr is undefined');
                return tempList;
              }

              const lastIndex = lastArr.findIndex((item) => item.id === lastId);

              lastArr[lastIndex] = {
                ...lastArr[lastIndex],
                data: {
                  ...lastArr[lastIndex].data,
                  commands: currentList.filter((item) => item !== undefined),
                },
              };
              return tempList;
            });
          }}
          {...sortableOptions}
        >
          {commandGroup.data.commands.map((item) => (
            <CommandCard
              key={item.id}
              command={item}
              setCommandGroup={setCommandGroup}
              commandIds={[...commandIds, item.id as number]}
            />
          ))}
        </ReactSortable>
      </div>
    </div>
  );
}
