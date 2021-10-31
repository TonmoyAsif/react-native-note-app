import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function Input({
  placeholder,
  value,
  keyboardType = "default",
  customStyles,
  onChangeText,
  multiline = false,
}) {
  const [selected, setSelected] = React.useState(false);
  const isSelected = selected;

  const onFocus = () => {
    setSelected(true)
  }
  
  const onBlur = () => {
    setSelected(false)
  }

  return (
    <TextInput
      onFocus={onFocus}
      onBlur={onBlur}
      style={[
        styles.input,
        customStyles,
        isSelected && styles.selectedBorderColor,
        multiline && styles.supportMultiline,
      ]}
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      autoCorrect={false}
      multiline={multiline}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    padding: spacing[3],
    marginBottom: spacing[7],
    fontFamily: typography.regular,
  },
  selectedBorderColor: {
    borderBottomColor: colors.darkGrey,
  },
  supportMultiline: {
    maxHeight: 250,
  },
});
