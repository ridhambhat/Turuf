var shouldGoToMakeRoom = true;

const indexInit = function(){
    // SOCKET = io('https://turuf-server-example-3.herokuapp.com/');
    SOCKET = io(SOCKETLINK);
    // var zr;
    // var ih = window.innerHeight;
    // var iw = window.innerWidth;
    // if(ih>iw){
    //     zr = 0.7*iw/500;
    // }
    // else{
    //     zr = 0.7*ih/440;
    // }
    // document.body.style.zoom=(zr);
    // this.blur;
    // document.body.style.transform = `scale(${zr})`;
    // document.body.style['--zoom'] = `${zr}`;
    this.blur();
    var r1 = document.getElementById('radio1');
    var r2 = document.getElementById('radio2');
    var b = document.getElementById('submit');
    showMake();
    r1.addEventListener('click', function() {
        if(!shouldGoToMakeRoom){
            showMake();
            shouldGoToMakeRoom = true;
            console.log("make room clicked");
        }
    });
    r2.addEventListener('click', function(){
        if(shouldGoToMakeRoom){
            showJoin();
            shouldGoToMakeRoom = false;
            console.log("join room clicked");
        }
    });
    b.addEventListener('click', function(){
        var userName = document.getElementById('usernameValue').value.trim();
        var shouldGoNext = true;
        if(!isGoodString(userName)){
            console.log("username isBadString");
            alert('User Name can\'t be empty and is only allowed to have alphabets and spaces');
            shouldGoNext = false;
        }
        var roomName = makeUniqueRoomId(userName);
        if(!shouldGoToMakeRoom){
            roomName = document.getElementById('roomNameValue').value.trim();
            if(!isGoodString(roomName)){
                console.log("roomname isBadString");
                alert('Room Name ican\'t be empty and is only allowed to have alphabets and spaces');
                shouldGoNext = false;
            }
        }
        if(shouldGoNext){
            console.log("Going Next");
            //GoToNextRoom
            USERNAME = userName;
            ROOMNAME = roomName;
            if(shouldGoToMakeRoom)
            showMakeRoom();
            else
            showJoinRoom();
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

makeUniqueRoomId = function(name){
    for(var i = 0; i<5 ; i++){
        name = name + (Math.floor(Math.random() * Math.floor(10))).toString();
    }
    return name;
}