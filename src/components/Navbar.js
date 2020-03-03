import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { THEME } from "../theme";
import { AppText } from "../components/ui/AppText";

export const Navbar = ({ title }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid
        })
      }}
    >
      <AppText style={styles.text}>{title}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2
  },
  text: {
    color: Platform.OS === "ios" ? THEME.MAIN_COLOR : "#fff",
    fontSize: 30
  }
});
