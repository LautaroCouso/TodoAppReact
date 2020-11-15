/*The hooks useState, useEffect and useRef are imported from react
Hook useState: allows us to create a portion of an state and the corresponding function to update it
Hook useEffect: allows us to execute a block of code every time that a prop and/or a portion of the state is updated
Hook useRef: allows us to create a reference to a component to manipulate it imperatively
 */
import React, {useState, useEffect, useRef} from 'react';

function TodoForm(props) {
    /*The ternary reads if edit exist then return the value but if it doesn't,
    return an empty string whichever the result it will be stored in input (portion of the state)*/
    const [input, setInput] = useState(props.edit ? props.edit.value: '');
    //We create a reference pointing to nothing and we save it on inputRef (for later use)
    const inputRef = useRef (null);
    /*The hook useEffect only runs once since we are not passing any props or state as a second argument,
     this way the focus of the input will occur just for the first time that the component is rendered
      */
    useEffect(()=> {
        inputRef.current.focus()
    });
    //The arrow function receives an argument called "e" that stands for event
    const handleChange = e =>{
     /*We update input through the function setInput by accessing to the value hold by target
      (every event knows on which component it was generated and that info is stored on the property target)
       */
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        /*Property onSubmit is passed by the parent of TodoForm
        and we can note it is a function because we are invoking it
         */
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });
        //After saving the task we clear the input again with setInput
        setInput('');

    };
    return(
        <form className={"todo-form"} onSubmit={handleSubmit}>
            <input type="text"
                   placeholder={"Add a todo"}
                   value={input}
                   name="text"
                   className={"todo-input"}
                   onChange={handleChange}
                   ref={inputRef}/>
            <button className={"todo-button"}> Add todo</button>
        </form>
)
}

export default TodoForm