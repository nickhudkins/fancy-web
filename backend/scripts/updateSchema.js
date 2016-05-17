#!/usr/bin/env babel-node
import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

import logger from '../src/utils/logger';
import schema from '../src/graphql/schema';

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await graphql(schema, introspectionQuery);
  if (result.errors) {
    logger.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.resolve(__dirname, '..', 'schema.graphql'),
  printSchema(schema)
);
