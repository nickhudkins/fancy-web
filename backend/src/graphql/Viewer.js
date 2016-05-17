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

import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';

import { getTodos } from '../data/Todo';
import { nodeInterface, registerNodeFetcher } from './node';
import { GraphQLTodoConnection } from './Todo';

const VIEWER_TYPE_NAME = 'Viewer';

export const viewer = {};

registerNodeFetcher(VIEWER_TYPE_NAME, () => viewer);

export default new GraphQLObjectType({
  name: VIEWER_TYPE_NAME,
  fields: () => ({
    id: globalIdField(),
    todos: {
      type: GraphQLTodoConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: (obj, { status, ...args }) => connectionFromArray(getTodos(status), args),
    },
    totalCount: {
      type: GraphQLInt,
      resolve: () => getTodos().length,
    },
    completedCount: {
      type: GraphQLInt,
      resolve: () => getTodos('completed').length,
    },
  }),
  interfaces: () => [nodeInterface],
  isTypeOf: obj => (obj === viewer),
});
