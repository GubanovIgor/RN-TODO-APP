import React, { useReducer } from "react";

import { ScreenContext } from "./screenContext";
import { screenReducer } from "./screenReducer";
import { SET_TODO_ID } from "../actions";

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, null);

  const setTodoId = todoId => dispatch({ type: SET_TODO_ID, todoId });

  return (
    <ScreenContext.Provider value={{ todoId: state, setTodoId }}>
      {children}
    </ScreenContext.Provider>
  );
};
