"use client";

import { Popover, Transition } from "@headlessui/react";
import { useEffect, useState, FC, Fragment } from "react";
import Avatar from "@/shared/Avatar";
import { BellIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";

import { getUserId } from "@/store/slices/userProfileSlice";

interface Props {
  className?: string;
}

const NotifyDropdown: FC<Props> = ({ className = "" }) => {
  const authToken = Cookies.get('authToken');

  console.log(getUserId);

  const [newNotifications, setNewNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]); // initials state of notifications

  const handleMouseEnter = (e: { currentTarget: {
    classList: any; id: any; }; }) => {

    var hoveredElement = e.currentTarget;
        hoveredElement.classList.add("deleteable");
  }

  const handleMouseLeave = (e: { currentTarget: {
    classList:any; id: any; }; }) => {

    var hoveredElement = e.currentTarget;
        hoveredElement.classList.add("deleteable");
  }

  useEffect(() => {
    if (authToken) {
      loadNotificationData();
    }
    else
    {
    // return
    }
  }, [authToken]);

  const loadNotificationData = async () => {
   const data = await fetchNotificationsData();
    
    if (data) {
      data.map((str) => {
        str.time = moment(new Date(str.time)).fromNow();   
      });

      setNotifications(data);
    }
  };

  const fetchNotificationsData = async () => {
    const userId = authToken;

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/auth/getNotifications", {userId:userId})

      if (response) {
       return await response.data[0];
      }
    } catch (error) {
      console.error('Error fetching notification data:', error);
      // alert("Loading notifications failed. Network error. Please contact helpdesk. Error code: 500.");
    } finally {
    }
  };

  const handleItemClick = (item) => {
    if(item.status == 0){ // update db to mark as read/ change 0 to 1
      const idx = notifications.indexOf(item, 0);
      notifications[idx].status = 1;
      setNotifications([...notifications]);
      updateNotification(item.id);

     /* //toddo: test and remove newNotifications logic
      var x = notifications.filter(t => t.status == 0).length;
      updateNotification(item.id);
      setNewNotifications(x);
      */
    } else if (
      item.status == 1) { // do nothing - it is already marked as read
    }
  };

  const handleDeleteClick = (item) => {

    const idx = notifications.indexOf(item, 0);

    setNotifications(prevItems => prevItems.filter((element, elementIndex) => { return elementIndex !== idx  } ));
   
    deleteNotification(item.id);
  };

  const deleteNotification = async(id)=>{
    
    const notificationId = parseInt(id);
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/deleteNotification`, {
      notificationId
    })
    .then((response) => {
      // success
    }).catch(function (error) {
      console.log("Error Received deleting notification");
      console.log(error.response.data.message);
    });
  }

  const updateNotification = async(id)=>{
    
    const notificationId = parseInt(id);
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/updateNotification`, {
      notificationId
    })
    .then((response) => {
      // success
    }).catch(function (error) {
      console.log("Error Received updating notification");
      console.log(error.response.data.message);
    });
  }

  return (
    <>
      <Popover className={`relative flex ${className}`}>
        {({ open }) => (
          <>
            <Popover.Button
              className={` ${
                open ? "" : "text-opacity-90"
              } group self-center w-10 h-10 sm:w-12 sm:h-12 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center justify-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            >
        
            {notifications.filter(t => t.status == 0).length  > 0  || newNotifications && newNotifications > 0? (
                <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span>
            ) : (
              ""
            )}

            <BellIcon className="h-6 w-6" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-xs sm:max-w-sm px-4 top-full -right-28 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                    
                    <h3 className="text-xl font-semibold flex border-b-solid border-b-2">
                    <BellIcon className="h-6 w-6 mr-3" />
                      Notifications
                    {notifications.filter(t => t.status == 0).length  > 0  || newNotifications && newNotifications > 0? (
                      <span>(
                        {notifications.filter(t => t.status == 0).length}
                        )</span>
                    ) : (
                      ""
                    )}
                    </h3>

                    {notifications.length == 0 ? (
                      <div>You have 0 notifications</div>
                    ) : (
                      ""
                    )}
                    {notifications.map((item, index) => (
                      <div
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                        key={index}
                        //href={item.href}
                        onClick={() => handleItemClick(item)}
                        className="notification flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                      >
                        
                        <Avatar
                          imgUrl={item.avatar}
                          sizeClass="w-8 h-8 sm:w-12 sm:h-12"
                        />
                        <div className="ml-3 sm:ml-4 space-y-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {item.name}
                          </p>
                         {/*} <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-nowrap hover:text-balance text-ellipsis overflow-hidden lg:w-96 ">
                            {item.description}
                          </div> */}
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-400">
                            {item.time}
                          </p>
                        </div>  
                        
                        {item.status == 0 ? (
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></span>
                        ) : (
                          ""
                        )}

                      <div className="overlay bg-gray-100">
                          <XCircleIcon className="h-10 w-10 absolute right-2 hover:opacity-100 absolute top-5"
                         onClick={() => handleDeleteClick(item)}                       
                          />
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default NotifyDropdown;