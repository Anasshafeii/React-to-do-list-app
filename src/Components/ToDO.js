import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
import { useSnackBar } from "../Contexts/SnackBarContext";
import { useTodos } from "../Contexts/ToDosContext";

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function ToDo({ todo, showDeleteDialog, showUpdateDialog }) {
  const { dispatch } = useTodos();
  const showToast = useSnackBar();
  const { language } = useContext(LanguageContext);

  // EVENT HAKDLERS

  function handleCheckBtn() {
    dispatch({
      type: "CheckBtn",
      payload: { id: todo.id },
    });
    showToast(
      language === "Arabic" ? "  تم التعديل بنجاج" : "Edited successfully "
    );
  }

  function handleUpdateClick() {
    showUpdateDialog(todo);
  }

  function handleDleteClick() {
    showDeleteDialog(todo);
  }

  // EVENT HAKDLERS

  return (
    <>
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h5"
                style={{
                  textAlign: language === "Arabic" ? "right  " : "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography
                variant="h6"
                style={{
                  textAlign: language === "Arabic" ? "right  " : "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* CHECK ICON BTN */}

              <IconButton
                className="icon-btn"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px ",
                }}
                onClick={() => {
                  handleCheckBtn();
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* CHECK ICON BTN */}

              {/* Update ICON BTN */}

              <IconButton
                className="icon-btn"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px ",
                }}
                onClick={handleUpdateClick}
              >
                <ModeEditOutlinedIcon />
              </IconButton>

              {/* Update ICON BTN */}

              {/* DELETE ICON BTN */}

              <IconButton
                className="icon-btn"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px ",
                }}
                onClick={handleDleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* DELETE ICON BTN */}

              {/* ACTIONS BUTTONS */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
