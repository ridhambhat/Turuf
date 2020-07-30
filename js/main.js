//This will handle the main game
//Other components in different files

//Constants
var mainh, mainw;
var mainCardWidth = 50;
var mainCardHeight = 19 / 14  * mainCardWidth;
console.log(" mcw => "+mainCardWidth+" mch => "+mainCardHeight);
var mainScale = 0;
var mainLoadingImg;
var mainDeck;
var mainTimer;
var username, roomname, partner, roomcreator, isMaker;
var ourGamesWin = 0;
var ourGamesLose = 0;



//CreateJs
var mainCanvas, mainStage, mainQueue;

//SocketIO

//console.log("username = "+username+"  --  room = "+room);
var socket = io('https://turuf-server-example-3.herokuapp.com/');

function init(){
    preload();    
}

function preload(){

    username = localStorage.getItem("username");
    roomname = localStorage.getItem("roomname");
    // username = "rid";
    // roomname = "rid1235";
    // var url = new URL(window.location.href);
    // username = url.searchParams.get("username");
    // roomname = url.searchParams.get("roomname");
    partner = "";
    roomcreator = "";
    for(var i = 0 ; i < roomname.length-5; i++){
        roomcreator = roomcreator + roomname.charAt(i);
    }
    if(roomcreator === username){
        isMaker = true;
        // partner = url.searchParams.get("partner");
        partner = localStorage.getItem("partner");
    }

    this.mainLoadingImg = document.getElementById('loading');
    mainQueue = new createjs.LoadQueue();
    mainQueue.addEventListener("complete", setupCanvas);
    mainQueue.loadManifest([
        {id: "c1", src: "img/c1.png"},
        {id: "c2", src: "img/c2.png"},
        {id: "c3", src: "img/c3.png"},
        {id: "c4", src: "img/c4.png"},
        {id: "c5", src: "img/c5.png"},
        {id: "c6", src: "img/c6.png"},
        {id: "c7", src: "img/c7.png"},
        {id: "c8", src: "img/c8.png"},
        {id: "c9", src: "img/c9.png"},
        {id: "c10", src: "img/c10.png"},
        {id: "c11", src: "img/c11.png"},
        {id: "c12", src: "img/c12.png"},
        {id: "c13", src: "img/c13.png"},
        {id: "c14", src: "img/c14.png"},
        {id: "c15", src: "img/c15.png"},
        {id: "c16", src: "img/c16.png"},
        {id: "c17", src: "img/c17.png"},
        {id: "c18", src: "img/c18.png"},
        {id: "c19", src: "img/c19.png"},
        {id: "c20", src: "img/c20.png"},
        {id: "c21", src: "img/c21.png"},
        {id: "c22", src: "img/c22.png"},
        {id: "c23", src: "img/c23.png"},
        {id: "c24", src: "img/c24.png"},
        {id: "c25", src: "img/c25.png"},
        {id: "c26", src: "img/c26.png"},
        {id: "c27", src: "img/c27.png"},
        {id: "c28", src: "img/c28.png"},
        {id: "c29", src: "img/c29.png"},
        {id: "c30", src: "img/c30.png"},
        {id: "c31", src: "img/c31.png"},
        {id: "c32", src: "img/c32.png"},
        {id: "c33", src: "img/c33.png"},
        {id: "c34", src: "img/c34.png"},
        {id: "c35", src: "img/c35.png"},
        {id: "c36", src: "img/c36.png"},
        {id: "c37", src: "img/c37.png"},
        {id: "c38", src: "img/c38.png"},
        {id: "c39", src: "img/c39.png"},
        {id: "c40", src: "img/c40.png"},
        {id: "c41", src: "img/c41.png"},
        {id: "c42", src: "img/c42.png"},
        {id: "c43", src: "img/c43.png"},
        {id: "c44", src: "img/c44.png"},
        {id: "c45", src: "img/c45.png"},
        {id: "c46", src: "img/c46.png"},
        {id: "c47", src: "img/c47.png"},
        {id: "c48", src: "img/c48.png"},
        {id: "c49", src: "img/c49.png"},
        {id: "c50", src: "img/c50.png"},
        {id: "c51", src: "img/c51.png"},
        {id: "c52", src: "img/c52.png"},
        {id: "card_back_horizontal", src: "img/card_back_horizontal.png"},
        {id: "card_back_vertical", src: "img/card_back_vertical.png"},
        {id: "suit_spades", src: "img/spades.png"},
        {id: "suit_hearts", src: "img/hearts.png"},
        {id: "suit_clubs", src: "img/clubs.png"},
        {id: "suit_diamonds", src: "img/diamonds.png"}
    ]);
}

function setupCanvas(){
    mainCanvas = document.getElementById("canvas");
    mainStage = new createjs.Stage(mainCanvas);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on('tick', tick);
    console.log("mainCanvas => "+mainCanvas.width+"  "+mainCanvas.height);
    this.mainh = mainCanvas.height;
    this.mainw = mainCanvas.width;
    this.mainScale = this.mainh/800;
    setup();
}

function setup(){

    var t="";
    for(var i = 1; i<=52; i++)
    t = t + i.toString() + " ";
    var namearr = ["a","b","c","d"];
    this.mainDeck = new Deck(t, 0, namearr);

    this.addSocket();
    console.log(globalThis.username +" ---- "+globalThis.roomcreator)
    if(globalThis.username === globalThis.roomcreator)
    this.waitForUsersToConnect();
    
}

function addSocket(){
    
    globalThis.socket.emit('joinRoom', globalThis.username, globalThis.roomname);
    console.log("socket start");

    globalThis.socket.on('incomingUsersConnectedInfo', function(inJson){
        console.log(inJson);
        var jsonObj = JSON.parse(inJson);
        var num = jsonObj.playerCount;
        num = parseInt(num);
        if(num >= 4){
            clearInterval(globalThis.mainTimer);
            globalThis.makeGameAndSendToAll(inJson);
        }
    });

    globalThis.socket.on('newMove', function(msg){
        //$('#messages').append($('<li>').text(msg));
        globalThis.mainDeck.playCard(msg);

    });

    globalThis.socket.on('incomingNewGameInfo', function(info){

        console.log("new game json => "+info);
        var jsonObj = JSON.parse(info);
        var playerarr = [];
        movesMade = 0;
        playerarr.push(jsonObj.player0);
        playerarr.push(jsonObj.player1);
        playerarr.push(jsonObj.player2);
        playerarr.push(jsonObj.player3);
        var cardOrder = jsonObj.cardstr;
        var pos = 0;


        for(var i = 0; i < 4; i ++){
            if(playerarr[i] === globalThis.username)
            pos = i;
        }

        globalThis.mainDeck.removeDeckCards();

        globalThis.mainDeck = new Deck(cardOrder, pos, playerarr);
        globalThis.mainLoadingImg.style.visibility = 'hidden';

    });

// messageform.addEventListener('submit', e=> {
//     console.log("In Submit");
//     e.preventDefault();
//     const message = messageInput.value;
//     socket.emit('moveMade', message);
//     messageInput.value = '';
// });
}

function makeGameAndSendToAll(inJson){

    var newGameJson = globalThis.createNewGame(inJson, globalThis.username, globalThis.partner)
    globalThis.socket.emit('newGameInfo', newGameJson);
    //MakeGameConfig
    //SendGameConfifToAll

}



function waitForUsersToConnect(){
    //Only Perform This Function If You are the Maker of the Room
    globalThis.mainTimer = setInterval(this.getUsersConnectedInfo, 1000);
}

function getUsersConnectedInfo(){
    globalThis.socket.emit('getUserConnectedInfo');
}


function createNewGame(inPlayersInfoJson, inUsername, inPartner){

    const obj = JSON.parse(inPlayersInfoJson);
    var cardArr = [];
    var tempPlayerArr = [];
    var playerArray = [];
    playerArray.push(inUsername);
    tempPlayerArr = [ obj.player_0, obj.player_1, obj.player_2, obj.player_3];
    for(var i = 1; i<=52; i++){
        cardArr.push(i);
    }
    cardArr = this.shuffle(cardArr);
    cardArr = this.shuffle(cardArr);

    var addPartner = true;

    console.log("username => "+inUsername+" Partner => "+inPartner);
    for(var i = 0; i<tempPlayerArr.length; i++){
        console.log("user at i="+i+" => "+tempPlayerArr[i]);
        if(tempPlayerArr[i]!=inUsername && tempPlayerArr[i]!=inPartner){
            //console.log("coming to add => "+tempPlayerArr[i]+" pos => "+i);
            playerArray.push(tempPlayerArr[i]);
            if(addPartner){
                addPartner = false;
                playerArray.push(inPartner);
            }
        }
        //console.log("Array at pos i = "+i+" => "+playerArray);
    }

    var numberShuffle = Math.floor(Math.random() * Math.floor(playerArray.length));

    for(var i = 0; i <= numberShuffle; i++){

        var te = playerArray[0];
        for(var j = 0; j < playerArray.length-1; j++){
            playerArray[j] = playerArray[j+1];
        }
        playerArray[playerArray.length-1] = te;

    }


    var cardStr = "";
    for(var i = 0; i<52 ; i++){
        cardStr = cardStr + cardArr[i].toString() + " ";
    }
    cardStr = cardStr.trim();

    var returnJson = "{ \"player0\" : \""+playerArray[0]+"\" ," + "\"player1\" : \""+playerArray[1]+"\" , " + "\"player2\" : \""+playerArray[2]+"\" ,"  + "\"player3\" : \""+playerArray[3]+"\" , " + " \"cardstr\" : \""+cardStr+"\" }";

    return returnJson;

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}


function tick(){
    mainStage.update();
}