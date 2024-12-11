import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import ICommandGroup from '../interfaces/ICommandGroup';
import CommandCard from '../components/CommandCard';

export default function GroupEditor() {
  const [group, setGroup] = useState<ICommandGroup[]>([]);

  const { group: groupName } = useParams();

  useEffect(() => {
    window.electron.ipcRenderer.once('group', (arg) => {
      const commandGroup = JSON.parse(arg as string) as ICommandGroup;

      setGroup([commandGroup]);

      console.log(commandGroup);
    });

    window.electron.ipcRenderer.sendMessage('group', groupName);
  }, [groupName]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('save-group', [
      groupName,
      JSON.stringify(group[0], null, 2),
    ]);
  }, [group, groupName]);

  return (
    <div>
      {group && (
        <ReactSortable
          list={group}
          setList={setGroup}
          animation={150}
          fallbackOnBody
          swapThreshold={0.65}
          ghostClass="ghost"
        >
          {group.map((block) => (
            <CommandCard
              key={block.id}
              command={block}
              commandIds={[block.id as number]}
              setCommandGroup={setGroup}
            />
          ))}
        </ReactSortable>
      )}
    </div>
  );
}
