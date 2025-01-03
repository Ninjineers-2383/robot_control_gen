import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ICommandGroup from '../interfaces/ICommandGroup';
import CommandCard from '../components/CommandCard';
import ICommand from '../interfaces/ICommand';
import { AppContext } from '../context/GlobalContext';

export default function GroupEditor() {
  const { globalState } = useContext(AppContext);
  const [group, setGroup] = useState<ICommandGroup[]>([]);

  const { group: groupName } = useParams();

  useEffect(() => {
    window.electron.ipcRenderer.once('group', (arg) => {
      const commandGroup = JSON.parse(arg as string) as ICommandGroup;

      setGroup([commandGroup]);
    });

    window.electron.ipcRenderer.sendMessage(
      'group',
      groupName,
      globalState.project,
    );
  }, [groupName, globalState.project]);

  useEffect(() => {
    if (group.length === 0) {
      return;
    }
    window.electron.ipcRenderer.sendMessage(
      'save-group',
      groupName,
      globalState.project,
      JSON.stringify(group[0], null, 2),
    );
  }, [group, groupName, globalState.project]);

  const setChildCommands = (
    childCommandList: ICommand[],
    commandId: number[],
  ) => {
    setGroup((sourceList) => {
      const tempList = [...sourceList];
      const blockIds = [...commandId];
      const lastId = blockIds.pop();
      let lastArr: ICommand[] = tempList;
      // eslint-disable-next-line no-restricted-syntax
      for (const id of blockIds) {
        lastArr = lastArr.find((item) => item.id === id)?.data?.commands;
      }
      if (lastArr === undefined) {
        throw new Error('lastArr is undefined');
      }

      const lastIndex = lastArr.findIndex((item) => item.id === lastId);

      lastArr[lastIndex] = {
        ...lastArr[lastIndex],
        data: {
          ...lastArr[lastIndex].data,
          commands: childCommandList.filter((item) => item !== undefined),
        },
      };
      return tempList;
    });
  };

  const deleteCommand = (commandId: number[]) => {
    setGroup((sourceList) => {
      const tempList = [...sourceList];
      const blockIds = [...commandId];
      const childId = blockIds.pop();
      const parentId = blockIds.pop();
      let lastArr: ICommand[] = tempList;
      // eslint-disable-next-line no-restricted-syntax
      for (const id of blockIds) {
        lastArr = lastArr.find((item) => item.id === id)?.data?.commands;
      }
      if (lastArr === undefined) {
        throw new Error('lastArr is undefined');
      }

      const lastIndex = lastArr.findIndex((item) => item.id === parentId);

      lastArr[lastIndex] = {
        ...lastArr[lastIndex],
        data: {
          ...lastArr[lastIndex].data,
          commands: lastArr[lastIndex].data.commands.filter(
            (item: ICommand) => item.id !== childId,
          ),
        },
      };
      return tempList;
    });
  };

  return (
    <div>
      {group.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <CommandCard
          key={group[0].id}
          command={group[0]}
          commandIds={[group[0].id as number]}
          setCommandGroup={setGroup}
          setChildren={setChildCommands}
          onDelete={deleteCommand}
        />
      )}
    </div>
  );
}
