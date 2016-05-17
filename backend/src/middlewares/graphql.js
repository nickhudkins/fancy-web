import graphQLHTTP from 'express-graphql';

import logger from '../utils/logger';
import schema from '../graphql/schema';

export default graphQLHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  pretty: process.env.NODE_ENV !== 'production',

  formatError: error => {
    logger.error(error);
    return { message: 'Internal server error.' };
  },
});
