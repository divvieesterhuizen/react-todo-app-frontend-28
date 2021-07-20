import React from 'react';
import Todo from './Todo';

const Todos = ({ todos, onCheck, deleteTodo }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          onCheck={onCheck}
          deleteTodo={deleteTodo}
        />
      ))}
    </>
  );
};

export default Todos;
