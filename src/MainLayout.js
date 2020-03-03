import React, { useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { THEME } from "./theme";
import { Navbar } from "./components/Navbar";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId, setTodoId } = useContext(ScreenContext)
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find(todo => todoId === todo.id);
    content = (
      <TodoScreen
        goBack={() => {
          setTodoId(null);
        }}
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App!" />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.HORIZONTAL_PADDING,
    paddingVertical: 20
  }
});
