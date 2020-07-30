//const messageform = document.getElementById('formMessage');
//const messageInput = document.getElementById('m');
var username = getQueryVariable("username");
var room = getQueryVariable("room");
console.log("username = "+username+"  --  room = "+room);

var socket = io('https://turuf-server-example-3.herokuapp.com/');
socket.emit('joinRoom', username, room);

socket.on('newMove', function(msg){
    $('#messages').append($('<li>').text(msg));
});

// messageform.addEventListener('submit', e=> {
//     console.log("In Submit");
//     e.preventDefault();
//     const message = messageInput.value;
//     socket.emit('moveMade', message);
//     messageInput.value = '';
// });



function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  alert('Query Variable ' + variable + ' not found');
}
                               
                            
    