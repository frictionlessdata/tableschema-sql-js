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
    	var required = false;
    	if (typeof fs[i].constraints !== 'undefined' && typeof fs[i].constraints['required'] !== 'undefined') {
    		required = fs[i].constraints['required'];
    	}
      sqlz_schema[fs[i].name] = {
        type: JTS_TYPE[fs[i].type],
        field: fs[i].name,
        allowNull: !required
      };
    }
    return sqlz_schema;
  }
};
