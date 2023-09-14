import { Alert } from '@mui/material';

interface Props {
  notificationMessage: string;
}

const Notification = ({ notificationMessage }: Props) => {
  return (
    <>
      {notificationMessage ? (
        <Alert severity='error' sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

export default Notification;
