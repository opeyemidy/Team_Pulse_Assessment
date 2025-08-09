import { useState, useEffect, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServerNotification {
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    dismissible?: boolean;
    autoHide?: boolean;
    duration?: number;
}

interface NotificationCardProps {
    notifications: ServerNotification[];
    onDismiss?: (id: string) => void;
    className?: string;
}

const notificationIcons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const notificationStyles = {
    success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
    error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
    info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
};

export function NotificationCard({ notifications, onDismiss, className }: NotificationCardProps) {
    const [visibleNotifications, setVisibleNotifications] = useState<ServerNotification[]>(notifications);
    const handleDismiss = useCallback((id: string) => {
        setVisibleNotifications(prev => prev.filter(n => n.id !== id));
        onDismiss?.(id);
    }, [onDismiss]);
    useEffect(() => {
        setVisibleNotifications(notifications);

        // Auto-hide notifications
        notifications.forEach(notification => {
            if (notification.autoHide && notification.duration) {
                setTimeout(() => {
                    handleDismiss(notification.id);
                }, notification.duration);
            }
        });
    }, [handleDismiss, notifications]);



    if (visibleNotifications.length === 0) {
        return null;
    }

    return (
        <div className={cn("space-y-3", className)}>
            {visibleNotifications.map((notification) => {
                const Icon = notificationIcons[notification.type];

                return (
                    <Alert
                        key={notification.id}
                        className={cn(
                            "relative",
                            notificationStyles[notification.type]
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        <div className="flex-1">
                            <AlertTitle className="mb-1">{notification.title}</AlertTitle>
                            <AlertDescription>{notification.message}</AlertDescription>
                        </div>
                        {notification.dismissible && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 h-6 w-6 p-0 text-current hover:bg-current/10"
                                onClick={() => handleDismiss(notification.id)}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Dismiss notification</span>
                            </Button>
                        )}
                    </Alert>
                );
            })}
        </div>
    );
}

// Hook for managing server-side notifications
export function useServerNotifications() {
    const [notifications, setNotifications] = useState<ServerNotification[]>([]);

    const addNotification = (notification: Omit<ServerNotification, 'id'>) => {
        const newNotification: ServerNotification = {
            ...notification,
            id: Math.random().toString(36).substr(2, 9),
            dismissible: notification.dismissible ?? true,
            autoHide: notification.autoHide ?? true,
            duration: notification.duration ?? 5000,
        };

        setNotifications(prev => [...prev, newNotification]);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return {
        notifications,
        addNotification,
        removeNotification,
        clearAll,
    };
}