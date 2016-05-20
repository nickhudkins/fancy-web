'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Todo = require('../../../data/Todo');

var _Viewer = require('../../Viewer');

var _Viewer2 = _interopRequireDefault(_Viewer);

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

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'RemoveTodo',
  inputFields: function inputFields() {
    return {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
    };
  },
  outputFields: function outputFields() {
    return {
      deletedTodoId: {
        type: _graphql.GraphQLID,
        resolve: function resolve(_ref) {
          var id = _ref.id;
          return id;
        }
      },
      viewer: {
        type: _Viewer2.default,
        resolve: function resolve() {
          return _Viewer.viewer;
        }
      }
    };
  },

  mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
    var id = _ref2.id;

    var localTodoId = (0, _graphqlRelay.fromGlobalId)(id).id;
    (0, _Todo.removeTodo)(localTodoId);
    return { id: id };
  }
});