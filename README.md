# jts-sql-js
Library for converting JSON Table Schema to an SQL table, for Node and the browser.

## Usage

Here's an example of using ``jts-sql-js``:

```
var Sequelize = require('sequelize');
var SchemaTable = require('jts-sql-js').SchemaTable;

# your rows of data - maybe you loaded these from a CSV :-)
# e.g. data = [ row for row in csv.DictReader(open('mycsv.csv')) ]
var data = [
  {'foo': 3, 'bar': 'hello'},
  {'foo': 5, 'bar': 'bye'}
];

# this is your JSON Table Schema - http://dataprotocols.org/json-table-schema/
var schema = {
  'fields': [
    {
      'name': 'foo',
      'type': 'integer'
    },
    {
      'name': 'bar',
      'type': 'string'
    }
  ]
};

var engine = new Sequelize('datastore', 'datastore', '', {
  dialect: 'sqlite',
  storage: './example.db'
});
var table = SchemaTable(engine, 'foo_table', schema);
table.create();
table.load_iter(data);

var sqlz_table = table.table;
```

## Tests

`mocha`
