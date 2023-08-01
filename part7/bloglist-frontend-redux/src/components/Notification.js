import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification) return;

  return (
    <Container
      className={
        notification.type === 'error'
          ? 'alert alert-dismissible alert-danger my-2'
          : 'alert alert-dismissible alert-success my-2'
      }
    >
      {notification.message}
    </Container>
  );
};

export default Notification;
