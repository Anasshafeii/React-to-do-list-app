import { createContext, useReducer, useContext } from "react";
import todosReducer from "../Reducers/todosReducer";

const ToDosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <>
      <ToDosContext.Provider value={{ todos, dispatch }}>
        {children}
      </ToDosContext.Provider>
    </>
  );
};

export default TodosProvider;

export const useTodos = () => {
  return useContext(ToDosContext);
};
