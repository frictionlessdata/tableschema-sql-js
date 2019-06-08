var Sequelize = require('sequelize');

module.exports = {
  sqlz: function(s) {
    var sqlz_schema = {},
        JTS_TYPE = {
          'string': Sequelize.STRING,
          'enum': Sequelize.ENUM,
          'integer': Sequelize.BIGINT,
          'boolean': Sequelize.BOOLEAN,
          'number': Sequelize.FLOAT,
          'date': Sequelize.DATEONLY,
          'datetime': Sequelize.DATE,
          'time': Sequelize.TIME,
        };

    fs = s.fields;
    for (var i in fs) {
      var required = false;
      if (typeof fs[i].constraints !== 'undefined' && typeof fs[i].constraints['required'] !== 'undefined') {
        required = fs[i].constraints['required'];
      }
      var sqlz_schema_fill = null;
      if (typeof fs[i].constraints !== 'undefined' && typeof fs[i].constraints['enum'] !== 'undefined') {
        sqlz_schema_fill = {
            type: JTS_TYPE['enum'],
            values: fs[i].constraints['enum'],
          field: fs[i].name,
          allowNull: !required
        };
      } else {
        sqlz_schema_fill = {
          type: JTS_TYPE[fs[i].type],
          field: fs[i].name,
          allowNull: !required
        };
      }
      sqlz_schema[fs[i].name] = sqlz_schema_fill;
    }
    return sqlz_schema;
  }
};
