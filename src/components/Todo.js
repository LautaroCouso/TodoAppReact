import React, {useState} from 'react'
import TodoForm from './TodoForm'
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
/* The component Todo receives an object with 4 keys, this is a different syntax to the one that we are used to (props)
The only advantage of this syntax is that we can access directly to the props that our component possess */
function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate= value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>
    }

    return todos.map(todo => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
             key={todo.id}
        >
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className="icons">
                <RiCloseCircleLine
                    onClick={()=> removeTodo(todo.id)}
                    className={"delete-icon"}
                />
                <TiEdit onClick={()=> setEdit({id: todo.id, value: todo.text})}
                        className={"edit-icon"}
                />
            </div>
        </div>
    ))

}

export default Todo