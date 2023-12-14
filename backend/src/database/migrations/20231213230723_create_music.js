exports.up = function (knex) {
	return knex.schema.createTable("musics", function (table) {
		table.string("id").primary();
		table.string("name").notNullable();
		table.float("duration").notNullable();
        table.string("albumid").notNullable();
        table.string("artistid").notNullable();
        table.string("genreid").notNullable();
        table.string("url");
        
    });
};

exports.down = function (knex) {
	return knex.schema.dropTable("musics");
};
