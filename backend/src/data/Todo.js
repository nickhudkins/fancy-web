/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export default class Todo {}

const todosById = new Map;
const todoIds = [];
let nextTodoId = 0;

export function addTodo(text, complete) {
  const todo = new Todo();
  todo.complete = !!complete;
  todo.id = String(nextTodoId++);
  todo.text = text;
  todosById.set(todo.id, todo);
  todoIds.push(todo.id);
  return todo.id;
}

export function getTodo(id) {
  return todosById.get(id);
}

export function changeTodoStatus(id, complete) {
  const todo = getTodo(id);
  todo.complete = complete;
}

export function getTodos(status = 'any') {
  const todos = todoIds.map(id => todosById.get(id));
  return status === 'any' ?
    todos :
    todos.filter(todo => todo.complete === (status === 'completed'));
}

export function markAllTodos(complete) {
  return getTodos().filter(todo => todo.complete !== complete).map(todo => {
    /* eslint-disable no-param-reassign */
    todo.complete = complete;
    /* eslint-enable no-param-reassign */
    return todo.id;
  });
}

export function removeTodo(id) {
  const todoIndex = todoIds.indexOf(id);
  if (todoIndex !== -1) {
    todoIds.splice(todoIndex, 1);
  }

  delete todosById[id];
}

export function removeCompletedTodos() {
  return getTodos().filter(todo => todo.complete).map(todo => {
    removeTodo(todo.id);
    return todo.id;
  });
}

export function renameTodo(id, text) {
  const todo = getTodo(id);
  todo.text = text;
}

// Mock data
addTodo('Taste JavaScript', true);
addTodo('Buy a unicorn', false);
