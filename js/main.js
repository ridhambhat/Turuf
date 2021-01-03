var indexHtml, joinRoomHtml, makeRoomHtml, gameHtml;
var USERNAME = "";
var ROOMNAME = "";
var PARTNER = "";
var SOCKET;
var SOCKETLINK = "https://turuf-server-example-3.herokuapp.com/";

function mainInit(){
    indexHtml = document.getElementById('indexHtml');
    joinRoomHtml = document.getElementById('joinRoomHtml');
    makeRoomHtml = document.getElementById('makeRoomHtml');
    gameHtml = document.getElementById('gameHtml');
}

function showHomeScreen(){
    joinRoomHtml.style.display = "none";
    makeRoomHtml.style.display = "none";
    gameHtml.style.display = "none";
    indexHtml.style.display = "block";
    indexInit();
}

function showJoinRoom(){
    indexHtml.style.display = "none";
    makeRoomHtml.style.display = "none";
    gameHtml.style.display = "none";
    joinRoomHtml.style.display = "block";
    joinRoomInit();
}

function showMakeRoom(){
    indexHtml.style.display = "none";
    joinRoomHtml.style.display = "none";
    gameHtml.style.display = "none";
    makeRoomHtml.style.display = "block";
    makeRoomInit();
}

function showGameScreen(){
    indexHtml.style.display = "none";
    joinRoomHtml.style.display = "none";
    makeRoomHtml.style.display = "none";
    gameHtml.style.display = "block";
    gameStart();
}

document.addEventListener('DOMContentLoaded', function(){
    mainInit();
    gameLoad();
    showHomeScreen();
});
