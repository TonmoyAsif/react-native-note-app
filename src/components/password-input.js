import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export default function PasswordInput({placeholder, customStyles, onChangeText}) {
  const [selected, setSelected] = React.useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);
  const isSelected = selected;

  return (
    <View style={[styles.container, customStyles]}>
      <TextInput
        onFocus={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        style={[styles.input, isSelected && styles.selectedBorderColor]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
      />
      <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
        {isPasswordHidden ? (
          <Ionicons
            style={styles.icon}
            name="eye"
            size={20}
            color={colors.midGrey}
          />
        ) : (
          <Ionicons
            style={styles.icon}
            name="eye-off"
            size={20}
            color={colors.midGrey}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing[7],
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    paddingLeft: spacing[3],
    fontFamily: typography.regular,
  },
  icon: {
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    paddingRight: spacing[3],
  },
  selectedBorderColor: {
    borderBottomColor: colors.darkGrey,
  },
});
