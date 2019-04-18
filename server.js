const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });


var player1socket = null;
var player2socket = null;


var sendDataToPlayer = function(socket, data){
  socket.send(JSON.stringify(data));
}

wss.on('connection', function connection(ws) {
  if(player1socket == null){
    player1socket = ws;
  } else if (player2socket == null){
    player2socket = ws;
    sendDataToPlayer(player2socket,{
      action: "newgame",
      player: 2
    });
    sendDataToPlayer(player1socket, {
      action: "newgame",
      player: 1
    });
  }
  ws.on('message', function incoming(data) {
    var fromClient = JSON.parse(data);
    if (fromClient.action == "updateBoard" && ws == player1socket) {
      sendDataToPlayer(player2socket,{
        action: "playerTurn",
        turn: 2
      });
      sendDataToPlayer(player1socket, {
        action: "playerTurn",
        turn: 2
      });
    } else if (fromClient.action == "updateBoard" && ws == player2socket) {
      sendDataToPlayer(player2socket,{
        action: "playerTurn",
        turn: 1
      });
      sendDataToPlayer(player1socket, {
        action: "playerTurn",
        turn: 1
      });
    }
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
