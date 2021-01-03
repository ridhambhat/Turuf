var players_div_JR;
var roomNameTitle_JR;
var isOnJoinRoomScreen = false;

joinRoomInit = function(e){
    var zr;
    var ih = window.innerHeight;
    var iw = window.innerWidth;
    isOnJoinRoomScreen = true;
    if(ih>iw){
        zr = 0.7*iw/500;
    }
    else{
        zr = 0.7*ih/440;
    }
    // document.body.style['--zoom'] = `${zr}`;
    this.blur();
    this.players_div_JR = document.getElementById('divForPlayersJR');
    this.roomNameTitle_JR = document.getElementById('yourRoomTitleJR');
    var username_JR = USERNAME;
    var roomname_JR = ROOMNAME;
    SOCKET = io(SOCKETLINK);


    console.log("username = "+username_JR+"  --  room = "+roomname_JR);
    this.roomNameTitle_JR.innerHTML = "Your Room Name - "+roomname_JR;
    addPlayerToDiv(username_JR);

    SOCKET.emit('joinRoom', username_JR, roomname_JR);

    SOCKET.on('playersSet', function(){
        // window.document.location = '/game.html';
        if(globalThis.isOnJoinRoomScreen){
            console.log("FROM JOIN ROOM");
            console.log("PARTNER => "+PARTNER);
            globalThis.isOnJoinRoomScreen = false;
            globalThis.showGameScreen();
        }
        // window.document.location = '/game.html?username='+username+"&roomname="+roomname;
    });

    SOCKET.on('Room Full', function(){
        if(globalThis.isOnJoinRoomScreen)
        globalThis.roomNameTitle_JR.innerHTML = "Your Room Name - "+roomname_JR+" is Full";
    });

    SOCKET.on('onNewMember', function(json){
        if(globalThis.isOnJoinRoomScreen)
        {
            console.log("json => "+json);
            const obj = JSON.parse(json);
            var number_of_players = parseInt(obj.playerCount);
            globalThis.players_div_JR.innerHTML = "";
            if(number_of_players > 0){

                if(number_of_players >= 1){
                    var p0 = obj.player_0;
                    addPlayerToDiv(p0);
                }
                if(number_of_players >= 2){
                    var p1 = obj.player_1;
                    addPlayerToDiv(p1);
                }
                if(number_of_players >= 3){
                    var p2 = obj.player_2;
                    addPlayerToDiv(p2);
                }
                if(number_of_players >= 4){
                    var p3 = obj.player_3;
                    addPlayerToDiv(p3);
                }
            }
        }
    });


}

addPlayerToDiv = function(name){
    //node.innerHTML = "<p>Room Id</p><input id=\"roomNameValue\" type=\"text\" name=\"roomName\" placeholder=\"Enter Room Id\" autocomplete=\"off\"required>";
    globalThis.players_div_JR.innerHTML = players_div_JR.innerHTML + "<h3>"+name+"</h3>";
}




                               
                            
    