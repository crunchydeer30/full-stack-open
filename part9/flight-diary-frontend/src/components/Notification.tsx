import { NotificationProps } from '../types'

const Notification = (props: NotificationProps) => {
  if (props.message)
    return <div className='notification'>{props.message}</div>
  return null;
}

export default Notification;