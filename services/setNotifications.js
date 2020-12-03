import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import axios from "axios";

export default async () => {
  const prevToken = await AsyncStorage.getItem("notificationToken");
  console.log(prevToken);
  if (prevToken) {
    return;
  }
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
  if (status !== "granted") {
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  await axios.post("http://ralycoding.herokuapp.com/api/tokens", {
    token: { token },
  });
  await AsyncStorage.setItem("notificationToken", token);
};
