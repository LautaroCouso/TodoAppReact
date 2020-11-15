import React, {useState} from 'react'
import TodoForm from "./TodoForm"
import Todo from "./Todo"

function TodoList(){
    /*todos saves a portion of the state and setTodos saves a
    function that will allow us to update say state*/
    const [todos, setTodos] = useState([]);

    const addTodo = todo =>{
        // If text is null or only blank spaces, it will stop the flow of the execution
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        // newtTodos saves the new task along with all the other tasks from todos
        const newTodos = [todo, ...todos];
        //We use setTodos to update todos since we can't temper with it directly
        setTodos(newTodos);
    };

    const removeTodo = id => {
        /*We have to use the spread operator because filter
        is a destructive method and we cannot directly modify the state
         */
        const removeArr=[...todos].filter(todo => todo.id !== id);

        setTodos(removeArr);
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        /* prev is the current value of todos when executed
        we can use map because it doesn't alter the original array and creates a new one instead
        we can access item's properties for its use as a parameter of the map method
         */
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    };

    const completeTodo = id =>{
        //We used let because we updated todos its meant to be a local variable
        let updatedTodos = todos.map(todo =>{
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1> What's the plan for today?</h1>
            {/*The TodoForm component is called and the constant
            addTodo is passed as the value of the property onSubmit*/}
            <TodoForm onSubmit={addTodo}/>
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    )
}

export default TodoList