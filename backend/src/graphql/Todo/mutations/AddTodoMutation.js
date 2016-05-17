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

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { cursorForObjectInConnection, mutationWithClientMutationId } from 'graphql-relay';

import { addTodo, getTodo, getTodos } from '../../../data/Todo';
import { GraphQLTodoEdge } from '../';
import GraphQLViewer, { viewer } from '../../Viewer';

export default mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: () => ({
    text: { type: new GraphQLNonNull(GraphQLString) },
  }),
  outputFields: () => ({
    todoEdge: {
      type: GraphQLTodoEdge,
      resolve: ({ localTodoId }) => {
        const todo = getTodo(localTodoId);
        return {
          cursor: cursorForObjectInConnection(getTodos(), todo),
          node: todo,
        };
      },
    },
    viewer: {
      type: GraphQLViewer,
      resolve: () => viewer,
    },
  }),
  mutateAndGetPayload: ({ text }) => ({ localTodoId: addTodo(text) }),
});
