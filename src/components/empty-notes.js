import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Text from "../components/text/text";
import { spacing } from "../theme";
import Button from "./button";
import { useNavigation } from "@react-navigation/native";

export default function EmptyNotes() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/empty_notes.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text preset="medium" style={styles.title}>
        You don't have any notes yet.
      </Text>
      <Button
        title="ADD"
        customStyles={styles.button}
        onPress={() => navigation.navigate("Create")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    paddingTop: spacing[18],
  },
  image: {
    height: 250,
    width: "100%",
  },
  title: {
    marginVertical: spacing[16],
  },
  button: {
    marginVertical: spacing[4],
  },
});
