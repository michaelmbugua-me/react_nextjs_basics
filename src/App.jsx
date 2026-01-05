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
    <>
      <p>Json Placeholder Items</p>
        {todos.map(todo => (

            <table>
              <tbody className={"table"}>
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.completed ? "Completed" : "Not Completed"}</td>
                  <td><button>Edit</button></td>
                  <td><button>Delete</button></td>
              </tr>
              </tbody>
            </table>
        ))}
    </>
  )
}

export default App
