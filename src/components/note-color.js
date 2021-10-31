import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing } from "../theme";

export default function NoteColor({ label, color, value, setValue }) {
  const isSelected = value == label;

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => setValue(label)}>
        <View
          style={[
            styles.circle,
            isSelected && styles.selectedCircle,
            isSelected && styles.selectedOpacity,
            { backgroundColor: color },
          ]}
        ></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: spacing[1],
  },
  circle: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.white,
    opacity: 0.6,
  },
  selectedCircle: {
    borderColor: colors.darkGrey,
  },
  selectedOpacity: {
    opacity: 1,
  },
});
