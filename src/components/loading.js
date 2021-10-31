import React from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../theme";

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageSection}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../../assets/splash.png")}
        />
      </View>
      <View style={styles.loadingSection}>
        <ActivityIndicator size="large" color={colors.lightGreen} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: "100%",
    marginTop: spacing[5],
  },
});
