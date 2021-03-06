import React, { useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { THEME } from "./theme";
import { Navbar } from "./components/Navbar";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)

  return (
    <View style={styles.wrapper}>
      <Navbar title="Todo App!" />
      <View style={styles.container}>
        {todoId ? <TodoScreen/> : <MainScreen/>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.HORIZONTAL_PADDING,
    paddingVertical: 20,
    flex: 1,
  },
  wrapper: {
    flex: 1
  }
});
