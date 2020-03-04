import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";

import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../screen/screenContext";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, FETCH_TODO } from "../types";

export const TodoState = ({ children }) => {
  const { setTodoId } = useContext(ScreenContext);
  const initialState = {
    todos: []
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async title => {
    const response = await fetch(
      "https://rn-todo-app-4e853.firebaseio.com/todos.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      }
    );
    const data = await response.json();
    dispatch({ type: ADD_TODO, title, id: data.name });
  };
  const removeTodo = id => {
    Alert.alert(
      "Удаление элемента",
      "Вы действительно хотите удалить todo?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: () => {
            setTodoId(null);
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: true }
    );
  };
  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });
  const fetchTodo = async () => {
    const response = await fetch(
      "https://rn-todo-app-4e853.firebaseio.com/todos.json",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    const todos = Object.keys(data).map(key => ({...data[key], id: key}))
    setTimeout(() => dispatch({ type: FETCH_TODO, todos }), 5000)
  };

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, addTodo, removeTodo, updateTodo, fetchTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
