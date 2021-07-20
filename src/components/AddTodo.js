import { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);

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
      addTodo(text);
      clearFields();
    }
  };

  return (
    <>
      {alert && (
        <div className='alert alert-warning fade show' role='alert'>
          <strong>Empty Field.</strong> Please enter some text.
        </div>
      )}

      <form onSubmit={onSubmit} className='mb-5'>
        <div className='input-group mb-2'>
          <input
            type='text'
            placeholder='Type todo here ...'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='form-control'
          />
        </div>
        <input
          type='submit'
          value='Add Todo'
          className='btn btn-block btn-danger'
        />
      </form>
    </>
  );
};

export default AddTodo;
