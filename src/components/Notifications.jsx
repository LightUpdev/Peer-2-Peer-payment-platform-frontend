// src/components/Notifications.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../features/notifications/notificationsSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.notifications);

  const handleClear = () => {
    dispatch(clearNotifications());
  };

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, width: 300 }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            marginBottom: '10px',
            padding: '10px',
            border: `1px solid ${getColor(msg.type)}`,
            borderRadius: '5px',
            backgroundColor: '#fff',
          }}
        >
          <p>{msg.message}</p>
        </div>
      ))}
      {messages.length > 0 && (
        <button onClick={handleClear}>Clear Notifications</button>
      )}
    </div>
  );
};

// Helper function to get color based on notification type
const getColor = (type) => {
  switch (type) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    case 'info':
    default:
      return 'blue';
  }
};

export default Notifications;
