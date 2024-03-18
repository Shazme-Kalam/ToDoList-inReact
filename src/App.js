// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { Heading } from '@chakra-ui/react';
import { Text  } from '@chakra-ui/react';
import { Alert} from '@chakra-ui/react'

function App() {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
    } else {
      // <Stack spacing={3}>
      <Alert status='error'>
        There was an error processing your request
      </Alert>
    }
    document.getElementById('todoAdd').value = ""
  }
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <>
      <div id="todo-list">
    
      <Heading className="todo"><Text as='i' >Todo List</Text></Heading> 
      <br />
      <form  onSubmit={handleSubmit}>
            <div className="todo">
            <input className="input"
              type="text"
             id = 'todoAdd'
            />
            <button className="Add" type="submit">Add Todo</button>
            </div>
        </form>
        {todos.map((todo) =>
            <div className="todo" key={todo.id}>
                <div className="todo-text">{todo.text}</div>
            {/* insert delete button below this line */}
            </div>)}
        {todos.map((todo) => (

          <div key={todo.id} className="todo">
            <div className="todo-text">
            </div>
           
            <div className="todo-actions">
              {/* if it is edit mode, allow submit edit, else allow edit */}
              <input type="checkbox" id="completed" checked={todo.text} onChange={() => toggleComplete(todo.id)} />
            {/* Add checkbox for toggle complete */}
            {/* if it is edit mode, display input box, else display text */}
            {todo.id === todoEditing ?
              (<input type="text"  defaultValue={todo.text} id={todo.id} />) :
              (<div>{todo.text}</div>)
            }
              {todo.id === todoEditing ?
                (
                  <button className="todo-actions" onClick={() => submitEdits(todo)}>Submit Edits</button>
                ) :
                (
                  <button  className="todo-actions" onClick={() => setTodoEditing(todo.id)}> Edit </button>
                )}
              <br />
              <button  className="todo-actions" onClick={() => deleteTodo(todo.id)}> Delete</button>
            </div>
          </div>
        )
        )}
      </div>
    </>


  );
};

export default App;
