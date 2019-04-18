var inputField = document.querySelector("#message");
var sendButton = document.querySelector("#send");
var messagesDiv = document.querySelector("#messages");

var addMessage = function (message) {
  var messageDiv = document.createElement("div");
  messageDiv.innerHTML = message;
  messagesDiv.appendChild(messageDiv);
};

sendButton.onclick = function () {
  var message = inputField.value;

  var data = {
    message: message
  };

  socket.send(JSON.stringify(data));
};

///////////////////

var redButton = document.querySelector("#setRed");
var blueButton = document.querySelector("#setBlue");
var gameboard = document.querySelector("#gameboard");
var dots = document.getElementById('dot');

//var addPiece

//////////////////

var socket = new WebSocket('ws://localhost:8080');

socket.onmessage = function (event) {
  var received = event.data;
  var data = JSON.parse(received);
  console.log("data received from server", data);
  addMessage(data.message);
};

const red = "#ff0000";
const blue = "#0000ff";

const app = new Vue({
  el: '#app',
  data: {
    board: new Array(6*7).fill(0),
    // currentColor: RED

  },
  methods:{
    checkPlayer: function(value){
      //red player
      if(value == 1){
        this.currentColor = RED;
      } else {
        this.currentColor = BLUE;
      }
    },
    placePiece: function(){
      dots.style.background = '#ff0000';
    }

  }
});