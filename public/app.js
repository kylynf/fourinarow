const app = new Vue({
  el: '#app',
  data: {
    socket: null,
    board: new Array(6*7).fill(0),
    player: 0,
    turn: 1
  },
  methods:{
    connectSocket: function () {
      this.socket = new WebSocket('ws://localhost:8080');
      // this.socket = new WebSocket('ws://kylynsfourinarow.herokuapp.com/');
      this.socket.onmessage = event => {
        var received = event.data;
        var fromServer = JSON.parse(received);
        console.log("data received from server", fromServer);
        if (fromServer.action == "updateBoard") {
          this.board = fromServer.board;
        } else if (fromServer.action == "newgame"){
          alert("The game is starting");
          this.player = fromServer.player;
        } else if (fromServer.action == "playerTurn"){
          this.turn = fromServer.turn;
        }
      };
    },
    classForPlayer: function (player) {
      if (player == 1) {
        return "player1";
      } else if (player == 2){
        return "player2";
      } else {
        return "noplayer";
      }
    },
    placePiece: function(col){
      if(this.player == this.turn){
        //starting at bottom of grid to fill pieces
        for(let row = 5; row >= 0; row--){
          let i = col + 7 * row;
          if(this.board[i] == 0){
            this.$set(this.board, i, this.player);
            let toServer = {
              action: "updateBoard",
              board: this.board
            };
            this.socket.send(JSON.stringify(toServer));
            return
          }
        }
        alert("This was not a valid move");
      } else {
        alert("it is not your turn");
      }
    }
  },
  created: function(){
    this.connectSocket();
  }
});