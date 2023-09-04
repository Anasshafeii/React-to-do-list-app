import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "AddTodo": {
      const newToDo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };

      const updatedTodos = [...currentTodos, newToDo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "Update": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.dialogId) {
          return {
            ...t,
            title: action.payload.newTitle,
            details: action.payload.newDetails,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "Delete": {
      const updatedTodos = currentTodos.filter((t) => {
        return t.id !== action.payload.dialogId;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "CheckBtn": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          const updatedTodo = { ...t, isCompleted: !t.isCompleted };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "getTodosFromLocalStorage": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    default: {
      throw Error("Unknown Action" + action.type);
    }
  }
}
