import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, Keyboard } from "react-native";

import { AppButton } from "../components/ui/AppButton";
import { AppLogo } from "../components/ui/AppLogo";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Введите название");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue} // Очень странный способ вызова функции с аргументом
        placeholder="Введите что-нибудь"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <AppButton onPress={pressHandler}>
        <AppLogo name="pluscircleo" />
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  input: {
    width: "70%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#3949ab"
  }
});
