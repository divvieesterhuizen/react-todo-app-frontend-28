import React from 'react';
import Todo from './Todo';

const Todos = ({ todos, onCheck, deleteTodo, updateTodoText }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          onCheck={onCheck}
          deleteTodo={deleteTodo}
          updateTodoText={updateTodoText}
        />
      ))}
    </>
  );
};

export default Todos;
