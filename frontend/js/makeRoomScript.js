var players_div_MR;
var roomNameTitle_MR;
// var rb1_MR, rb2_MR, rb3_MR, rb4_MR;
// var n1_MR, n2_MR, n3_MR, n4_MR;
var submitButton_MR;
var username_MR;
var roomname_MR;
var partner_MR="";
var fourPlayersIn_MR = false;
var isOnMakeRoomScreen = false;

makeRoomInit = function(e){
    isOnMakeRoomScreen = true;
    var zr;
    var ih = window.innerHeight;
    var iw = window.innerWidth;
    if(ih>iw){
        zr = 0.7*iw/500;
    }
    else{
        zr = 0.7*ih/440;
    }
    // document.body.style['--zoom'] = `${zr}`;
    this.blur();
    this.players_div_MR = document.getElementById('divForPlayersMR');
    this.roomNameTitle_MR = document.getElementById('yourRoomTitleMR');
    this.username_MR = USERNAME;
    this.roomname_MR = ROOMNAME;

    // this.n1_MR = document.getElementById('name1');
    // this.n2_MR = document.getElementById('name2');
    // this.n3_MR = document.getElementById('name3');
    // this.n4_MR = document.getElementById('name4');

    this.submitButton_MR = document.getElementById('onlyButton');
    
    console.log("username = "+username_MR+"  --  room = "+roomname_MR);
    this.roomNameTitle_MR.innerHTML = "Your Room Name - "+roomname_MR;

    SOCKET = io(SOCKETLINK);

    SOCKET.emit('joinRoom', username_MR, roomname_MR);

    SOCKET.on('playersSet', function(){
        if(globalThis.isOnMakeRoomScreen){
            PARTNER = globalThis.partner_MR;
            globalThis.isOnMakeRoomScreen = false;
            //Go To Game
            console.log("FROM MAKE ROOM");
            console.log("PARTNER => "+PARTNER);
            globalThis.showGameScreen();
        }
    });

    SOCKET.on('Room Full', function(){
        if(globalThis.isOnMakeRoomScreen)
        globalThis.roomNameTitle_MR.innerHTML = "Your Room Name - "+roomname_MR+" is Full";
    });

    SOCKET.on('onNewMember', function(json){
        if(globalThis.isOnMakeRoomScreen){
            console.log("json => "+json);
            const obj = JSON.parse(json);
            var number_of_players = parseInt(obj.playerCount);
            globalThis.players_div_MR.innerHTML = "";


            if(number_of_players >= 4){
                globalThis.fourPlayersIn_MR = true;
                globalThis.submitButton_MR.innerHTML = "Select A Partner And Start Game";
                addPlayerToDivWithChoice(obj.player_0, "1");
                addPlayerToDivWithChoice(obj.player_1, "2");
                addPlayerToDivWithChoice(obj.player_2, "3");
                addPlayerToDivWithChoice(obj.player_3, "4");
                
                document.getElementById('radio1').addEventListener('click', function(){
                    console.log('radio clicked');
                    globalThis.partner_MR = document.getElementById('name1').innerHTML;
                });
                document.getElementById('radio2').addEventListener('click', function(){
                    console.log('radio clicked');
                    globalThis.partner_MR = document.getElementById('name2').innerHTML;
                });
                document.getElementById('radio3').addEventListener('click', function(){
                    console.log('radio clicked');
                    globalThis.partner_MR = document.getElementById('name3').innerHTML;
                });
                document.getElementById('radio4').addEventListener('click', function(){
                    console.log('radio clicked');
                    globalThis.partner_MR = document.getElementById('name4').innerHTML;
                });

            }
            else{
                globalThis.fourPlayersIn = false;
                globalThis.submitButton_MR.innerHTML = "Waiting For All Players To Join";

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
        }
    });

    this.submitButton_MR.addEventListener('click', function(){

        console.log("button clicked");

        if(globalThis.fourPlayersIn_MR){

            console.log('4 players in');
            console.log('partner => '+globalThis.partner_MR);
            if(globalThis.partner_MR != ""){
                PARTNER = globalThis.partner_MR;
                SOCKET.emit('playersSet');
            }
            else{
                alert('Please Select A Partner To Continue');
            }
        }

    });

}

addPlayerToDivWithoutChoice = function(name){
    var temp = "<h3>"+name+"</h3>";
    globalThis.players_div_MR.innerHTML = players_div_MR.innerHTML + temp;
}


addPlayerToDivWithChoice = function(name, pos){
    var temp = "";
    if(name === globalThis.username_MR)
        temp = "<h6 id = \"name"+pos+"\">"+name+"</h6> <input class=\"radioForMakeRoom\" type=\"radio\" id=\"radio"+pos+"\" name=\"partner\" style=\"visibility : hidden;\"> <br style=\"clear:both;\"/>";
    else
        temp = "<h6 id = \"name"+pos+"\">"+name+"</h6> <input class=\"radioForMakeRoom\" type=\"radio\" id=\"radio"+pos+"\" name=\"partner\"> <br style=\"clear:both;\"/>";
    globalThis.players_div_MR.innerHTML = players_div_MR.innerHTML + temp;
}






                               
                            
    