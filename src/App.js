import "./App.css";
import ToDoList from "./Components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodosProvider from "./Contexts/ToDosContext";
import { useState } from "react";
import { LanguageContext } from "./Contexts/LanguageContext";
import { SnackBarProvider } from "./Contexts/SnackBarContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Rubik"],
  },

  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

function App() {
  const [language, setLanguage] = useState("Arabic");

  return (
    <ThemeProvider theme={theme}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <TodosProvider>
          <SnackBarProvider>
            <div
              className="App"
              style={{
                direction: language === "Arabic" ? "rtl" : "ltr",
              }}
            >
              <ToDoList />
            </div>
          </SnackBarProvider>
        </TodosProvider>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}

export default App;
