const express = require('express');
const routes = express.Router();
const UserController = require ('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const GenresController = require('./controllers/GenresController')
const RecomendationController = require('./controllers/RecomendationController')
const MusicController = require('./controllers/MusicController')
const ArtistController = require('./controllers/ArtistController')
const AlbumController = require('./controllers/AlbumController')
const AvaliacaoController = require('./controllers/AvaliacaoController')
const PlaylistController = require('./controllers/PlaylistController')


//USERS
routes.post('/users', UserController.create);
routes.get('/users', UserController.list);
routes.delete('/users', UserController.delete);

//LOGIN
routes.post('/login', LoginController.login);

//GENRES
routes.post('/genres', GenresController.create);
routes.get('/genres', GenresController.list);
routes.get('/genres/:id', GenresController.list);
routes.delete('/genres', GenresController.delete);

//Recomendation
routes.get('/user_genres', RecomendationController.list);
routes.get('/recomendation/:id_user', RecomendationController.recomendation);

//MUSICS
routes.post('/musics', MusicController.create);
routes.get('/musics', MusicController.list);
routes.get('/musics/:id', MusicController.list);

routes.delete('/musics', MusicController.delete);
routes.get('/musics/import', MusicController.import);


//ARTISTS
routes.post('/artists', ArtistController.create);
routes.get('/artists', ArtistController.list);
routes.delete('/artists', ArtistController.delete);


//ALBUM
routes.post('/album', AlbumController.create);
routes.get('/album', AlbumController.list);
routes.delete('/album', AlbumController.delete);


//AVALIACAO
routes.post('/avaliacao', AvaliacaoController.create);
routes.get('/avaliacao', AvaliacaoController.list);
routes.get('/avaliacao/:id_music', AvaliacaoController.list);
routes.delete('/avaliacao', AvaliacaoController.delete);


//PLAYLIST
routes.post('/playlist', PlaylistController.create);
routes.get('/playlist', PlaylistController.list);
routes.delete('/playlist', PlaylistController.delete);
routes.post('/playlist/add-song', PlaylistController.addmusic);
routes.delete('/playlist/remove-song', PlaylistController.deletemusic);


routes.get('/recomendation/:id_user', RecomendationController.recomendation);


module.exports = routes;