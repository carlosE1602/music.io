exports.up = function (knex) {
	return knex.schema.createTable("albuns", function (table) {
		table.string("id").primary();
		table.string("name").notNullable();
        table.string("artistid").notNullable();
        table.string("imageurl").notNullable();
        table.string("url");

    });
};

exports.down = function (knex) {
	return knex.schema.dropTable("albuns");
};
