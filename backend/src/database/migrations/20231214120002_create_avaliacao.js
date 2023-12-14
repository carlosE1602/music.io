exports.up = function (knex) {
	return knex.schema.createTable("avaliacao", function (table) {
		table.string("id").primary();
		table.string("writer").notNullable();
        table.string("avaliadoid").notNullable();        
        table.float("rating").notNullable();
        table.date("t_date").notNullable();
        table.string("comment");

    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("avaliacao");
};
