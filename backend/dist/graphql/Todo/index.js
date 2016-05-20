'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLTodoEdge = exports.GraphQLTodoConnection = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Todo = require('../../data/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

var _node = require('../node');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var TODO_TYPE_NAME = 'Todo';

(0, _node.registerNodeFetcher)(TODO_TYPE_NAME, function (id) {
  return (0, _Todo.getTodo)(id);
});

var GraphQLTodo = new _graphql.GraphQLObjectType({
  name: TODO_TYPE_NAME,
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)(),
      text: {
        type: _graphql.GraphQLString,
        resolve: function resolve(obj) {
          return obj.text;
        }
      },
      complete: {
        type: _graphql.GraphQLBoolean,
        resolve: function resolve(obj) {
          return obj.complete;
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_node.nodeInterface];
  },
  isTypeOf: function isTypeOf(obj) {
    return obj instanceof _Todo2.default;
  }
});

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({ nodeType: GraphQLTodo });

var GraphQLTodoConnection = _connectionDefinition.connectionType;
var GraphQLTodoEdge = _connectionDefinition.edgeType;
exports.GraphQLTodoConnection = GraphQLTodoConnection;
exports.GraphQLTodoEdge = GraphQLTodoEdge;
exports.default = GraphQLTodo;