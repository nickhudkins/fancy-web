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

import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import Todo, { getTodo } from '../../data/Todo';
import { nodeInterface, registerNodeFetcher } from '../node';

const TODO_TYPE_NAME = 'Todo';

registerNodeFetcher(TODO_TYPE_NAME, id => getTodo(id));

const GraphQLTodo = new GraphQLObjectType({
  name: TODO_TYPE_NAME,
  fields: () => ({
    id: globalIdField(),
    text: {
      type: GraphQLString,
      resolve: obj => obj.text,
    },
    complete: {
      type: GraphQLBoolean,
      resolve: obj => obj.complete,
    },
  }),
  interfaces: () => [nodeInterface],
  isTypeOf: obj => obj instanceof Todo,
});

export const {
  connectionType: GraphQLTodoConnection,
  edgeType: GraphQLTodoEdge,
} = connectionDefinitions({ nodeType: GraphQLTodo });

export default GraphQLTodo;
