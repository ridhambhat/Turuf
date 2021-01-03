var app = require('express')();
var http = require('http').createServer();
var io = require('socket.io')(http);

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getRoomUsersNum,
    setUserReady
} = require('./users');

io.on('connection', (socket) => {
    console.log('New User Connected');
    socket.on('disconnect', () => {
        console.log('A User Disconnected');
    });

    //socket.emit('function_name',"message");  for sending message to client

    socket.on('joinRoom', function(username, room) {

        var num = getRoomUsersNum(room);
        console.log("number of people in room - "+room+" => "+num);
        if(num < 4){
            const user = userJoin(socket.id, username, room);
            socket.join(user.room);
            console.log('User -> '+username+' has joined room => '+room);

            var temparr = getRoomUsers(user.room);
            var jsonToSend = convertUsersArrayToJSON(temparr);

            io.to(user.room).emit('onNewMember', jsonToSend);
        }

        else{
            socket.emit('Room Full');
        }
        
        // socket.broadcast
        //     .to(user.room)
        //     .emit(
        //         'new_player_in_room',
        // );

        // io.to(user.room).emit('roomUsers', {
        //     room: user.room,
        //     users: getRoomUsers(user.room)
        //   });
        // });

    });
    

    socket.on('playersSet', function(){
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('playersSet');
    });

    socket.on('setPlayerReady', function(){
        setUserReady(socket.id);
    });

    socket.on('getUserConnectedInfo', function(){

        const user = getCurrentUser(socket.id);
        console.log(getRoomUsers(user.room));
        var temparr = getRoomUsers(user.room);
        var jsonToSend = convertUsersArrayToJSON(temparr);
        socket.emit('incomingUsersConnectedInfo', jsonToSend);
    });

    socket.on('newGameInfo', function(info){
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('incomingNewGameInfo', info);
    })

    socket.on('moveMade', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('newMove', msg);
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
    
        if (user) {
            console.log(getRoomUsers(user.room));
            var temparr = getRoomUsers(user.room);
            var jsonToSend = convertUsersArrayToJSON(temparr);

            io.to(user.room).emit('onNewMember', jsonToSend);
        }
      });


});


http.listen((process.env.PORT || 3000), () =>{
    console.log('listening on port :'+ (process.env.PORT || 3000) +' index.js sample socket');
});


convertUsersArrayToJSON = function(arr){
    var json = "{ \"playerCount\" : \""+ arr.length.toString() + "\" , ";
    var isRoomReady = "true";
    for(var i = 0; i< arr.length ; i++){
        json = json + " \"player_"+i.toString()+"\" : \""+arr[i].username+"\" , ";
        console.log(arr[i].username+ " is ready ? => "+arr[i].isReady);
        if(arr[i].isReady === "false")
        isRoomReady = "false";
    }
    if(arr.length < 4)
    isRoomReady = "false";
    json = json + " \"isRoomReady\" : \"" + isRoomReady + "\" }";
    console.log("RETURNING JSON => " + json);
    return json;
}