import NotificationContext from '../context/NotificationContext';
import { useContext } from 'react';
import { Alert } from '@mui/material';
import { Container } from '@mui/material';

const Notification = () => {
  const notification = useContext(NotificationContext)[0];

  if (!notification) return;

  return (
    <Container>
      <Alert severity={notification.type}>{notification.message}</Alert>
    </Container>
  );
};

export default Notification;
