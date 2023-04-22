// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
const TodoItems = ({title, description, isCompleted, updateHandler, deleteHandler, id}) => {
  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
            <input type='checkbox' onChange={()=>updateHandler(id)} checked={isCompleted}/>
            <button className='btn' onClick={()=>deleteHandler(id)}>Delete</button>
        </div>
    </div>
  )
}

export default TodoItems