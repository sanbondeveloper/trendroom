import { useContext } from 'react';

import { NotificationValueContext } from '@/store/notification-context';

function useNotificationValue() {
  const value = useContext(NotificationValueContext);

  if (value === undefined) {
    throw new Error('useNotificationValue 오류');
  }

  return value;
}

export default useNotificationValue;
