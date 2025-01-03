import { Modal } from '@mui/material';
import { useRef, useState } from 'react';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    backgroundColor: 'white',
  };
}

export interface EditGroupNameModalProps {
  close: (name: string) => void;
  open: boolean;
}

export default function EditGroupNameModal({
  close,
  open,
}: EditGroupNameModalProps) {
  const [modalStyle] = useState(getModalStyle);
  const textRef = useRef<HTMLInputElement>(null);
  return (
    <Modal open={open}>
      <div style={{ position: 'absolute', ...modalStyle }}>
        <h1>Edit Group Name</h1>
        <input type="text" ref={textRef} />
        <button
          type="submit"
          onClick={() => textRef.current?.value && close(textRef.current.value)}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
