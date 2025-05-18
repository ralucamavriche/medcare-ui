import { createContext, useContext, useState } from "react";

interface NotificationContextProps {
  postNotifications: number;
  increment: () => void;
  clear: () => void;
}
interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [postNotifications, setPostNotifications] = useState(0);

  const increment = () => setPostNotifications((prev) => prev + 1);
  const clear = () => setPostNotifications(0);

  return (
    <NotificationContext.Provider
      value={{ postNotifications, increment, clear }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  return context;
};
