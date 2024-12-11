import React from 'react';
import { createPortal } from 'react-dom';
import { Button, IconButton, Typography } from '@mui/material';
import { Add, ArrowDropDown } from '@mui/icons-material';
import { ReactSortable } from 'react-sortablejs';
import ICommandGroup from '../../interfaces/ICommandGroup';
import CommandCard from '../CommandCard';
import ICommand from '../../interfaces/ICommand';

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
  const [open, setOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleAddCommand = (type: String) => {
    return () => {
      setOpen(false);
      let newCommand = {
        type,
        id: Math.floor(Math.random() * 100000),
        data: {},
      } as ICommand;
      if (type === 'named') {
        newCommand = {
          ...newCommand,
          data: { name: 'New Command' },
        };
      } else if (
        type === 'sequential' ||
        type === 'deadline' ||
        type === 'parallel' ||
        type === 'race'
      ) {
        newCommand = {
          ...newCommand,
          data: { commands: [] },
        };
      }

      setCommandGroup((sourceList) => {
        const tempList = [...sourceList];
        const blockIds = [...commandIds];
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
            commands: [...lastArr[lastIndex].data.commands, newCommand],
          },
        };
        return tempList;
      });
    };
  };

  const handleSetType = (
    type: 'parallel' | 'race' | 'deadline' | 'sequential',
  ) => {
    return () => {
      setDropdownOpen(false);

      setCommandGroup((sourceList) => {
        const tempList = [...sourceList];
        const blockIds = [...commandIds];
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
          type,
        };
        return tempList;
      });
    };
  };
  return (
    <div style={{ position: 'relative' }}>
      {open && (
        <>
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'lightgray',
              padding: '25px',
              borderRadius: '15px',
              right: '10%',
              top: '12%',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button
              style={{ backgroundColor: '#303030', color: 'white' }}
              onClick={handleAddCommand('named')}
            >
              Named Command
            </Button>
            <Button
              style={{ backgroundColor: '#303030', color: 'white' }}
              onClick={handleAddCommand('sequential')}
            >
              Command Group
            </Button>
          </div>
          {/* Background screen to detect clicks off */}
          {createPortal(
            <div
              role="button"
              tabIndex={0}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99,
              }}
              onClick={() => setOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                  setOpen(false);
                }
              }}
            >
              {}
            </div>,
            document.body,
          )}
        </>
      )}
      <div>
        <div
          style={{
            position: 'absolute',
            right: '8px',
            margin: '8px',
          }}
        >
          <IconButton
            color="primary"
            style={{
              backgroundColor: 'darkgray',
            }}
            onClick={() => {
              // only add a new command menu
              setOpen(true);
            }}
          >
            <Add />
          </IconButton>
        </div>
        <div
          role="button"
          tabIndex={-1}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          onKeyDown={() => {
            setDropdownOpen(!dropdownOpen);
          }}
        >
          <Typography variant="h4" color="black" marginLeft="8px">
            {commandGroup.type}
          </Typography>
          <ArrowDropDown />
        </div>
        {dropdownOpen && (
          <>
            <div
              style={{
                position: 'absolute',
                backgroundColor: 'lightgray',
                padding: '25px',
                borderRadius: '15px',
                right: '10%',
                top: '12%',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Button
                style={{ backgroundColor: '#303030', color: 'white' }}
                onClick={handleSetType('sequential')}
              >
                Sequential Command Group
              </Button>
              <Button
                style={{ backgroundColor: '#303030', color: 'white' }}
                onClick={handleSetType('parallel')}
              >
                Parallel Command Group
              </Button>
              <Button
                style={{ backgroundColor: '#303030', color: 'white' }}
                onClick={handleSetType('deadline')}
              >
                Deadline Command Group
              </Button>
              <Button
                style={{ backgroundColor: '#303030', color: 'white' }}
                onClick={handleSetType('race')}
              >
                Race Command Group
              </Button>
            </div>

            {createPortal(
              <div
                role="button"
                tabIndex={0}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 99,
                }}
                onClick={() => setDropdownOpen(false)}
                onKeyDown={(e) => {
                  if (
                    e.key === 'Escape' ||
                    e.key === 'Enter' ||
                    e.key === ' '
                  ) {
                    setDropdownOpen(false);
                  }
                }}
              >
                {}
              </div>,
              document.body,
            )}
          </>
        )}
      </div>
      <div style={{ paddingLeft: '8px', paddingBottom: '4px' }}>
        <ReactSortable
          list={commandGroup.data.commands}
          setList={(currentList) => {
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
                throw new Error('lastArr is undefined');
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
          animation={150}
          ghostClass="ghost"
          fallbackOnBody
          swapThreshold={0.65}
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
