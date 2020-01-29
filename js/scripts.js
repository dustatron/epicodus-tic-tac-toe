var ui = new UI();
var controller = new Controller(ui);

function UI() {
  //public
  this.user1 = $("#player-1");
  this.user2 = $("#player-2");
  this.theBoard =  $(".game-board");

  //private
  $("button#startButton").click(function () {
    controller.consoleLog();
  })
 this.theBoard.on("click", ".square", function() {
    $(this).html(controller.currentPlayer());
    controller.writeToBoard(this.id);
    // console.log(this.id);
  })
}

UI.prototype.createController = function(controller) {
  this.controller = controller;
}

function Controller(ui) {
  //public
  this.currentPlayer = function() {
    game.turn++;
    if(game.turn % 2 === 0) {
      icon = "O"
      return "O";
    } else {
      icon = "X"
      return "X";
    }
  }

  this.writeToBoard = function(move){
    switch (move) {
      case 'r1c1':
        game.board[0][0] = icon;
        break;
      case 'r1c2':
        game.board[0][1] = icon;
        break;
      case 'r1c3':
        game.board[0][2] = icon;
        break;
      case 'r2c1':
        game.board[1][0] = icon;
        break;
      case 'r2c2':
        game.board[1][1] = icon;
        break;
      case 'r2c3':
        game.board[1][2] = icon;
        break;
      case 'r3c1':
        game.board[2][0] = icon;
        break;
      case 'r3c2':
        game.board[2][1] = icon;
        break;
      case 'r3c3':
        game.board[2][2] = icon;
        break;
    }
  }

  this.clearBoard = function () {
    game.board.forEach(function (row) {
      row[0] = "";
      row[1] = "";
      row[2] = "";
    });
    ui.theBoard.contents().empty()
    return "cleared board"
  }
  
  
  
  //private
  var icon;

  var game = {
    board: [
      ["", "" , ""],
      ["", "", ""],
      ["", "", ""]
    ],
    playerX: {
      name: "",
      score: 0,
    },
    playerO: {
      name: "",
      score: 0
    },
    turn: 0,
    state: false,
  }

  this.board = game.board;

  this.consoleLog = function() {
    console.log("in method")
    console.log(ui.user1.val(), ui.user2.val());
  }
}
