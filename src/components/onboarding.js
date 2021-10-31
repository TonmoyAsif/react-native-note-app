import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Text from "./text/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppIntroSlider from "react-native-app-intro-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../theme";
import { AntDesign } from "@expo/vector-icons";

const slides = [
  {
    key: "onboarding_one",
    title: "Document",
    subtitle: "Make yourself better",
    text: "Learn new stuffs and get professional",
    image: require("../../assets/onboarding-1.png"),
  },
  {
    key: "onboarding_two",
    title: "Learn",
    subtitle: "Learn and grow",
    text: "You can earn professionally with our bootcamps",
    image: require("../../assets/onboarding-2.png"),
  },
  {
    key: "onboarding_three",
    title: "Help",
    subtitle: "Help others by educating",
    text: "Create your own bootcamps and help others",
    image: require("../../assets/onboarding-3.png"),
  },
];

export default function Onboarding({ setOnboarded }) {
  const makeOnboardingTrue = async () => {
    try {
      await AsyncStorage.setItem("onboarding", "true");
    } catch (e) {
      console.log("Error", e);
    }
    setOnboarded(true);
  };

  const renderItem = ({ item }) => {
    const { image, title, subtitle, text } = item;
    return (
      <View style={styles.container}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <View style={styles.textView}>
          <Text preset="bold" style={styles.title}>
            {title}
          </Text>
          <Text preset="medium" style={styles.subtitle}>
            {subtitle}
          </Text>
          <Text preset="regular" style={styles.description}>
            {text}
          </Text>
        </View>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.button}>
        <AntDesign name="arrowright" size={24} color={colors.white} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={makeOnboardingTrue}
        keyExtractor={(item) => item.key}
        activeDotStyle={{ backgroundColor: colors.lightGreen }}
        showDoneButton={true}
        renderDoneButton={renderDoneButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  textView: {
    alignItems: "center",
    marginTop: spacing[10],
  },
  title: {
    fontSize: 32,
    color: colors.lightGreen,
    marginBottom: spacing[2],
  },
  subtitle: {
    fontSize: 16,
    color: colors.lightGreen,
    marginBottom: spacing[10],
  },
  description: {
    width: 280,
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGrey,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
});
