import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const MainScreen = () => {
  const { addTodo, removeTodo, todos, fetchTodo } = useContext(TodoContext);
  const { setTodoId } = useContext(ScreenContext);

  useEffect(() => {
    fetchTodo()
  }, [])

  let content = (
    <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Todo todo={item} removeTodo={removeTodo} openTodo={setTodoId} />
      )}
    />
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://cambridge-intex.ru/wp-content/uploads/2019/05/welcome.png"
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});
