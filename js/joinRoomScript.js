var players_div;
var roomNameTitle;
var socket;

document.addEventListener('DOMContentLoaded', function(){
    init();
})

init = function(e){
    var zr;
    var ih = window.innerHeight;
    var iw = window.innerWidth;
    if(ih>iw){
        zr = 0.7*iw/500;
    }
    else{
        zr = 0.7*ih/440;
    }
    document.body.style.zoom=(zr);this.blur();
    this.players_div = document.getElementById('divForPlayers');
    this.roomNameTitle = document.getElementById('yourRoomTitle');
    var url = new URL(window.location.href);
    // var username = url.searchParams.get("username");
    // var roomname = url.searchParams.get("roomname");
    var username = localStorage.getItem("username");
    var roomname = localStorage.getItem("roomname");
    console.log("username = "+username+"  --  room = "+roomname);
    this.roomNameTitle.innerHTML = "Your Room Name - "+roomname;
    addPlayerToDiv(username);

    this.socket = io('https://turuf-server-example-3.herokuapp.com/');

    this.socket.emit('joinRoom', username, roomname);

    this.socket.on('playersSet', function(){
        window.document.location = '/game.html';
        // window.document.location = '/game.html?username='+username+"&roomname="+roomname;
    });

    this.socket.on('Room Full', function(){
        globalThis.roomNameTitle.innerHTML = "Your Room Name - "+roomname+" is Full";
    });

    this.socket.on('onNewMember', function(json){
        console.log("json => "+json);
        const obj = JSON.parse(json);
        var number_of_players = parseInt(obj.playerCount);
        globalThis.players_div.innerHTML = "";
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
    });


}

addPlayerToDiv = function(name){
    //node.innerHTML = "<p>Room Id</p><input id=\"roomNameValue\" type=\"text\" name=\"roomName\" placeholder=\"Enter Room Id\" autocomplete=\"off\"required>";
    globalThis.players_div.innerHTML = players_div.innerHTML + "<h3>"+name+"</h3>";
}




                               
                            
    