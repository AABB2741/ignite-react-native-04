import { useTheme } from "native-base";
import {
    DefaultTheme,
    LinkingOptions,
    NavigationContainer,
} from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import {
    NotificationWillDisplayEvent,
    OneSignal,
    OSNotification,
} from "react-native-onesignal";
import { Notification } from "../components/Notification";

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ["igniteshoes://", "com.rocketseat.igniteshoes://"],
    config: {
        screens: {
            details: {
                path: "/details/:productId",
                parse: {
                    productId: (productId: string) => productId,
                },
            },
        },
    },
};

export function Routes() {
    const { colors } = useTheme();
    const [notification, setNotification] = useState<OSNotification>();

    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    useEffect(() => {
        const handleNotification = (event: NotificationWillDisplayEvent) => {
            event.preventDefault();
            const response = event.getNotification();
            console.log("Notificação recebida");
            console.log(response);
            setNotification(response);
        };

        OneSignal.Notifications.addEventListener(
            "foregroundWillDisplay",
            handleNotification
        );

        return () =>
            OneSignal.Notifications.removeEventListener(
                "foregroundWillDisplay",
                handleNotification
            );
    }, []);

    return (
        <NavigationContainer theme={theme} linking={linking}>
            <AppRoutes />

            {notification && (
                <Notification
                    data={notification}
                    onClose={() => setNotification(undefined)}
                />
            )}
        </NavigationContainer>
    );
}
