const connection = require("../database/connection");
const crypto = require("crypto");
const Hash = require("../utilities/Hash");
const { connect } = require("http2");
const axios =  require("axios")
const api = require("../utilities/api");


module.exports = {
	async create(request, response) {
        let {
            donoid,
            name,
            image,
						descricao
		} = request.body;

        const id = crypto.randomBytes(4).toString("HEX");
           
		let playlist = {
			id,
			donoid,
            name,
            image,
						descricao,
		};
        
		await connection("playlist").insert(playlist);

		return response.json({ id });
	},

    async list(request, response) {
		let playlist;
		const playlistid = request.query.playlistid;
		const donoid = request.query.donoid;
		const contain = request.query.contain;
        const genre = request.query.genre;

		const page = request.query.page != undefined ? request.query.page : 1;
		const limit = request.query.limit != undefined ? request.query.limit : 10;
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		if (playlistid != undefined){
			playlist = await connection("playlist")
			.join("users", "playlist.donoid", "users.id")
			.where("playlist.id", playlistid)
			.first()
			.select(["playlist.id as id", "playlist.name as name", "playlist.image as image", "users.nickname as dono", "playlist.descricao as descricao", "playlist.donoid as donoid"])
			
			const musics = await connection("playlist_music")
			.join("musics", "playlist_music.musicid", "musics.id")
			.join('artists', 'artists.id', 'musics.artistid')
			.join('albuns', 'albuns.id', 'musics.albumid')
			.where("playlistid", playlistid)
			.select(["musics.id", "musics.name as name", "artists.name as artist", "duration", "albuns.imageurl as image", "musics.genreid"])
			const filter = musics.filter((music)=>{
				return ((contain==undefined || music["name"].toLowerCase().includes(contain.toLowerCase()) || music["artist"].toLowerCase().includes(contain.toLowerCase())) && (genre == undefined || music["genreid"] === genre) )
			})
			const result = {
				NumPag: Math.ceil(filter.length / limit),
				NumElements: filter.length,
				data: filter.slice(startIndex, endIndex),
			};

			playlist["musics"] = result


			return response.json(playlist)
		}
		else if (donoid != undefined){
			playlist = await connection("playlist")
			.join("users", "playlist.donoid", "users.id")
			.where("users.id", donoid)
			.select(["playlist.id as id", "playlist.name as name", "playlist.image as image", "users.nickname as dono"])
		}
		else{
			playlist = await connection("playlist")
			.join("users", "playlist.donoid", "users.id")
			.select(["playlist.id as id", "playlist.name as name", "playlist.image as image", "users.nickname as dono"]);	
		}

		const filter = playlist.filter((p)=>{
			return (contain==undefined || p["name"].toLowerCase().includes(contain.toLowerCase()) || p["dono"].toLowerCase().includes(contain.toLowerCase()))
		})
		
		const result = {
			NumPag: Math.ceil(filter.length / limit),
			NumElements: filter.length,
			data: filter.slice(startIndex, endIndex),
		};
		return response.json(result);
	},

    async delete(request, response) {
		const { id } = request.body;
		await connection("playlist").where("id",id).delete();
		return response.json(1);
	},

	async addmusic(request, response) {
		const { userid, playlistid, musicid } = request.body;
		
		const playlist = await connection("playlist")
		.where("id", playlistid)
		.first();
		if (playlist == undefined) {
			return response.status(409).json({ error: "Playlist nao encontrada" });
		}
		if (playlist["donoid"] != userid){
			return response.status(409).json({ error: "Usuario nao e o dono da playlist" });	
		}

 
		const music = await connection("musics")
		.join("albuns", "musics.albumid", "albuns.id")
		.where("musics.id", musicid)
		.first();
		if (music == undefined) {
			return response.status(409).json({ error: "Musica nao encontrada" });
		}



		const existe = await connection("playlist_music")
		.where("musicid", musicid)
		.where("playlistid", playlistid)
		.first()

		if (existe != undefined) {
			return response.status(409).json({ error: "Musica ja na playlist" });
		}
		
		try{
			if(!playlist["image"]){
				await connection("playlist").where({ id: playlist.id }).update({ image: music["imageurl"] });
			}
		} catch(err){
		}

		
		let obj = {
			musicid,
			playlistid
		}

		await connection("playlist_music").insert(obj);

		return response.json(1)
		await connection("playlist").where("id",id).delete();
		return response.json(1);
	},

	async deletemusic(request, response) {
		const { userid, playlistid, musicid } = request.body;
		

		if(!userid || !playlistid || !musicid) 
		return response.status(400).json({ error: "Parâmetros inválidos" });


		const playlist = await connection("playlist")
		.where("id", playlistid)
		.first();
		if (playlist == undefined) {
			return response.status(409).json({ error: "Playlist nao encontrada" });
		}
		if (playlist["donoid"] != userid){
			return response.status(409).json({ error: "Usuario nao e o dono da playlist" });	
		}

		const music = await connection("musics")
		.where("id", musicid)
		.first();
		if (music == undefined) {
			return response.status(409).json({ error: "Musica nao encontrada" });
		}

		const existe = await connection("playlist_music")
		.where("musicid", musicid)
		.where("playlistid", playlistid)
		.first()

		if (existe == undefined) {
			return response.status(409).json({ error: "Musica nao existente na playlist" });
		}

		await connection("playlist_music")
		.where("musicid", musicid)
		.where("playlistid", playlistid)
		.delete()

		return response.json(1)
		await connection("playlist").where("id",id).delete();
		return response.json(1);
	},



};
