import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { spacing, colors } from "../theme";
import Text from "./text/text";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const COLOR_OPTIONS = [
  { name: "red", color: colors.red },
  { name: "green", color: colors.green },
  { name: "blue", color: colors.blue },
];

export default function NoteItem({ note, onDeleteNote }) {
  const navigation = useNavigation();
  const { id, title, description, noteColor, updatedAt } = note;

  const getNoteColor = (noteColor) => {
    return COLOR_OPTIONS.find((o) => o.name === noteColor).color;
  };

  const openNote = () => {
    navigation.navigate("Update", { note: note });
  };

  const deleteNote = () => {
    onDeleteNote(id);
  }

  return (
    <Pressable onPress={openNote}>
      <View style={[styles.item, { backgroundColor: getNoteColor(noteColor) }]}>
        <View style={styles.container}>
          <Text preset="medium" numberOfLine={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLine={2} style={styles.description}>
            {description}
          </Text>
          <Text style={styles.time}>
            Last updated: {updatedAt?.toDate().toDateString()}
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={deleteNote}>
            <AntDesign name="delete" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 18,
    padding: spacing[4],
  },
  title: {
    fontSize: 15,
    color: colors.white,
    marginBottom: spacing[2],
  },
  description: {
    fontSize: 12,
    color: colors.white,
  },
  actionButtons: {
    marginLeft: spacing[2] 
  },
  time: {
    marginTop: spacing[2],
    fontSize: 11,
  },
});
