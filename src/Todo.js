import React, { useEffect, useState } from "react";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";
function Todo({ title }) {
  const [input, setInput] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      top: "50%",
      left: "30%",
      border: "2px solid #000",
      padding: theme.spacing(2, 4, 3),
      boxShadow: theme.shadows[5],
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();
  const updateTodo = () => {
    setOpen(false);
    db.collection("todos").doc(title.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <form action="">
            <input
              placeholder={title.todo}
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" onClick={updateTodo}>
              update ToDo
            </Button>
          </form>
        </div>
      </Modal>
      <div className="white-text card-action">
        <span className="title">{title.todo}</span>
        <button
          className="btn-floating waves-effect waves-light red"
          onClick={(e) => db.collection("todos").doc(title.id).delete()}
        >
          -
        </button>
        <button
          onClick={() => setOpen(true)}
          className="waves-effect waves-light darken-3
 btn-small blue  "
        >
          edit
        </button>
      </div>
    </>
  );
}

export default Todo;
