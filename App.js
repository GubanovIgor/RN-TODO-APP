import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";
import { THEME } from "./src/theme";

async function loadApplication() {
  await Font.loadAsync({
    'visitor1': require("./assets/fonts/visitor1.ttf"),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(null);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  const addTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id);
    Alert.alert(
      "Удаление",
      `Хотите удалить todo "${todo.title}"?`,
      [
        {
          text: "Удалить",
          onPress: () => {
            setTodoId(null);
            setTodos(prev => prev.filter(item => item.id !== id));
          },
          style: "positive"
        },
        {
          text: "Отмена",
          style: "negative"
        }
      ],
      { cancelable: true }
    );
  };

  const updateTodo = (id, title) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  };

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
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.HORIZONTAL_PADDING,
    paddingVertical: 20
  }
});
