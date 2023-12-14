const connection = require("../database/connection");
const crypto = require("crypto");
const Hash = require("../utilities/Hash");
const { connect } = require("http2");
const axios =  require("axios")
const api = require("../utilities/api");

async function insertMusic(music){
    await connection("musics").insert(music);
}



async function getRecomendation(genre){
    axios.get(api.url + "recommendations?limit=100&seed_genres=" + genre)
		.then((res) => {
            for (const element of res.data["tracks"]){
                let music = {
                    id: element["id"],
                    name: element["name"],
                    duration: element["duration_ms"],
                    albumid: element["album"]["id"],
                    url: element["album"]["external_urls"]["spotify"]
                }
                insertMusic(music)
            }
            
            //         for (const element of res.data) {
    //             console.log(element)
    //             break
    // //			genres = genres.concat(element["id_genre"])
    //         }
            //console.log(res.data)
        })
		.catch((err) => console.error(err));
}

module.exports = {
	async create(request, response) {
        let {
            id,
            name,
            url
		} = request.body;

        if (id != undefined){
            const artista_existente = await connection("artists")
            .where("id", id)
            .first();
            if (artista_existente != undefined) {
                return response.status(409).json({ error: "Artista ja cadastrado" });
            }
        }
        else{
            id = crypto.randomBytes(4).toString("HEX");
        }
        
		let artist = {
			id,
            name,
            url
		};
        
		await connection("artists").insert(artist);

		return response.json({ id });
	},

    async list(request, response) {
		const artists = await connection("artists")
			.select("*");
		return response.json(artists);
	},

    async delete(request, response) {
		const { id } = request.body;
		await connection("artists").where("id",id).delete();
		return response.json(1);
	},

    async import(request, response){
        axios.defaults.headers.common = {'Authorization': `Bearer ` + api.bearer}
        const genres = await connection("genres").select("name")
        console.log(api.url + "tracks/6Z30LRMwZecywOGvRvh5ak")
        // axios.get(api.url + "tracks/6Z30LRMwZecywOGvRvh5ak")
		// .then((res) => console.log(res.data))
		// .catch((err) => console.error(err));
        for (const element of genres) {
            getRecomendation(element["name"])
            console.log(element["name"])
            await new Promise(r => setTimeout(r, 30000));
            //			genres = genres.concat(element["id_genre"])
		}

        return response.json(genres)

    }
};
