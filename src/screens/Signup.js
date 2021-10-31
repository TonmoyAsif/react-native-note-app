import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../theme";
import Text from "../components/text/text";
import Input from "../components/input";
import PasswordInput from "../components/password-input";
import Button from "../components/button";
import RadioInput from "../components/radio-input";
import { firebase } from "../config";
import LogService from "../services/LogService";

const GENDER_OPTIONS = ["Male", "Female"];

export default function Signup() {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const signup = () => {
    if(email == null || password == null || name == null) {
        LogService.showWarningMessage("Please fill all the fields");
        return
    }

    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const userProfileData = {
          id: uid,
          name: name,
          age: age,
          email: email,
          gender: gender,
        };
        const userRef = firebase.firestore().collection("users");
        userRef.doc(uid).set(userProfileData);
        LogService.showSuccessMessage("Registration successful");
        setLoading(false);
      })
      .catch((error) => {
        LogService.showErrorMessage(error.message);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Input placeholder="Email" keyboardType="email-address" onChangeText={(text) => setEmail(text)} />
        <PasswordInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          customStyles={styles.password}
        />
        <Text style={styles.passwordHint} preset="small">
          Password must be 8 characters long and should contain a combination of
          letters and numbers.
        </Text>
        <Input placeholder="Full name" onChangeText={(text) => setName(text)} />
        <Input placeholder="Age" keyboardType="numeric" onChangeText={(text) => setAge(text)} />
        <View style={styles.genderView}>
          <Text style={styles.genderText}>Select your gender</Text>
          {GENDER_OPTIONS.map((option, index) => (
            <RadioInput
              key={index}
              label={option}
              value={gender}
              setValue={setGender}
            />
          ))}
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={colors.lightGreen} />
        ) : (
          <Button
            title="Submit"
            customStyles={styles.button}
            onPress={signup}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Text preset="small" style={styles.footerText}>
          By continuing, you accept the{" "}
          <Text preset="small" style={styles.footerInnerText}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text preset="small" style={styles.footerInnerText}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginHorizontal: spacing[6],
    marginTop: spacing[12],
  },
  password: {
    marginBottom: spacing[2],
  },
  passwordHint: {
    marginBottom: spacing[7],
  },
  genderView: {
    marginTop: spacing[4],
  },
  genderText: {
    marginBottom: spacing[4],
  },
  button: {
    marginTop: spacing[7],
    alignSelf: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: spacing[4],
  },
  footerText: {
    textAlign: "center",
  },
  footerInnerText: {
      color: colors.lightGreen
  }
});
