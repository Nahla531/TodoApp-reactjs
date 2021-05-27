import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
// import M from "materialize-css/dist/js/materialize.min.js";

function App() {
  //   useEffect(() => {
  //     //initialize materialize
  //     M.AutoInit();
  //   });
  //   document.addEventListener("DOMContentLoaded", function () {
  //     var elems = document.querySelectorAll(".modal");
  //     var instances = M.Modal.init(elems, { opacity: 0.5 });
  //   });
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodo(
          snapshot.docs.map((doc) => ({ todo: doc.data().todo, id: doc.id }))
        );
      });
    return () => {};
  }, []);
  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodo([...todo, input]);
    setInput("");
  };
  console.log(todo);
  return (
    <div className="container">
      <form action="" className="white">
        <fieldset>
          <legend>Add toDo</legend>

          <div className="input-field">
            <label htmlFor="">write a todo: </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <button
            className="waves-effect waves-light btn-small"
            disabled={!input}
            type="submit"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </fieldset>
      </form>

      <h3>ToDo List</h3>

      <div class="row">
        <div class="col s12 m9">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Todo List</span>
            </div>
            {todo.map((todo) => {
              return <Todo title={todo} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
