import {useEffect, useState} from "react";

import './App.css'
import axios from "axios";
import EditForm from "./EditForm.jsx";

function App() {

    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(1);
    const [result, setResult] = useState({page: 0, todos: [], error: null});

    const loading = result.page !== page;
    const error = result.page === page ? result.error : null;
    const todos = loading ? [] : result.todos;
    const editing = todos.find(t => t.id === editingId);

    useEffect(() => {
        let cancelled = false;
        axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`)
            .then(res => {
                if (!cancelled) setResult({page, todos: res.data, error: null})
            })
            .catch(error => {
                if (!cancelled) setResult({page, todos: [], error})
            });
        return () => {
            cancelled = true
        };
    }, [page]);

    function openForm(todo) {
        setEditingId(todo.id);
    }

    function saveEdit(updated) {
        setResult({...result, todos: result.todos.map(t => t.id === updated.id ? updated : t)});
        setEditingId(null);
    }

    return (<main className="app">
        <h1 className="margin">Todos</h1>

        {loading && <p className="status">Loading todos...</p>}

        {!loading && error && <p className="status status--error">
            Could not load todos. Check your connection and try again.
        </p>}

        {!loading && !error && <>
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
            {editing && <EditForm todo={editing} onSave={saveEdit} onCancel={() => setEditingId(null)}/>}

            <div className="pagination">
                <button className="btn btn--ghost" disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}>
                    Previous
                </button>
                <span className="pagination__status">Page {page}</span>
                <button className="btn btn--ghost" disabled={page === 10}
                        onClick={() => setPage(p => p + 1)}>
                    Next
                </button>
            </div>
        </>}
    </main>)
}

export default App
