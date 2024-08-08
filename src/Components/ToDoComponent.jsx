import React, { useRef, useState } from "react";
import {v4 as uuid} from "uuid";
import ToDoItemComponent from "./ToDoItemComponent";

const ToDoComponent = () => {
    const inputRef = useRef();
    const [item, setItem] = useState("");
    const [toDoItems, setToDoItems] = useState([]);
    const [errors, setErrors] = useState("");

    const handleAddItem = () => {
        if (item) {
            setToDoItems([...toDoItems,{ id: uuid(), name: item}]);
            setItem("");
            setErrors("");
        } else{
            setErrors("To do items cannot be empty.");
            inputRef.current.focus();
        }
        
    };

    const handleEditItem = (id, newItem) => {
        const updatedToDoItems = toDoItems.map((item) => {
            if(item.id === id){
                return {...item, name: newItem};
            }

            return item;
        });
        setToDoItems(updatedToDoItems);
    }

    const handleDeleteItem = (removeId) => {
        const filteredItems  = toDoItems.filter((item) => item.id !== removeId);
        setToDoItems(filteredItems);
    };

    const handleClearItems = () => {
        setToDoItems([]);
    };

    return (
    <div className="todo-buddy">
        <h1>To Do List</h1>
        <div className="input-section">
            <div className="input-container">
                <input 
                    ref = {inputRef}
                    type ="text" 
                    placeholder = "Enter an item..." 
                    value = {item} 
                    onChange = {(event) => setItem(event.target.value)}
                />
                <button onClick={handleAddItem} className="btn-add">
                    Add Item
                </button>
            
            </div>
            <div>{errors ? <p className="errors">{errors}</p> : null}</div>
        </div>
        <ul className="todo-list">
        {toDoItems.map((item) => (
          <ToDoItemComponent
            key={item.id}
            item={item}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
        </ul>
        {toDoItems.length > 0 ? (
            <button onClick={handleClearItems} className="btn-clear">
                Clear To Do Items{" "}
        </button>
        ) : null}
    </div>
    );
};

export default ToDoComponent