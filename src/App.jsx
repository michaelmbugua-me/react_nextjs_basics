import {useEffect, useState} from "react";

import './App.css'
import axios from "axios";

function App() {

  const [todos, setTodos] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(res => setTodos(res.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  function openForm(todo) {
    alert(`Open form for todo ${todo.title}`);
  }

  return (
    <main className="app">
      <h1>Todos</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col" className="table__actions-heading">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>
                <span
                  className={`badge ${
                    todo.completed ? "badge--done" : "badge--open"
                  }`}
                >
                  {todo.completed ? "Completed" : "Not Completed"}
                </span>
              </td>
              <td className="table__actions">
                <button className="btn btn--ghost">Edit</button>
                <button className="btn btn--danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default App
