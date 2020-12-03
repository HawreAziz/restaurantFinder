import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import setNotifications from "./services/setNotifications";

import { Icon } from "react-native-elements";

import WellcomeScreen from "./src/screens/WellcomeScreen";
import AuthScreen from "./src/screens/AuthScreen";
import DeckScreen from "./src/screens/DeckScreen";
import MapScreen from "./src/screens/MapScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import SettingScreen from "./src/screens/SettingScreen";
import { Provider } from "react-redux";
import storeConfigure from "./src/store";
import { PersistGate } from "redux-persist/integration/react";

const AppNavigator = createBottomTabNavigator(
  {
    wellcome: { screen: WellcomeScreen },
    auth: { screen: AuthScreen },
    main: {
      screen: createBottomTabNavigator(
        {
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          edit: {
            screen: createStackNavigator(
              {
                review: ReviewScreen,
                setting: SettingScreen,
              },
              {
                navigationOptions: {
                  title: "ReviewJobs",
                  tabBarIcon: ({ tintColor }) => {
                    return <Icon name="favorite" color={tintColor} size={30} />;
                  },
                },
              }
            ),
          },
        },
        { tabBarOptions: { labelStyle: { fontSize: 12 } } }
      ),
    },
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
    navigationOptions: {
      lazy: true,
    },
  }
);

const App = createAppContainer(AppNavigator);
const { store, persistor } = storeConfigure();

export default () => {
  useEffect(() => {
    setNotifications();
    console.log("running");
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  );
};
