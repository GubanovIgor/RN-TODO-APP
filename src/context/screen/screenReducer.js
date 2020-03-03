import { SET_TODO_ID } from "../actions";

const handlers = {
  [SET_TODO_ID]: (state, todoId) => todoId,
  DEFAULT: state => state
};

export const screenReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action.todoId)
};
