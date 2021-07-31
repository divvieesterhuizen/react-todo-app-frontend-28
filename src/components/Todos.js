import React from 'react';
import Todo from './Todo';

const Todos = ({ todos, onCheck, deleteTodo, updateTodoText }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          onCheck={onCheck}
          deleteTodo={deleteTodo}
          updateTodoText={updateTodoText}
        />
      ))}
    </div>
  );
};

export default Todos;
