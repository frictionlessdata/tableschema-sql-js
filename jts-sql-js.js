var Sequelize = require('sequelize');
var SchemaTable = require('./').SchemaTable;
var streamify = require('stream-array'); // only needed to turn array -> stream

// your rows of data - maybe you loaded these from a CSV :-)
var data = [
  {'foo': 3, 'bar': 'YES'},
  {'foo': 5, 'bar': 'NO'}
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
		  'required': true,
		  'enum': ['YES', 'NO']
	  }
    }
  ]
};

var engine = null;
var dbdialect = 'mysql';
switch (dbdialect) {
case 'sqlite':
	engine = new Sequelize('datastore', 'datastore', '', {
		dialect: dbdialect,
		storage: './example.db'
	});
	break;
case 'mysql':
	engine = new Sequelize({
	    dialect: dbdialect,
	    database: 'example',
	    username: 'root',
	    password: 'root'
	  });
	break;
};

var table = SchemaTable(engine, 'foo_table', schema);
table.create().then(function () {
  table.load_iter(streamify(data));
});