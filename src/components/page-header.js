import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../components/text/text";
import { AntDesign } from "@expo/vector-icons";
import { colors, spacing } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function PageHeader({ title, showAddNoteButton=false, showBackButton=null }) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.titleView}>
        {
          showBackButton &&
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack() }>
              <AntDesign name="left" size={24} color={colors.lightGreen} />
            </TouchableOpacity>
          </View>
        }
        <Text preset="bold" style={styles.title}>
          {title}
        </Text>
      </View>
      { showAddNoteButton && (
        <Pressable onPress={() => navigation.navigate("Create")}>
          <AntDesign name="pluscircle" size={30} color={colors.lightGreen} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: spacing[6],
    marginVertical: spacing[4],
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
  },
  backButton: {
    marginRight: spacing[3]
  }
});
