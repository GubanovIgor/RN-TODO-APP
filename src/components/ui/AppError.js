import React from "react";
import { View, StyleSheet } from "react-native";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

export const AppError = ({ onPress, error }) => {
  return (
    <View style={styles.center}>
      <AppText>{error}</AppText>
      <AppButton onPress={onPress}>reload</AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
