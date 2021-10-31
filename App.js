import React from "react";
import { View, StyleSheet, ActivityIndicator, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors, typography } from "./src/theme";
import FlashMessage from "react-native-flash-message";
import Loading from "./src/components/loading";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Home from "./src/screens/Home";
import Create from "./src/screens/Create";
import Update from "./src/screens/Update";
import { LogBox } from "react-native";
import { firebase } from "./src/config";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

const signupHeaderOptions = {
  title: "Sign up",
  headerStyle: { backgroundColor: colors.white },
  headerTitleStyle: { fontFamily: typography.bold },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    "EncodeSans-Medium": require("./assets/fonts/EncodeSans-SemiBold.ttf"),
    "EncodeSans-Bold": require("./assets/fonts/EncodeSans-Bold.ttf"),
    "EncodeSans-Regular": require("./assets/fonts/EncodeSans-Regular.ttf"),
  });

  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(false);

  function authStateChange(user) {
    setUser(user);
    setLoading(false);
  }

  React.useEffect(() => {
    const subscribe = firebase.auth().onAuthStateChanged(authStateChange);
    return subscribe;
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!fontsLoaded) {
    return <Loading />;
  } else {
    return (
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Create" options={{ headerShown: false }}>
                {(props) => <Create {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Update" options={{ headerShown: false }}>
                {(props) => <Update {...props} user={user} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={signupHeaderOptions}
              />
            </>
          )}
        </Stack.Navigator>
        <StatusBar
          backgroundColor={colors.lightGreen}
          barStyle="light-content"
        />
        <FlashMessage position="top" floating={true} />
      </NavigationContainer>
    );
  }
}
