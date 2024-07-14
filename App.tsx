import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NotificationClickEvent, OneSignal } from "react-native-onesignal";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import { tagUserInfoCreate } from "./src/notifications/notification-tags";
import { useEffect } from "react";

OneSignal.initialize("30ba9539-bad5-4f10-bd5d-44f87e76dec0");
OneSignal.Notifications.requestPermission(true);

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

    tagUserInfoCreate();

    useEffect(() => {
        const handleNotificationClick = (event: NotificationClickEvent) => {
            const { actionId } = event.result;

            switch (actionId) {
                case "1":
                    console.log("Ver todas");
                    break;
                case "2":
                    console.log("Ver pedido");
                    break;
                default:
                    console.log("Nenhum botão de ação selecionado");
            }
        };

        OneSignal.Notifications.addEventListener(
            "click",
            handleNotificationClick
        );

        return () =>
            OneSignal.Notifications.removeEventListener(
                "click",
                handleNotificationClick
            );
    }, []);

    return (
        <NativeBaseProvider theme={THEME}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <CartContextProvider>
                {fontsLoaded ? <Routes /> : <Loading />}
            </CartContextProvider>
        </NativeBaseProvider>
    );
}
