'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
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

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Todo = require('../data/Todo');

var _node = require('./node');

var _Todo2 = require('./Todo');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var VIEWER_TYPE_NAME = 'Viewer';

var viewer = exports.viewer = {};

(0, _node.registerNodeFetcher)(VIEWER_TYPE_NAME, function () {
  return viewer;
});

exports.default = new _graphql.GraphQLObjectType({
  name: VIEWER_TYPE_NAME,
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)(),
      todos: {
        type: _Todo2.GraphQLTodoConnection,
        args: _extends({
          status: {
            type: _graphql.GraphQLString,
            defaultValue: 'any'
          }
        }, _graphqlRelay.connectionArgs),
        resolve: function resolve(obj, _ref) {
          var status = _ref.status;

          var args = _objectWithoutProperties(_ref, ['status']);

          return (0, _graphqlRelay.connectionFromArray)((0, _Todo.getTodos)(status), args);
        }
      },
      totalCount: {
        type: _graphql.GraphQLInt,
        resolve: function resolve() {
          return (0, _Todo.getTodos)().length;
        }
      },
      completedCount: {
        type: _graphql.GraphQLInt,
        resolve: function resolve() {
          return (0, _Todo.getTodos)('completed').length;
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_node.nodeInterface];
  },
  isTypeOf: function isTypeOf(obj) {
    return obj === viewer;
  }
});