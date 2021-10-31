import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from './text/text'
import { colors, spacing } from '../theme'

export default function Button({ title, customStyles, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
      <Text preset="medium">{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 165,
    height: 45,
    backgroundColor: colors.yellow,
    borderRadius: spacing[8],
    borderWidth: 0.5,
    borderColor: colors.darkYellow,
    justifyContent: "center",
    alignItems: "center",
  },
});
