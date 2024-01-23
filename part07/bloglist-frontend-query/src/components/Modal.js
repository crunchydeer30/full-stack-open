import { useState, forwardRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Modal = forwardRef(
  ({ children, title = 'Modal', buttonLabel = 'Show' }, refs) => {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
      setShow(!show);
    };

    useImperativeHandle(refs, () => {
      return {
        toggleShow,
      };
    });

    return (
      <div>
        <Button variant='outlined' onClick={toggleShow}>
          {buttonLabel}
        </Button>
        <Dialog open={show} onClose={toggleShow}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
        </Dialog>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
