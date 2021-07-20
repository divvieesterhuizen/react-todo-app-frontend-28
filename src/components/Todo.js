import React from 'react';
import { FaTrash } from 'react-icons/fa';

const Todo = ({ todo, onCheck, deleteTodo }) => {
  const { id, title, completed } = todo;

  return (
    <div className='mb-3' data-testid={`todo-${id}`}>
      <h4 className={completed ? 'text-decoration-line-through' : ''}>
        <input
          type='checkbox'
          className='form-check-input me-5'
          onChange={() => {
            onCheck(id);
          }}
          checked={!!completed}
        />
        {title}
        <FaTrash
          onClick={() => {
            deleteTodo(id);
          }}
          className='float-end delete-icon'
        />
      </h4>
    </div>
  );
};

export default Todo;
