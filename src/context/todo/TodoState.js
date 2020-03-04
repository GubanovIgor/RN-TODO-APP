import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";

import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../screen/screenContext";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  FETCH_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR
} from "../types";

export const TodoState = ({ children }) => {
  const { setTodoId } = useContext(ScreenContext);
  const initialState = {
    todos: [],
    loader: false,
    error: null
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

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await fetch(`https://rn-todo-app-4e853.firebaseio.com/todos/${id}.json`, {
        method: "PATCH",
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {}
  };

  const fetchTodos = async () => {
    clearError()
    showLoader();
    try {
      const response = await fetch(
        "https://rn-todo-app-4e853.firebaseio.com/todos.json",
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODO, todos });
    } catch (error) {
      showError("Something went wrong");
      console.log("ERROR", error);
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        showLoader,
        hideLoader,
        loader: state.loader,
        error: state.error
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
