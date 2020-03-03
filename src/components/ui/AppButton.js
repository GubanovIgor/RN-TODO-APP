import React from "react";
import { TouchableOpacity, TouchableNativeFeedback, View, StyleSheet, Platform } from "react-native";
import { AppText } from "./AppText";
import { THEME } from "../../theme";

export const AppButton = ({ children, color = THEME.MAIN_COLOR, onPress }) => {
  const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  return (
    <Wrapper onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor: color }}>
        <AppText>{children}</AppText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  }
});
