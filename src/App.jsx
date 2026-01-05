import {useEffect, useState} from "react";

import './App.css'
import axios from "axios";

function App() {

    const [todos, setTodos] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const [editing, setEditing] = useState(null);


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(res => setTodos(res.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    function openForm(todo) {
        setEditing(todo);
    }

    function saveEdit() {
        setTodos(todos.map(t => t.id === editing.id ? editing : t));
        setEditing(null);
    }

    return (<main className="app">
            <h1 className="margin">Todos</h1>

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
                {todos.map(todo => (<tr key={todo.id}>
                        <td>{todo.title}</td>
                        <td>
                <span
                    className={`badge ${todo.completed ? "badge--done" : "badge--open"}`}
                >
                  {todo.completed ? "Completed" : "Not Completed"}
                </span>
                        </td>
                        <td className="table__actions">
                            <button className="btn btn--ghost" onClick={() => openForm(todo)}>Edit</button>
                            <button className="btn btn--danger" onClick={() => alert(`Delete todo ${todo.id}`)}>Delete
                            </button>
                        </td>
                    </tr>))}
                </tbody>
            </table>

            {editing && <form className="editor" onSubmit={e => {e.preventDefault(); saveEdit();}}>
                <label className="editor__label" htmlFor="todo-title">Edit task</label>
                <div className="editor__row">
                    <input id="todo-title" className="input" type="text" value={editing.title}
                           onChange={(e) => setEditing({...editing, title: e.target.value})}/>
                    <button className="btn btn--primary" type="submit">Save</button>
                    <button className="btn btn--ghost" type="button" onClick={() => setEditing(null)}>Cancel</button>
                </div>
            </form>}
        </main>)
}

export default App
