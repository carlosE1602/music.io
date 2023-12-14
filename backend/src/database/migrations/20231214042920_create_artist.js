exports.up = function (knex) {
	return knex.schema.createTable("artists", function (table) {
		table.string("id").primary();
		table.string("name").notNullable();
        table.string("url");
    });
};

exports.down = function (knex) {
	return knex.schema.dropTable("artists");
};
