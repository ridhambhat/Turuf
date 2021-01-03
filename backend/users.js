const users = [];

// Join user to chat
function userJoin(id, username, room) {
  let isReady = "false";
  const user = { id, username, room, isReady};
  users.push(user);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function setUserReady(id){
  const index = users.findIndex(user => user.id === id);
  users[index].isReady = "true";
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

function getRoomUsersNum(room){
  return users.filter(user => user.room === room).length;
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getRoomUsersNum,
  setUserReady
};