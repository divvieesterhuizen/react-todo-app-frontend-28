import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import Navbav from './components/Navbar';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import AboutPage from './components/pages/About';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = process.env.REACT_APP_API;
  if (!API) {
    alert(
      'API URL not found in process.env. Application will not work until you add an value for API in your environment variables.'
    );
  }

  // initial run
  useEffect(() => {
    try {
      getTodos();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  // Functions
  const getTodos = async () => {
    const todosFromServer = await fetchTodos();
    setTodos(todosFromServer);
  };

  const addTodo = async (text) => {
    const newTodo = {
      id: uuid(),
      title: text,
      completed: false,
    };
    // DB
    const res = await axios.post(API + '/todos', newTodo);
    const data = await res.data;
    // UI
    setTodos([...todos, data]);
  };

  const deleteTodo = async (_id) => {
    //DB
    await axios.delete(API + `/todos/${_id}`);

    // UI
    setTodos(todos.filter((todo) => todo.id !== _id));
  };

  const updateTodo = async (todo) => {
    await axios.put(API + `/todos/${todo.id}`, todo);
  };

  const onCheck = (_id) => {
    let updatedTodo = {};

    // UI + assign updated Todo
    setTodos(
      todos.map((todo) => {
        if (todo.id === _id) {
          todo.completed = !todo.completed;
          updatedTodo = todo;
        }
        return todo;
      })
    );

    // DB
    updateTodo(updatedTodo);
  };

  const updateTodoText = async (_id, text) => {
    let todoFromServer = await fetchTodo(_id);
    todoFromServer.title = text;

    // UI + assign updated Todo
    setTodos(
      todos.map((todo) => {
        if (todo.id === _id) {
          todo.title = text;
        }
        return todo;
      })
    );

    // DB
    updateTodo(todoFromServer);
  };

  // Fetch Functions
  const fetchTodos = async () => {
    setLoading(true);
    const res = await axios.get(API + '/todos');
    const data = await res.data;
    setLoading(false);
    return data;
  };

  const fetchTodo = async (_id) => {
    setLoading(true);
    const res = await axios.get(API + `/todos/${_id}`);
    const data = await res.data;
    setLoading(false);
    return data;
  };

  return (
    <Router>
      <Navbav />
      <div className='container col-sm-6'>
        <Route exact path='/'>
          <AddTodo addTodo={addTodo} />
          {loading ? (
            <div>
              <h3>Loading ...</h3>
            </div>
          ) : (
            [
              !loading && todos.length ? (
                <Todos
                  todos={todos}
                  onCheck={onCheck}
                  deleteTodo={deleteTodo}
                  updateTodoText={updateTodoText}
                />
              ) : (
                <div>
                  <h3>No Todos to show</h3>
                  <p>Why not add one using the input field above.</p>
                </div>
              ),
            ]
          )}
        </Route>
        <Route exact path='/about'>
          <AboutPage />
        </Route>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
