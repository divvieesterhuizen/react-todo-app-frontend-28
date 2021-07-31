import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';

const Todo = ({ todo, onCheck, deleteTodo, updateTodoText }) => {
  const { id, title, completed } = todo;

  const [showEditBox, setShowEditBox] = useState(false);
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);
  const [updatedTodoAlert, setUpdatedTodoAlert] = useState(false);

  const clearFields = () => {
    setText('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      clearFields();
      setShowEditBox(false);
      setUpdatedTodoAlert(true);
      setTimeout(() => {
        setUpdatedTodoAlert(false);
        // fix unmounted component update error
        updateTodoText(id, text);
      }, 500);
    }
  };

  const onEditClick = () => {
    setShowEditBox(true);
  };

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
        <FaPencilAlt
          onClick={() => {
            onEditClick();
          }}
          className='float-end edit-icon'
        />
      </h4>

      {updatedTodoAlert && (
        <div className='alert alert-success fade show' role='alert'>
          <strong>Todo updated successfully.</strong>
        </div>
      )}

      {alert && (
        <div className='alert alert-warning fade show' role='alert'>
          <strong>Empty Field.</strong> Please enter some text.
        </div>
      )}

      {showEditBox && (
        <form onSubmit={onSubmit} className='mb-5'>
          <div className='input-group mb-2'>
            <input
              type='text'
              placeholder='Type new todo here ...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='form-control'
            />
          </div>
          <input
            type='submit'
            value='Update Todo'
            className='btn btn-block btn-success'
          />
        </form>
      )}
    </div>
  );
};

export default Todo;
