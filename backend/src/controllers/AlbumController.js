const connection = require("../database/connection");
const crypto = require("crypto");
const Hash = require("../utilities/Hash");
const { connect } = require("http2");
const axios =  require("axios")
const api = require("../utilities/api");


module.exports = {
	async create(request, response) {
        let {
            id,
            name,
            artistid,
            url
		} = request.body;

        if (id != undefined){
            const album_existente = await connection("albuns")
            .where("id", id)
            .first();
            if (album_existente != undefined) {
                return response.status(409).json({ error: "Album ja cadastrado" });
            }
        }
        else{
            id = crypto.randomBytes(4).toString("HEX");
        }
        
		let album = {
			id,
            name,
            artistid,
            url
		};
        
		await connection("albuns").insert(album);

		return response.json({ id });
	},

    async list(request, response) {
		const albuns = await connection("albuns")
			.select("*");
		return response.json(albuns);
	},

    async delete(request, response) {
		const { id } = request.body;
		await connection("albuns").where("id",id).delete();
		return response.json(1);
	},
};
