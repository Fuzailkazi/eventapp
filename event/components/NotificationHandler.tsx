import React, { useEffect } from "react";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
interface NotificationHandlerProps {
  children: React.ReactNode;
}

export function NotificationHandler({ children }: NotificationHandlerProps) {
  useEffect(() => {
    // Request permissions
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Notifications Disabled",
            "Enable notifications to stay updated on event messages and updates."
          );
        }
      }
    };

    requestPermissions();

    // Listen for notifications
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Handle received notification while app is open
        console.log("Notification received:", notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle notification tap
        const data = response.notification.request.content.data;
        if (data?.eventId) {
          // Navigate to event or chat based on notification type
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return <>{children}</>;
}

// Helper functions for sending notifications
export const sendNotification = async (
  title: string,
  body: string,
  data?: any
) => {
  if (Platform.OS !== "web") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null, // Send immediately
    });
  }
};

export const scheduleEventReminder = async (
  eventTitle: string,
  eventDate: Date
) => {
  if (Platform.OS !== "web") {
    const reminderTime = new Date(eventDate.getTime() - 30 * 60 * 1000); // 30 minutes before

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Event Starting Soon!",
        body: `${eventTitle} starts in 30 minutes`,
      },
      trigger: { date: reminderTime },
    });
  }
};
