import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { notificationData } from '../../../mocks/data/notification';
import AdNotificationItem from './AdNotificationItem';
import CommentNotificationItem from './CommentNotificationItem';
import FollowNotificationItem from './FollowNotificationItem';
import { Notification } from '../../../types/notification';
import RecommentNotificationItem from './RecommentNotificationItem';

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getUserNotification = async () => {
    const res = await fetch('http://34.22.81.36:3000/notifications/user/648490f8dde175dd0d146256', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setNotifications(data);
  };
  useEffect(() => {
    getUserNotification();
    // setNotifications(notificationData);
  }, []);
  return (
    <NotificationListContainer>
      {notifications.map((data, idx) => {
        if (data.type === 'follow')
          return <FollowNotificationItem key={idx} follower={data.content_user} checked={data.checked} />;
        else if (data.type === 'comment')
          return (
            <CommentNotificationItem
              key={idx}
              commentData={data.content_comment}
              board={data.board}
              checked={data.checked}
            />
          );
        else if (data.type === 'recomment')
          return (
            <RecommentNotificationItem
              key={idx}
              recommentData={data.content_comment}
              board={data.board}
              checked={data.checked}
            />
          );
        else if (data.type === 'ad')
          return <AdNotificationItem key={idx} storeData={data.content_store} checked={data.checked} />;
      })}
    </NotificationListContainer>
  );
};

export default NotificationList;

const NotificationListContainer = styled.section`
  width: 100%;
  height: 100%;
`;
