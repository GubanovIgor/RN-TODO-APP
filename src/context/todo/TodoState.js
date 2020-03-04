import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";

import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../screen/screenContext";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actions";

export const TodoState = ({ children }) => {
  const { setTodoId } = useContext(ScreenContext);
  const initialState = {
    todos: [{ id: "1", title: "React Native" }]
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = title => dispatch({ type: ADD_TODO, title });
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

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, addTodo, removeTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
