import styled from "@emotion/styled";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const Wrapper = styled.div<{ bottom: number; message_type: string }>`
  min-width: 288px;
  min-height: 60px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  border-radius: 4px;
  background-color: ${(props) =>
    props.message_type === "success"
      ? "rgb(237, 247, 237)"
      : props.message_type === "error"
      ? "rgb(253, 237, 237)"
      : props.message_type === "warning"
      ? "rgb(255, 244, 229)"
      : props.message_type === "default"
      ? "rgb(229, 246, 253)"
      : null};
  color: ${(props) =>
    props.message_type === "success"
      ? "#2e7d32"
      : props.message_type === "error"
      ? "#d32f2f"
      : props.message_type === "warning"
      ? "#ed6c02"
      : props.message_type === "default"
      ? "#0288d1"
      : null};
  border-radius: 4px;
`;

const Title = styled.p`
  margin: 0;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  padding: 10px;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  gap: 10px 0;
  position: absolute;
  right: 1%;
  bottom: 1%;
`;

type NotifyConfig = {
  title?: ReactNode;
  content?: ReactNode;
  type: "default" | "error" | "warning" | "success";
};

type Notification = NotifyConfig & { createdAt: number };

interface NotificationsContextProps {
  notifications: Notification[];
  notify: (args: NotifyConfig) => void;
}

const NotificationsContext = createContext<NotificationsContextProps>({
  notifications: [],
  notify: () => {},
});

export const useNotificationContext = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<{
  children: ReactNode;
  maxNotifications: number;
  delay: number;
}> = ({ children, maxNotifications, delay }) => {
  const [notifications, setNotificationArray] = useState<Notification[]>([]);

  const addNotification = (newNotification: Notification) => {
    setNotificationArray([...notifications, newNotification]);
  };

  useEffect(() => {
    const runHiddeTimer = setInterval(() => {
      if (Array.isArray(notifications)) {
        notifications.forEach((item) => {
          if (Date.now() - delay > item.createdAt) {
            setNotificationArray(
              notifications.filter((notification) => notification !== item)
            );
          }
        });
      }
    }, 10);

    return () => {
      clearInterval(runHiddeTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications?.length]);

  const notify = (args: NotifyConfig) => {
    if (notifications.length < maxNotifications) {
      const newNotification = {
        type: args.type,
        content: args.content,
        title: args.title,
        createdAt: Date.now(),
      };
      addNotification(newNotification);
    }
  };

  return (
    <NotificationsContext.Provider value={{ notifications, notify }}>
      {children}

      <Grid>
        {notifications?.map((notification, idx: number) => {
          return (
            <Wrapper bottom={idx} key={idx} message_type={notification.type}>
              <Title>{notification.title}</Title>

              <Content>{notification.content}</Content>
            </Wrapper>
          );
        })}
      </Grid>
    </NotificationsContext.Provider>
  );
};