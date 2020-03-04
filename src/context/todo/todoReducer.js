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

const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [...state.todos, { id, title: title }]
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  }),
  [UPDATE_TODO]: (state, { id, title }) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    })
  }),
  [FETCH_TODO]: (state, { todos }) => ({ ...state, todos }),
  [SHOW_LOADER]: state => ({ ...state, loader: true }),
  [HIDE_LOADER]: state => ({ ...state, loader: false }),
  [SHOW_ERROR]: (state, { error }) => ({...state, error}),
  [CLEAR_ERROR]: state => ({...state, error: null}),
  DEFAULT: state => state
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type];
  return handler(state, action);
};
