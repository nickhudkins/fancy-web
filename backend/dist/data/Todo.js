'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTodo = addTodo;
exports.getTodo = getTodo;
exports.changeTodoStatus = changeTodoStatus;
exports.getTodos = getTodos;
exports.markAllTodos = markAllTodos;
exports.removeTodo = removeTodo;
exports.removeCompletedTodos = removeCompletedTodos;
exports.renameTodo = renameTodo;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Todo = function Todo() {
  _classCallCheck(this, Todo);
};

exports.default = Todo;


var todosById = new Map();
var todoIds = [];
var nextTodoId = 0;

function addTodo(text, complete) {
  var todo = new Todo();
  todo.complete = !!complete;
  todo.id = String(nextTodoId++);
  todo.text = text;
  todosById.set(todo.id, todo);
  todoIds.push(todo.id);
  return todo.id;
}

function getTodo(id) {
  return todosById.get(id);
}

function changeTodoStatus(id, complete) {
  var todo = getTodo(id);
  todo.complete = complete;
}

function getTodos() {
  var status = arguments.length <= 0 || arguments[0] === undefined ? 'any' : arguments[0];

  var todos = todoIds.map(function (id) {
    return todosById.get(id);
  });
  return status === 'any' ? todos : todos.filter(function (todo) {
    return todo.complete === (status === 'completed');
  });
}

function markAllTodos(complete) {
  return getTodos().filter(function (todo) {
    return todo.complete !== complete;
  }).map(function (todo) {
    /* eslint-disable no-param-reassign */
    todo.complete = complete;
    /* eslint-enable no-param-reassign */
    return todo.id;
  });
}

function removeTodo(id) {
  var todoIndex = todoIds.indexOf(id);
  if (todoIndex !== -1) {
    todoIds.splice(todoIndex, 1);
  }

  delete todosById[id];
}

function removeCompletedTodos() {
  return getTodos().filter(function (todo) {
    return todo.complete;
  }).map(function (todo) {
    removeTodo(todo.id);
    return todo.id;
  });
}

function renameTodo(id, text) {
  var todo = getTodo(id);
  todo.text = text;
}

// Mock data
addTodo('Taste JavaScript', true);
addTodo('Buy a unicorn', false);