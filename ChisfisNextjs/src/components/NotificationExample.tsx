'use client'

import { useNotifications } from "reapop";

export default function NotificationExample(){
    const { notify } = useNotifications();
    return (
        <button className="bg-blue-500 text-white px-4 py-2 flex rounded-md text-center items-center justify-center" onClick={() => {
            notify({
            title: 'Hello',
            message: 'This is a notification',
            status: 'success'
        })
        notify('Top center notification', 'success', { position: 'top-center' });
        notify('Top right notification', 'info', { position: 'top-right' });
        notify('Bottom left notification', 'warning', { position: 'bottom-left' });
        }}>
            Notify
        </button>
    )
}