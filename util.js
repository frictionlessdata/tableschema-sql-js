var Sequelize = require('sequelize');

module.exports = {
  sqlz: function(s) {
    var sqlz_schema = {},
        JTS_TYPE = {
          'string': Sequelize.STRING,
          'integer': Sequelize.BIGINT,
          'boolean': Sequelize.BOOLEAN,
          'number': Sequelize.FLOAT,
          'date': Sequelize.STRING
        };

    fs = s.fields;
    for (var i in fs) {
      sqlz_schema[fs[i].name] = {
        type: JTS_TYPE[fs[i].type],
        field: fs[i].name,
        allowNull: true
      };
    }
    return sqlz_schema;
  }
};
