const connection = require("../database/connection");
const crypto = require("crypto");
const Hash = require("../utilities/Hash");
const { connect } = require("http2");
const axios =  require("axios")
const api = require("../utilities/api");


module.exports = {
	async create(request, response) {
        let {
            writer,
            avaliadoid,
            rating,
            comment
		} = request.body;
        const id = crypto.randomBytes(4).toString("HEX");
        if (rating == undefined || rating < 0 || rating > 5){
            return response.status(409).json({ error: "Nota deve ser entre 0 e 5" });
        }
        
		let avaliacao = {
			id,
            writer,
            avaliadoid,
            rating,
            comment,
            t_date:new Date()
		};
        
		await connection("avaliacao").insert(avaliacao);

		return response.json({ id });
	},

    async list(request, response) {
        const { id_music } = request.params;
    
        const page = request.query.page != undefined ? request.query.page : 1;
        const limit = request.query.limit != undefined ? request.query.limit : 10;
    

		const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        

        if (id_music != null){
            const avaliacoes = await connection("avaliacao")
			.where("avaliadoid", id_music)
            .select("*");
		    const result = {
                NumPag: Math.ceil(avaliacoes.length / limit),
                NumElements: avaliacoes.length,
                data: avaliacoes.slice(startIndex, endIndex),
            };
            return response.json(result);
    
        }
		const avaliacoes = await connection("avaliacao")
			.select("*");
            const result = {
                NumPag: Math.ceil(avaliacoes.length / limit),
                NumElements: avaliacoes.length,
                data: avaliacoes.slice(startIndex, endIndex),
            };
            return response.json(result);    
	},

    async delete(request, response) {
		const { id } = request.body;
		await connection("avaliacao").where("id",id).delete();
		return response.json(1);
	},
};
