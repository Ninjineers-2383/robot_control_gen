import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ICommandGroup from '../interfaces/ICommandGroup';
import CommandCard from '../components/CommandCard';

export default function GroupEditor() {
  const [group, setGroup] = useState<ICommandGroup[]>([]);

  const { group: groupName } = useParams();

  useEffect(() => {
    window.electron.ipcRenderer.once('group', (arg) => {
      const commandGroup = JSON.parse(arg as string) as ICommandGroup;

      setGroup([commandGroup]);
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
      {group.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <CommandCard
          key={group[0].id}
          command={group[0]}
          commandIds={[group[0].id as number]}
          setCommandGroup={setGroup}
        />
      )}
    </div>
  );
}
