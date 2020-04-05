const express = require('express')
const path = require('path');
const app = express()
var router = express.Router();

// define the home page route
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../front/index.html'))
});
// define the about route
router.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/../front/'+req.originalUrl));
});
app.use(router);

var gameData = {
    score: [12, 14], // ketchulp / mayo
    current_step_index: 0,
    steps: ['Les Nuggets', 'Le Sel ou Poivre', 'Les Menus', 'L\'addition'],
    teams: ['master', 'ketchup', 'mayo'],
    master_player: null,
    ketchup_players: [
        // {
        //     name: 'maxime'
        // }
    ],
    mayo_players: [
        // {
        //     name: 'bite'
        // }
    ]
}
// var http = require('http');
//
// httpServer = http.createServer(function(req,res){
// 	console.log('user connected');
// });
// httpServer.listen(1337);
var server = app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
var io = require('socket.io').listen(server);
var users = [];
var user_model = {
    name: '',
    team: '',
    index: 0
}
var user = null;

io.sockets.on('connection',function(socket){
	console.log('new connection');
	console.log(socket.id);

    function updateGameData() {
        io.emit('updateGamedata', {gameData: gameData});
        //socket.broadcast.emit('updateGamedata', {gameData: gameData});
    }
	socket.on('login',function(user = null){
        console.log('login : ', user);
        console.log(socket.id);
        user_model.index = users.length;
        let new_user = Object.assign({}, user_model);
        new_user = Object.assign(new_user, user);
		// var testConnected = false;
        // Verify data existance
        if (new_user.name != '' && new_user.team != '') {
            // Vefiry data integrity, feasibility
            // Just 1 master authorized
            if (new_user.team == 'master' && !gameData.master_player) {
                gameData.master_player = new_user;
            }
            // Infinite player in ketchup or mayo teams
            if (new_user.team == 'ketchup') {
                gameData.ketchup_players.push(new_user);
            }
            if (new_user.team == 'mayo') {
                gameData.mayo_players.push(new_user);
            }
        }

		socket.emit('login', {result: true});
        updateGameData();
	});

    	// socket.on('logout', function(user){
    	// 	users.splice(user.index, 1);
        //     updateGameData();
    	// });


    socket.on('nextStep', function(){
        gameData.current_step_index ++;
        updateGameData();
    });
	// socket.on('draw', function(params){
	// 	socket.broadcast.emit('serverDraw',{xa:params.xa, ya:params.ya, xb:params.xb, yb:params.yb});
	// });
	// socket.on('testWord', function(word){
	// 	io.emit('updateUsers', users);
	// 	io.emit('addListWord', word);
	//     socket.emit('testWord', {verify:verify})
	// });
	// socket.on('startRound', startRound(socket));
	// socket.on('updateRound', updateRound(socket));
    // function () {
        //     io.emit('timer', {timer:timerCompt});
        //     io.emit('startRound', game);
        //     io.emit('endGame');
        // }
});
