exports.up = function (knex) {
	return knex.schema.createTable("playlist", function (table) {
		table.string("id").primary();
		table.string("donoid").notNullable();
        table.string("name").notNullable();        
        table.string("image");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("playlist");
};
