import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// Compenent
import ToDo from "./ToDO";

// Others

import { LanguageContext } from "../Contexts/LanguageContext";
import { useSnackBar } from "../Contexts/SnackBarContext";
import { useTodos } from "../Contexts/ToDosContext";
import { useContext, useState, useEffect, useMemo } from "react";

export default function ToDoList() {
  // USE STATES
  const [displayTodosType, setdisplayTodosType] = useState("all");
  const [titleInput, setTitleInput] = useState("");
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const [showUpdateAlert, setshowUpdateAlert] = useState(false);
  const [dialogTodo, setDialogTodo] = useState("");

  // USE CONTEXT
  const { language, setLanguage } = useContext(LanguageContext);

  // USE CUSTOM HOOKS
  const { todos, dispatch } = useTodos();
  const showToast = useSnackBar();

  // FILER ARRAYS

  function changeDisplayTodosType(e) {
    setdisplayTodosType(e.target.value);
  }

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notcompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToRender = todos;

  if (displayTodosType === "comp") {
    todosToRender = completedTodos;
  } else if (displayTodosType === "non-comp") {
    todosToRender = notcompletedTodos;
  }

  const allTodos = todosToRender.map((t) => {
    return (
      <ToDo
        key={t.id}
        todo={t}
        showDeleteDialog={showDeleteDialog}
        showUpdateDialog={showUpdateDialog}
      />
    );
  });

  useEffect(() => {
    dispatch({
      type: "getTodosFromLocalStorage",
    });
    const storageLanguage = localStorage.getItem("language");
    setLanguage(storageLanguage);
  }, []);

  // HANDLERS

  function handleAdd() {
    dispatch({
      type: "AddTodo",
      payload: {
        title: titleInput,
      },
    });
    setTitleInput("");
    showToast(
      language === "Arabic" ? "  تمت الإضافة بنجاج" : "Added successfully "
    );
  }

  function showDeleteDialog(todo) {
    setDialogTodo(todo);
    setshowDeleteAlert(true);
  }

  function showUpdateDialog(todo) {
    setDialogTodo(todo);
    setshowUpdateAlert(true);
  }

  function handleUpdateClose() {
    setshowUpdateAlert(false);
  }

  function handleUpdateConfirm() {
    dispatch({
      type: "Update",
      payload: {
        dialogId: dialogTodo.id,
        newTitle: dialogTodo.title,
        newDetails: dialogTodo.details,
      },
    });
    handleUpdateClose();
    showToast(
      language === "Arabic"
        ? "  تم تحديث المهمة بنجاج"
        : "Updated successfully "
    );
  }

  function handleDeleteConfirm() {
    dispatch({
      type: "Delete",
      payload: {
        dialogId: dialogTodo.id,
      },
    });
    setshowDeleteAlert(false);
    showToast(
      language === "Arabic" ? "  تم الحذف بنجاج" : "Deleted successfully "
    );
  }

  function handleDeleteClose() {
    setshowDeleteAlert(false);
  }

  //

  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
        open={showDeleteAlert}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: language === "Arabic" ? "rtl  " : "ltr" }}
      >
        <DialogTitle id="alert-dialog-title">
          {language === "Arabic"
            ? "هل أنت متأكد من حذف هذه المهمة ؟"
            : "Are you sure you want to delete this task? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {language === "Arabic"
              ? " لا يمكنك التراجع عن الحذف بعد إتمامه "
              : "You cannot go back after the deletion is complete "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>
            {" "}
            {language === "Arabic" ? "إغلاق  " : " Close"}
          </Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            {language === "Arabic" ? "تأكيد  " : " Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* DELETE DIALOG */}

      {/* Update DIALOG */}
      <Dialog
        open={showUpdateAlert}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: language === "Arabic" ? "rtl  " : "ltr" }}
      >
        <DialogTitle id="alert-dialog-title">
          {language === "Arabic" ? "تعديل المهمة " : "Edit Task "}{" "}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={language === "Arabic" ? "عنوان المهمة " : "Task Name"}
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({
                ...dialogTodo,
                title: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            style={{ direction: language === "Arabic" ? "rtl  " : "ltr" }}
            margin="dense"
            id="name"
            label={language === "Arabic" ? "التفاصيل  " : "Details"}
            fullWidth
            variant="standard"
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({
                ...dialogTodo,
                details: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>
            {language === "Arabic" ? "إغلاق  " : " Close"}
          </Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            {language === "Arabic" ? " تأكيد " : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update DIALOG */}

      <Container style={{ textAlign: "center" }} maxWidth="sm">
        <Card sx={{ minWidth: 275, maxHeight: "90vh", overflow: "scroll" }}>
          <CardContent>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Language"
                onChange={(e) => {
                  setLanguage(e.target.value);
                  localStorage.setItem("language", e.target.value);
                  showToast(
                    language === "English"
                      ? "  تم تغيير اللغة بنجاج"
                      : "Language changed successfully "
                  );
                }}
                style={{ width: "120px" }}
              >
                <MenuItem value={"Arabic"}>Arabic</MenuItem>
                <MenuItem value={"English"}>English</MenuItem>
              </Select>
            </FormControl>
            <Typography
              variant="h2"
              style={{ textAlign: "center", fontWeight: "800" }}
            >
              {language === "Arabic" ? "مهامي" : "My tasks"}
            </Typography>
            <Divider />

            {/* FILTER BUTTONS */}

            <ToggleButtonGroup
              style={{
                direction: language === "Arabic" ? "ltr" : "rtl",
                marginTop: "15px",
                marginTop: "15px",
              }}
              value={displayTodosType}
              exclusive
              onChange={changeDisplayTodosType}
              aria-label="text alignment"
            >
              <ToggleButton value="non-comp">
                {" "}
                {language === "Arabic" ? "غير المنجز" : "In progress"}{" "}
              </ToggleButton>
              <ToggleButton value="comp">
                {language === "Arabic" ? " المنجز" : "Finished"}
              </ToggleButton>
              <ToggleButton
                style={{
                  borderLeft:
                    language === "English" ? "1px solid #0000001f  " : "0px",
                  borderRight:
                    language === "Arabic" ? "1px solid #0000001f  " : "0px",
                }}
                value="all"
              >
                {language === "Arabic" ? "الكل " : "All"}
              </ToggleButton>
            </ToggleButtonGroup>

            {/* FILTER BUTTONS */}

            {/* Todos */}
            {allTodos}
            {/* Todos */}

            {/* INPUT */}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  style={{
                    width: "100%",
                  }}
                  id="outlined-basic"
                  label={language === "Arabic" ? "عنوان المهمة " : "Task Name"}
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    handleAdd();
                  }}
                  disabled={titleInput.length == 0 ? true : false}
                >
                  {language === "Arabic" ? "إضافة " : "Add"}
                </Button>
              </Grid>
            </Grid>
            {/* INPUT */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
