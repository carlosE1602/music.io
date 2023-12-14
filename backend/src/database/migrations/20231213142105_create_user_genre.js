exports.up = function (knex) {
	return knex.schema.createTable("user_genres", function (table) {
		table.string("id_user").notNullable();
		table.string("id_genre").notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("user_genres");
};
