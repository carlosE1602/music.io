exports.up = function (knex) {
	return knex.schema.createTable("playlist_music", function (table) {
		table.string("musicid").primary();
		table.string("playlistid").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("playlist_music");
};
