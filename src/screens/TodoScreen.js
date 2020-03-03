import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";

import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { AppLogo } from "../components/ui/AppLogo";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoScreen = () => {
  const [modal, setModal] = useState(false);
  const { todos, removeTodo, updateTodo } = useContext(TodoContext)
  const { todoId, setTodoId } = useContext(ScreenContext)

  const todo = todos.find(todo => todo.id === todoId)

  saveHandler = title => {
    updateTodo(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        modalVisible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
        id={todo.id}
      />

      <AppCard style={styles.appCard}>
        <AppText>{todo.title}</AppText>
        <AppButton onPress={() => setModal(!modal)}>
          <AppLogo name="edit" />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GRAY_COLOR} onPress={() => setTodoId(null)}>
            <AppLogo name="back" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={() => removeTodo(todo.id)}
            color={THEME.DANGER_COLOR}
          >
            <AppLogo name="delete" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    width: "40%"
  },
  appCard: {
    padding: 15,
    marginBottom: 20
  }
});
