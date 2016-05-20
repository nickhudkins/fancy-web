'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _node = require('./node');

var _AddTodoMutation = require('./Todo/mutations/AddTodoMutation');

var _AddTodoMutation2 = _interopRequireDefault(_AddTodoMutation);

var _ChangeTodoStatusMutation = require('./Todo/mutations/ChangeTodoStatusMutation');

var _ChangeTodoStatusMutation2 = _interopRequireDefault(_ChangeTodoStatusMutation);

var _MarkAllTodosMutation = require('./Todo/mutations/MarkAllTodosMutation');

var _MarkAllTodosMutation2 = _interopRequireDefault(_MarkAllTodosMutation);

var _RemoveCompletedTodosMutation = require('./Todo/mutations/RemoveCompletedTodosMutation');

var _RemoveCompletedTodosMutation2 = _interopRequireDefault(_RemoveCompletedTodosMutation);

var _RemoveTodoMutation = require('./Todo/mutations/RemoveTodoMutation');

var _RemoveTodoMutation2 = _interopRequireDefault(_RemoveTodoMutation);

var _RenameTodoMutation = require('./Todo/mutations/RenameTodoMutation');

var _RenameTodoMutation2 = _interopRequireDefault(_RenameTodoMutation);

var _Viewer = require('./Viewer');

var _Viewer2 = _interopRequireDefault(_Viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      viewer: {
        type: _Viewer2.default,
        resolve: function resolve() {
          return _Viewer.viewer;
        }
      },
      node: _node.nodeField
    };
  }
}); /**
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

var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: _AddTodoMutation2.default,
    changeTodoStatus: _ChangeTodoStatusMutation2.default,
    markAllTodos: _MarkAllTodosMutation2.default,
    removeCompletedTodos: _RemoveCompletedTodosMutation2.default,
    removeTodo: _RemoveTodoMutation2.default,
    renameTodo: _RenameTodoMutation2.default
  }
});

exports.default = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});