import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../theme";
import Text from "../components/text/text";
import Input from "../components/input";
import PasswordInput from "../components/password-input";
import Button from "../components/button";
import { firebase } from "../config";
import LogService from "../services/LogService";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const login = () => {
    if(email == null || password == null) {
        LogService.showWarningMessage("Please input both email and password");
        return
    }

    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        LogService.showSuccessMessage("Successfully logged in");
        setLoading(false);
      })
      .catch((error) => {
        LogService.showErrorMessage(error.message);
        setLoading(false);
      });
  };

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../../assets/login.png")}
        />
        <Text preset="medium" style={styles.title}>
          Never forget your notes
        </Text>
      </View>
      <View style={styles.body}>
        <Input
          placeholder="Email address"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <PasswordInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color={colors.lightGreen}
          />
        ) : (
          <Button title="Login" customStyles={styles.button} onPress={login} />
        )}
      </View>
      <View style={styles.footer}>
        <Text preset="medium" style={styles.footerText}>
          Don’t have an account?{" "}
        </Text>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text preset="medium" style={styles.footerSubText}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  image: {
    height: 300,
    width: "100%",
    marginTop: spacing[5],
  },
  title: {
    textAlign: "center",
  },
  body: {
    margin: spacing[7],
  },
  button: {
    marginTop: spacing[7],
    alignSelf: "center",
  },
  activityIndicator: {
    marginTop: spacing[7],
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: spacing[4],
  },
  footerText: {
    textAlign: "center",
  },
  footerSubText: {
    color: colors.lightGreen,
  },
});
