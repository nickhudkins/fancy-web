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

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { nodeField } from './node';
import GraphQLAddTodoMutation from './Todo/mutations/AddTodoMutation';
import GraphQLChangeTodoStatusMutation from './Todo/mutations/ChangeTodoStatusMutation';
import GraphQLMarkAllTodosMutation from './Todo/mutations/MarkAllTodosMutation';
import GraphQLRemoveCompletedTodosMutation from './Todo/mutations/RemoveCompletedTodosMutation';
import GraphQLRemoveTodoMutation from './Todo/mutations/RemoveTodoMutation';
import GraphQLRenameTodoMutation from './Todo/mutations/RenameTodoMutation';
import GraphQLViewer, { viewer } from './Viewer';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: GraphQLViewer,
      resolve: () => viewer,
    },
    node: nodeField,
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: GraphQLAddTodoMutation,
    changeTodoStatus: GraphQLChangeTodoStatusMutation,
    markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation,
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
