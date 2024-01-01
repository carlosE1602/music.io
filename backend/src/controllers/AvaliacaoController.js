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
        const { id } = request.params;

        const page = request.query.page !== undefined ? parseInt(request.query.page) : 1;
        const limit = request.query.limit !== undefined ? parseInt(request.query.limit) : 10;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        try {
            if (id != null) {
                const avaliacoes = await connection("avaliacao")
                    .join("users", "users.id", "avaliacao.writer")
                    .where("avaliadoid", id)
                    .select("avaliacao.id", "avaliadoid", "t_date","comment", "rating","users.nickname as criador");
                console.log(avaliacoes)
                let rating = 0
                for (const element of avaliacoes){
                    rating = rating + element["rating"]
                    console.log(element)
                }
                rating/= avaliacoes.length
                
                const result = {
                    rating,
                    NumPag: Math.ceil(avaliacoes.length / limit),
                    NumElements: avaliacoes.length,
                    data: avaliacoes.slice(startIndex, endIndex)
                };
                return response.json(result);
            } else {
                const avaliacoes = await connection("avaliacao")
                .select("*");
                const result = {
                    NumPag: Math.ceil(avaliacoes.length / limit),
                    NumElements: avaliacoes.length,
                    data: avaliacoes.slice(startIndex, endIndex),
                };
            return response.json(result);  
            }
            
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }  
	},


    async delete(request, response) {
		const { id } = request.body;
		await connection("avaliacao").where("id",id).delete();
		return response.json(1);
	},
};
