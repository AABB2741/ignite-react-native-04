import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        user_name: "Mario",
        user_email: "mario@worxbase.com",
    });
}

export async function tagCartUpdate(itemsCount: string) {
    OneSignal.User.addTag("cart_items_count", itemsCount);
}
