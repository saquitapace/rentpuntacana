import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserId } from '../store/slices/userProfileSlice';

interface NotifyDropdownProps {
  className?: string;
}

const NotifyDropdown: FC<NotifyDropdownProps> = ({ className = "" }) => {
  const userId = useSelector(getUserId);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    if (userId) {
      // Fetch notifications only if userId exists
      const fetchNotifications = async () => {
        try {
          const response = await fetch(`/api/auth/getNotifications?userId=${userId}`);
          const data = await response.json();
          setNotifications(data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      
      fetchNotifications();
    }
  }, [userId]);

  return (
    <div className={`nc-NotifyDropdown ${className}`}>
      {/* Your notification UI here */}
    </div>
  );
};

export default NotifyDropdown; 