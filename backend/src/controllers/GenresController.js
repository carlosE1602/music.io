const connection = require("../database/connection");
const crypto = require("crypto");


module.exports = {	
	async create(request, response) {
		const {
			name
		} = request.body;
        const id = crypto.randomBytes(4).toString("HEX");
        
        const genero_existene = await connection("genres")
			.where("name", name)
			.first();
		if (genero_existene != undefined) {
			return response.status(409).json({ error: "Genero ja cadastrado" });
		}
		
		let genre = {
			id,
            name
		};
		await connection("genres").insert(genre);
		return response.json({ id });
	},

    async list(request, response) {
		const { id } = request.params;

		if (id != undefined){
			const genres = await connection("genres")
			.where("id", id)
			.select("*");
			return response.json(genres);
		}
		else{
			const genres = await connection("genres")
			.select("*");
			return response.json(genres);
		}
		
	},


    async delete(request, response) {
		const { id } = request.body;
		await connection("genres").where("id", id).delete();
		return response.json(1);
	},
};
