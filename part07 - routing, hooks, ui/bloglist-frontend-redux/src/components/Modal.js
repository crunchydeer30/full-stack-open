import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';
import { Modal as ModalBS } from 'react-bootstrap';

const Modal = forwardRef(
  (
    { children, theme = 'primary', title = 'Modal', buttonLabel = 'Show' },
    refs
  ) => {
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
      <>
        <Button variant={theme} onClick={toggleShow}>
          {buttonLabel}
        </Button>

        <ModalBS show={show} onHide={toggleShow}>
          <ModalBS.Header closeButton>
            <ModalBS.Title>{title}</ModalBS.Title>
          </ModalBS.Header>
          <ModalBS.Body>{children}</ModalBS.Body>
        </ModalBS>
      </>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
