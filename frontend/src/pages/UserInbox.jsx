import { useState } from "react";
import { Bell, Mail } from "lucide-react";

const UserInbox = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your order has been shipped!", unread: true },
    { id: 2, message: "New promotional offer available.", unread: false },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "Support", content: "Your ticket has been resolved.", unread: true },
    { id: 2, sender: "John Doe", content: "Hey, how's it going?", unread: false },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length + messages.filter((m) => m.unread).length;

  return (
    <div className="relative">
      <button className="relative flex items-center space-x-2 p-2 rounded-lg bg-white shadow-md">
        <Bell className="w-6 h-6 text-gray-700" />
        <Mail className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {unreadCount}
          </span>
        )}
      </button>
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 hidden group-hover:block">
        <h4 className="font-semibold text-gray-700">Notifications</h4>
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <p key={note.id} className={`text-sm ${note.unread ? "font-bold" : "text-gray-500"}`}>
              {note.message}
            </p>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No new notifications</p>
        )}
        <h4 className="mt-2 font-semibold text-gray-700">Messages</h4>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <p key={msg.id} className={`text-sm ${msg.unread ? "font-bold" : "text-gray-500"}`}>
              {msg.sender}: {msg.content}
            </p>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No new messages</p>
        )}
      </div>
    </div>
  );
};

export default UserInbox;