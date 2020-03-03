import React from "react";
import { View, StyleSheet } from "react-native";

export const AppCard = props => {
  return (
    <View style={{ ...styles.default, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  default: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    padding: 20,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: "#fff"
  }
});
