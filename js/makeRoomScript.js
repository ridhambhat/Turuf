var players_div;
var roomNameTitle;
var socket;
var username, roomname;
var rb1, rb2, rb3, rb4;
var n1, n2, n3, n4;
var submitButton;
var partner="";
var fourPlayersIn = false;


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
    // var url = new URL(window.location.href);
    // this.username = url.searchParams.get("username");
    // this.roomname = makeUniqueRoomId(username);
    this.username = localStorage.getItem("username");
    this.roomname = makeUniqueRoomId(username);
    localStorage.setItem('roomname', this.roomname);

    this.n1 = document.getElementById('name1');
    this.n2 = document.getElementById('name2');
    this.n3 = document.getElementById('name3');
    this.n4 = document.getElementById('name4');

    this.submitButton = document.getElementById('onlyButton');
    

    console.log("username = "+username+"  --  room = "+roomname);
    this.roomNameTitle.innerHTML = "Your Room Name - "+roomname;

    this.socket = io('https://turuf-server-example-3.herokuapp.com/');

    this.socket.emit('joinRoom', username, roomname);

    this.socket.on('playersSet', function(){
        localStorage.setItem('partner',globalThis.partner);
        window.document.location = '/game.html';
        // window.document.location = '/game.html?username='+globalThis.username+"&roomname="+globalThis.roomname+"&partner="+globalThis.partner;
    });

    this.socket.on('Room Full', function(){
        globalThis.roomNameTitle.innerHTML = "Your Room Name - "+roomname+" is Full";
    });

    this.socket.on('onNewMember', function(json){
        console.log("json => "+json);
        const obj = JSON.parse(json);
        var number_of_players = parseInt(obj.playerCount);
        globalThis.players_div.innerHTML = "";


        if(number_of_players >= 4){
            globalThis.fourPlayersIn = true;
            globalThis.submitButton.innerHTML = "Select A Partner And Start Game";
            addPlayerToDivWithChoice(obj.player_0, "1");
            addPlayerToDivWithChoice(obj.player_1, "2");
            addPlayerToDivWithChoice(obj.player_2, "3");
            addPlayerToDivWithChoice(obj.player_3, "4");
            
            document.getElementById('radio1').addEventListener('click', function(){
                console.log('radio clicked');
                globalThis.partner = document.getElementById('name1').innerHTML;
            });
            document.getElementById('radio2').addEventListener('click', function(){
                console.log('radio clicked');
                globalThis.partner = document.getElementById('name2').innerHTML;
            });
            document.getElementById('radio3').addEventListener('click', function(){
                console.log('radio clicked');
                globalThis.partner = document.getElementById('name3').innerHTML;
            });
            document.getElementById('radio4').addEventListener('click', function(){
                console.log('radio clicked');
                globalThis.partner = document.getElementById('name4').innerHTML;
            });

        }
        else{
            globalThis.fourPlayersIn = false;
            globalThis.submitButton.innerHTML = "Waiting For All Players To Join";

            if(number_of_players >= 1){
                addPlayerToDivWithoutChoice(obj.player_0);
            }
            if(number_of_players >= 2){
                addPlayerToDivWithoutChoice(obj.player_1);
            }
            if(number_of_players >= 3){
                addPlayerToDivWithoutChoice(obj.player_2);
            }

        }

    });

    this.submitButton.addEventListener('click', function(){

        console.log("button clicked");

        if(globalThis.fourPlayersIn){

            console.log('4 players in');
            console.log('partner => '+globalThis.partner);
            if(globalThis.partner != ""){
                localStorage.setItem('partner', globalThis.partner);
                globalThis.socket.emit('playersSet');
            }
            else{
                alert('Please Select A Partner To Continue');
            }
        }

    });

}

addPlayerToDivWithoutChoice = function(name){
    //node.innerHTML = "<p>Room Id</p><input id=\"roomNameValue\" type=\"text\" name=\"roomName\" placeholder=\"Enter Room Id\" autocomplete=\"off\"required>";
    var temp = "<h3>"+name+"</h3>";
    globalThis.players_div.innerHTML = players_div.innerHTML + temp;
}


addPlayerToDivWithChoice = function(name, pos){
    //node.innerHTML = "<p>Room Id</p><input id=\"roomNameValue\" type=\"text\" name=\"roomName\" placeholder=\"Enter Room Id\" autocomplete=\"off\"required>";
    var temp = "";
    if(name === globalThis.username)
        temp = "<h6 id = \"name"+pos+"\">"+name+"</h6> <input class=\"radioForMakeRoom\" type=\"radio\" id=\"radio"+pos+"\" name=\"partner\" style=\"visibility : hidden;\"> <br style=\"clear:both;\"/>";
    else
        temp = "<h6 id = \"name"+pos+"\">"+name+"</h6> <input class=\"radioForMakeRoom\" type=\"radio\" id=\"radio"+pos+"\" name=\"partner\"> <br style=\"clear:both;\"/>";
    globalThis.players_div.innerHTML = players_div.innerHTML + temp;
}

makeUniqueRoomId = function(name){
    for(var i = 0; i<5 ; i++){
        name = name + (Math.floor(Math.random() * Math.floor(10))).toString();
    }
    return name;
}




                               
                            
    