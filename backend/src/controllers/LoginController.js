const connection = require("../database/connection");
const Hash = require("../utilities/Hash");

module.exports = {
	async login(request, response) {
		const { email, password } = request.body;
		if (email == undefined) {
			return response
				.status(406)
				.json({ error: "O campo de email é obrigatório" });
		}
		if (password == undefined) {
			return response
				.status(406)
				.json({ error: "O campo de senha é obrigatório" });
		}
		const confirm = await connection("users").where("email", email).first();
		if (confirm == undefined) {
			return response.status(406).json({ error: "Email não encontrado" });
		}
		if (confirm.password != Hash(password)) {
			return response
				.status(406)
				.json({ error: "Email ou senha incorretos" });
		}
		return response.json(confirm);
	},
};
