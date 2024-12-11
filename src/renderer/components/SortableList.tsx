import React from 'react';
import { ItemInterface, ReactSortable } from 'react-sortablejs';

interface ISortableListProps {
  setItems: (ItemInterface: ItemInterface[]) => void;
  items: ItemInterface[];
  children: React.JSX.Element[];
}

export default function SortableList({
  items,
  setItems,
  children,
}: ISortableListProps) {
  return (
    <ReactSortable list={items} setList={setItems}>
      {children}
    </ReactSortable>
  );
}
