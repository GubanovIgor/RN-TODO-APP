import React, {useState, useEffect} from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { AppText } from "../components/ui/AppText";
import { THEME } from "../theme";

export const Todo = ({ todo, removeTodo, openTodo }) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width - THEME.HORIZONTAL_PADDING * 2)

  useEffect(() => {
    const update = () => {
      setScreenWidth(Dimensions.get('window').width - THEME.HORIZONTAL_PADDING * 2)
    }

    Dimensions.addEventListener('change', update)

    return () => Dimensions.removeEventListener('change', update)
  })

  return (
    <View style={{width: screenWidth}}>
      <TouchableOpacity
        onPress={() => openTodo(todo.id)}
        onLongPress={() => removeTodo(todo.id)}
      >
        <View style={styles.todo}>
          <AppText>{todo.title}</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 5,
    marginBottom: 10
  }
});
