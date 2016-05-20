'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeField = exports.nodeInterface = undefined;
exports.registerNodeFetcher = registerNodeFetcher;

var _graphqlRelay = require('graphql-relay');

var nodeFetchers = new Map();

function registerNodeFetcher(type, fetcher) {
  if (nodeFetchers.has(type)) {
    throw new Error('Node fetcher for type "' + type + '" have already been registered.');
  }

  nodeFetchers.set(type, fetcher);
}

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId, info) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

  var type = _fromGlobalId.type;
  var id = _fromGlobalId.id;


  var fetcher = nodeFetchers.get(type);
  if (!fetcher) {
    throw new Error('Node fetcher for type "' + type + '" is not registered.');
  }

  return fetcher(id, info);
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;
exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;