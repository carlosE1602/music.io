const connection = require("../database/connection");
const crypto = require("crypto");
const Hash = require("../utilities/Hash");


async function insertGenre(id_user, id_genre){
	await connection("user_genres").insert({
		id_user,
		id_genre
	});
}

module.exports = {
	async create(request, response) {
        const {
			email,
			password1,
			password2,
			nickname,
			genres
		} = request.body;

		const id = crypto.randomBytes(4).toString("HEX");
        const email_existene = await connection("users")
			.where("email", email)
			.first();
		if (email_existene != undefined) {
			return response.status(409).json({ error: "Email ja cadastrado." });
		}
		if (password1 != password2) {
			return response
				.status(409)
				.json({ error: "As senhas devem ser iguais." });
		}
		if (password1.length < 7) {
			return response.status(409).json({ error: "A senha deve ter no minimo 7 caracteres" });
		}
		const password = Hash(password1);
		let user = {
			id,
            email,
            password,
			nickname
		};

		await connection("users").insert(user);

		for (const element of genres) {
			await insertGenre(id,element)
		}

		return response.json({ id });
	},

    async list(request, response) {
		const users = await connection("users")
			.select("*");
		return response.json(users);
	},

    async delete(request, response) {
		const { id } = request.body;
		await connection("users").where("id", id).delete();
		return response.json(1);
	},
};
