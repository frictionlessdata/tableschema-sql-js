var Sequelize = require('sequelize');
var SchemaTable = require('./').SchemaTable;
var streamify = require('stream-array');
var fs = require('fs');

var exampledb = 'example.db';
var data = [
  {'foo': 3, 'bar': 'hello'},
  {'foo': 5, 'bar': 'bye'}
];

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

var engine = new Sequelize('', '', '', {
  dialect: 'sqlite',
  storage: exampledb
});

var table = SchemaTable(engine, 'foo_table', schema);

var assert = require("assert");
describe('Example Database', function() {
  describe('result.count', function () {
    it('should return 2 once data is loaded', function (done) {
      table.create().then(function () {
        var stream = streamify(data);
        table.load_iter(stream, 1000);
      }).then(function() {
        table.table.findAndCountAll()
          .then(function(result) {
            done();
            assert.equal(2, result.count);
          });
      });
    });
    after(function () {
      fs.unlink(exampledb);
    });
  });
});
