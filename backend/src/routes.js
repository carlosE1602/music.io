const express = require('express');
const routes = express.Router();
const UserController = require ('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const GenresController = require('./controllers/GenresController')
const RecomendationController = require('./controllers/RecomendationController')
const MusicController = require('./controllers/MusicController')
const ArtistController = require('./controllers/ArtistController')
const AlbumController = require('./controllers/AlbumController')


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


routes.get('/recomendation/:id_user', RecomendationController.recomendation);


module.exports = routes;