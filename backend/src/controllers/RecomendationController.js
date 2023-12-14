const connection = require("../database/connection");
const crypto = require("crypto");
const axios =  require("axios")
//const url = "https://api.spotify.com/v1/tracks/4JaTNsbucUxF3FtKqt3IY3"

const api = require("../utilities/api");
const UserController = require("./UserController");


module.exports = {	

    async list(request, response) {
		const genres = await connection("user_genres")
			.select("*");
		return response.json(genres);
	},

	async recomendation(request, response) {
		const page = request.query.page != undefined ? request.query.page : 1;
        const limit = request.query.limit != undefined ? request.query.limit : 10;
        const contain = request.query.contain;
        const genre = request.query.genre;

		console.log(genre)
		const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
		const { id_user } = request.params;
		if (contain != undefined || genre != undefined){
			const musics = await connection("musics")
			.join('artists', 'artists.id', 'musics.artistid')
			.join('albuns', 'albuns.id', 'musics.albumid')
			.select(["musics.id", "musics.name as name", "artists.name as artist", "duration", "albuns.imageurl as image", "musics.genreid"])
			
			const filter = musics.filter((music)=>{
				return ((contain==undefined || music["name"].toLowerCase().includes(contain.toLowerCase()) || music["artist"].toLowerCase().includes(contain.toLowerCase())) && (genre == undefined || music["genreid"] === genre) )
			})
			const result = {
				NumPag: Math.ceil(filter.length / limit),
				NumElements: filter.length,
				data: filter.slice(startIndex, endIndex),
			};
			return response.json(result);
		}


		const aux = await connection("user_genres")
		.select("id_genre")
		.where("id_user", id_user);

		const genres = []
		for (const element of aux){
			genres.push(element["id_genre"])
		}

		const musics = await connection("musics")
		.whereIn('genreid', genres)
		.join('artists', 'artists.id', 'musics.artistid')
		.join('albuns', 'albuns.id', 'musics.albumid')
		.select(["musics.id", "musics.name as name", "artists.name as artist", "duration", "albuns.imageurl as image"])
		;
		

		const result = {
			NumPag: Math.ceil(musics.length / limit),
			NumElements: musics.length,
			data: musics.slice(startIndex, endIndex),
		};
		return response.json(result);
	},

};
