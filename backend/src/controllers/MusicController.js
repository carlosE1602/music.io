const connection = require("../database/connection");
const crypto = require("crypto");
const Hash = require("../utilities/Hash");
const { connect } = require("http2");
const axios =  require("axios")
const api = require("../utilities/api");

async function insertMusic(music){
 
    const existente = await connection("musics")
            .where("id", music["id"])
            .first();
            if (existente != undefined) {
                return;
            }
    await connection("musics").insert(music);
}

async function insertArtist(artist){
    const existente = await connection("artists")
    .where("id", artist["id"])
    .first();
    if (existente != undefined) {
        return;
    }
    await connection("artists").insert(artist);
}

async function insertAlbum(album){
    const existente = await connection("albuns")
    .where("id", album["id"])
    .first();
    if (existente != undefined) {
        return;
    }
    await connection("albuns").insert(album);
}


function delay() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 100);
    });
}


async function getRecomendation(genre, genreid){
    axios.get(api.url + "recommendations?limit=100&seed_genres=" + genre)
		.then(async (res) => {
            for (const element of res.data["tracks"]){
                // console.log(element["artists"][0]["id"])
                let music = {
                    id: element["id"],
                    name: element["name"],
                    duration: element["duration_ms"],
                    albumid: element["album"]["id"],
                    artistid: element["artists"][0]["id"],
                    genreid,
                    url: element["external_urls"]["spotify"]
                }

                let artist = {
                    id: element["artists"][0]["id"],
                    name: element["artists"][0]["name"],
                    url: element["artists"][0]["external_urls"]["spotify"]
                }
                
                let album = {
                    id: element["album"]["id"],
                    name: element["album"]["name"],
                    artistid: element["artists"][0]["id"],
                    url: element["album"]["external_urls"]["spotify"],
                    imageurl: element["album"]["images"][0]["url"],
                }
                await insertMusic(music)
                await insertArtist(artist)
                await insertAlbum(album)
                //console.log("criando")
                // console.log(music)
                // console.log(artist)
                // console.log(album)
                // console.log(music)
                // console.log(artist)
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
            duration,
            albumid,
            artistid,
            genreid,
            url
		} = request.body;

        if (id != undefined){
            const musica_existente = await connection("musics")
            .where("id", id)
            .first();
            if (musica_existente != undefined) {
                return response.status(409).json({ error: "Musica ja cadastrada" });
            }
        }
        else{
            id = crypto.randomBytes(4).toString("HEX");
        }
        

		let music = {
			id,
            name,
            duration,
            albumid,
            artistid,
            genreid,
            url
		};
        
		await connection("musics").insert(music);

		return response.json({ id });
	},
    async list(request, response) {
		const musics = await connection("musics")
			.select("*");
		return response.json(musics);
	},

    async delete(request, response) {
		const { id } = request.body;
		await connection("musics").where("id",id).delete();
		return response.json(1);
	},

    async import(request, response){
        axios.defaults.headers.common = {'Authorization': `Bearer ` + api.bearer}
        const genres = await connection("genres").select("*")
       // console.log(api.url + "tracks/6Z30LRMwZecywOGvRvh5ak")
        // axios.get(api.url + "tracks/6Z30LRMwZecywOGvRvh5ak")
		// .then((res) => console.log(res.data))
		// .catch((err) => console.error(err));
        for (const element of genres) {
            console.log(element)
            await getRecomendation(element["name"], element["id"])
            //console.log(element["name"])
            await new Promise(r => setTimeout(r, 3000));
            //			genres = genres.concat(element["id_genre"])
		}

        return response.json(genres)

    }
};
