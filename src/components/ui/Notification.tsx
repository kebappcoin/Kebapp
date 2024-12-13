import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
};

const colors = {
  success: 'bg-green-500/10 text-green-500 border-green-500/20',
  error: 'bg-red-500/10 text-red-500 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
};

export function NotificationList() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map(({ id, type, message }) => {
        const Icon = icons[type];
        return (
          <div
            key={id}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg border
              animate-slide-in backdrop-blur-sm
              ${colors[type]}
            `}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{message}</p>
            <button
              onClick={() => removeNotification(id)}
              className="ml-auto hover:opacity-70 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}