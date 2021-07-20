import { render, screen, cleanup, contains } from '@testing-library/react';
import Todo from '../Todo';

// Cleanup
afterEach(() => {
  cleanup();
});

// Test Cases
test('should render completed todo', () => {
  const todo = { id: 1, title: 'wash dishes', completed: true };
  render(<Todo todo={todo} />);

  const container = screen.getByTestId(`todo-${todo.id}`);
  expect(container.firstChild.textContent).toBe(todo.title);
  expect(
    container.firstChild.classList.contains('text-decoration-line-through')
  ).toBe(true);
});

test('should render NON completed todo', () => {
  const todo = { id: 1, title: 'make dinner', completed: false };
  render(<Todo todo={todo} />);

  const container = screen.getByTestId(`todo-${todo.id}`);
  expect(container.firstChild.textContent).toBe(todo.title);
  expect(
    container.firstChild.classList.contains('text-decoration-line-through')
  ).toBe(false);
});
