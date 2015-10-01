var Sequelize = require('sequelize'),
    sqlz = require('./util.js').sqlz;

module.exports = {
  SchemaTable: function(engine, table_name, schema) {
    var Table = {
      table: engine.define(table_name, sqlz(schema), {
        freezeTableName: true
      }),
      select: function() {
        console.log("Not implemented");
      },
      create: function() {
        return engine.sync();
      },
      load_iter: function(stream, chunk_size) {
        var buf = [],
            that = this;

        stream.on('readable', function() {
          // Add records to buffer from datapackage 1000 at a time

          var record = stream.read();
          for (var k in record) {
            if (record[k] === "") {
              record[k] = null;
            }
          }
          buf.push(record);
          if (buf.length % chunk_size === 0) {
            that.table.bulkCreate(buf);
            buf = [];
          }
        });

        stream.on('end', function() {
          // Upload remaining records
          that.table.bulkCreate(buf);
        });

      }
    };
    return Table;
  }
};
