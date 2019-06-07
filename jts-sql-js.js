var Sequelize = require('sequelize');
var SchemaTable = require('./').SchemaTable;
var streamify = require('stream-array'); // only needed to turn array -> stream

// your rows of data - maybe you loaded these from a CSV :-)
var data = [
  {'foo': 3, 'bar': 'hello'},
  {'foo': 5, 'bar': 'bye'}
];

// this is your JSON Table Schema - http://dataprotocols.org/json-table-schema/
var schema = {
  'fields': [
    {
      'name': 'foo',
      'type': 'integer'
    },
    {
      'name': 'bar',
      'type': 'string',
	  'constraints': {
		  'required': true
	  }
    }
  ]
};

var engine = new Sequelize('datastore', 'datastore', '', {
  dialect: 'sqlite',
  storage: './example.db'
});

var table = SchemaTable(engine, 'foo_table', schema);
table.create().then(function () {
  table.load_iter(streamify(data));
});