import React, { useEffect, useState } from "react";

const ToDoItemComponent = ({item, handleEditItem, handleDeleteItem }) => {
    const [isEditing, setisEditing] = useState(false);
    const [newItem, setNewItem] = useState(item.name);
    const [errors, setErrors] = useState("");

    const onEdit = () => {
        if (newItem){
            handleEditItem(item.id, newItem);
            setisEditing(false);
            setErrors("");
        } else {
            setErrors("To do item must not be emply.")
        }
    };

    return (
        <>
        <li>
            {isEditing ? (
                <input 
                    type="text" 
                    value={newItem} 
                    onChange={(event) => setNewItem(event.target.value)} 
                    />
            ) : (
                <span>{item.name}</span>
            )}

        <div>
            <button 
                onClick={() => {
                    isEditing ? onEdit() : setisEditing(true)
                }}
                className = "btn-edit">
                
                {isEditing ? "Save" : "Edit"}
            </button>
            <button
                onClick={() => handleDeleteItem(item.id)}
                className="btn-delete">
            Delete
          </button>
        </div>
    </li>
    {errors ? <p className="errors">{errors}</p> : null}
    </>
    );
};

export default ToDoItemComponent;