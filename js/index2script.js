const joinHtml = "/joinRoom.html";
const makeHtml = "/makeRoom.html";
var nextHtml = makeHtml;
var choice = "make";

// jQuery(document).ready(function($) {
// var form = $('form[name="mainForm"]'),
//     radio = $('input[name="makeOrJoin"]'), 
//     choice = '';
            
//     radio.change(function(e) {
//         choice = this.value;              
//         if (choice === 'Make Room') {
//             form.attr('action', 'make_room.html');
//         } else {
//             form.attr('action', 'join_room.html');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function(){
    init();
})

const init = function(e){

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
    var r1 = document.getElementById('r1');
    var r2 = document.getElementById('r2');
    var b = document.getElementById('submit');
    showMake();
    r1.addEventListener('click', function() {
        if(choice !== "make"){
            showMake();
            choice = "make";
            nextHtml = makeHtml;

            console.log("r1 clicked");
        }
    });
    r2.addEventListener('click', function(){
        if(choice !== "join"){
            showJoin();
            choice = "join";
            nextHtml = joinHtml;
            
            console.log("r2 clicked");
        }
    });
    b.addEventListener('click', function(){

        var userName = document.getElementById('usernameValue').value.trim();
        // ?myparam1=123&myparam2=abc 
        var urlExtra = "?username=";
        var shouldGoNext = true;
        if(!isGoodString(userName)){
            console.log("username isBadString");
            alert('User Name can\'t be empty and is only allowed to have alphabets and spaces');
            shouldGoNext = false;
        }
        urlExtra = urlExtra+userName.replace(' ','+');
        var roomName = "";
        if(nextHtml === joinHtml){
            roomName = document.getElementById('roomNameValue').value.trim();
            if(!isGoodString(roomName)){
                console.log("roomname isBadString");
                alert('Room Name ican\'t be empty and is only allowed to have alphabets and spaces');
                shouldGoNext = false;
            }
            urlExtra = urlExtra+"&roomname="+roomName.replace(' ','+');
        }

        if(shouldGoNext){
            console.log("Going Next");
            localStorage.setItem('username', userName);
            localStorage.setItem('roomname', roomName);
            // nextHtml = nextHtml+urlExtra;
            window.document.location = nextHtml;
        }

    });
}

showMake = function(){
    const node = document.getElementById("spaceForRoomName"); 
    node.textContent = "";
}

showJoin = function(){
    const node = document.getElementById("spaceForRoomName");
    node.innerHTML = "<p>Room Id</p><input id=\"roomNameValue\" type=\"text\" name=\"roomName\" placeholder=\"Enter Room Id\" autocomplete=\"off\"required>";
}

isGoodString = function(str){

    if(str.length<1) return false;

    for(var i = 0; i< str.length; i++){
        var ch = str.charAt(i);
        //var ch = str.substr(i,i+1);
        if(! isGoodChar(ch))
        return false;
    }
    return true;
}

function isGoodChar(c) {
    //return false;
    return ( ( (c>='a') & (c<='z')) || ( (c>='A') & (c<='Z')) || ( (c>='0') & (c<='9' ) ) || (c === " ") );
}