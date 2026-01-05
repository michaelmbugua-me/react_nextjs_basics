
import {useState} from "react";

import './EditForm.css'

function EditForm({ todo, onSave, onCancel }) {
    const [title, setTitle] = useState(todo.title);

    function handleSubmit(e) {
        e.preventDefault();
        onSave({...todo, title});
    }

    return (
        <form className="editor" onSubmit={handleSubmit}>
            <label className="editor__label" htmlFor="todo-title">Edit task</label>
            <div className="editor__row">
                <input id="todo-title" className="input" type="text" value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <button className="btn btn--primary" type="submit">Save</button>
                <button className="btn btn--ghost" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default EditForm
