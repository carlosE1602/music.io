exports.up = function (knex) {
	return knex.schema.createTable("users", function (table) {
		table.string("id").primary();
		table.string("email").notNullable();
		table.string("password").notNullable();
		table.string("nickname").notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("users");
};
