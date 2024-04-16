import { useContext } from 'react';

import { NotificationActionsContext } from '@/store/notification-context';

function useNotificationActions() {
  const value = useContext(NotificationActionsContext);

  if (value === null) {
    throw new Error('useNotificationActions 오류');
  }

  return value;
}

export default useNotificationActions;
