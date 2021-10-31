import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../components/text/text'
import { colors, spacing } from '../theme'

export default function RadioInput( { label, value, setValue } ) {
    const isSelected = value == label;

    return (
      <TouchableOpacity onPress={() => setValue(label)}>
        <View style={styles.genderView}>
          <View
            style={[
              styles.outerCircle,
              isSelected && styles.selectedOuterCircle,
            ]}
          >
            <View
              style={[
                styles.innerCircle,
                isSelected && styles.selectedInnerCircle,
              ]}
            ></View>
          </View>
          <Text
            preset="medium"
            style={[styles.genderText, isSelected && styles.selectedText]}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  genderView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightGrey,
  },
  selectedOuterCircle: {
    borderColor: colors.lightGreen,
  },
  selectedInnerCircle: {
    borderColor: colors.lightGreen,
    backgroundColor: colors.lightGreen,
  },
  genderText: {
    marginLeft: spacing[4],
    color: colors.lightGrey,
  },
  selectedText: {
    color: colors.darkGrey,
  },
});