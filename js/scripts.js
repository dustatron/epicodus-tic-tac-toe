var ui = new UI();
var controller = new Controller(ui);

function UI() {
  //public
  this.user1 = $("#player-1"); //input
  this.player1Name = $("#player1Name");//title copy

  this.player2Name = $("#player2Name");//title copy
  this.user2 = $("#player-2"); //imnput

  this.theBoard =  $(".game-board");
  this.hidden = $(".hideDiv");
  this.winTitle = $('#win-title');
  this.player1Score = $("#playerScoreX");
  this.player2Score = $("#playerScoreO");
  this.startButtonText = $("#startButton");

  this.hidden.hide();
  
  var that = this;
  //private
  // ------------- Start Button click --------------- \\
  $("button#startButton").click(function () {
    showPlayerNames()

    that.hidden.slideDown("slow");
    controller.consoleLog();
    controller.clearBoard();
    controller.state = true;
    that.winTitle.html("");
    ui.startButtonText.html("Restart");
  });

 // ------------- Board Clicks --------------- \\
 this.theBoard.on("click", ".square", function() {
   if(controller.state){
     if($(this).html() === "") {
       $(this).html(controller.currentPlayer());
       controller.writeToBoard(this.id);
       controller.checkBoard();
       // console.log(this.id);
     }
   }
  });


  //view functions
  var showPlayerNames = function(){

    that.player1Name.html(that.user1.val());
    that.user1.html();
    that.user1.hide();

    that.player2Name.html(that.user2.val());
    that.user2.html();
    that.user2.hide();

  }
}

UI.prototype.createController = function(controller) {
  this.controller = controller;
}

function Controller(ui) {
  
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
  this.state = game.state;

  this.consoleLog = function() {
    console.log("in method")
    console.log(ui.user1.val(), ui.user2.val());
  }

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

  this.checkBoard = function() {
    if(game.turn >= 5 && game.turn <= 8) {
      var winner = checkForWinner();
      if(winner) {
        this.state = false;
        if(winner === "X") {
          game.playerX.score++;
          ui.player1Score.html(game.playerX.score);
          
        } else if(winner === "O") {
          game.playerO.score++;
          ui.player2Score.html(game.playerO.score);
        }
        ui.winTitle.html('The winner is ' + winner +'!!!');
      } 
    } else if (game.turn >= 9){
      if(winner) {
        this.state = false;
        ui.winTitle.html('The winner is ' + winner +'!!!');
        if(winner === "X") {
          game.playerX.score++;
          ui.player1Score.html(game.playerX.score);
        } else if(winner === "O") {
          ui.player2Score.html(game.playerO.score);
          game.playerO.score++;
        }
      } else {
        ui.winTitle.html('Its a tie!!!');
      }
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

  //returns icon of winner or false if no winner
  var checkForWinner = function() {
    if(game.board[0][0] === game.board[1][1] && game.board[1][1] === game.board[2][2]){
      return game.board[0][0]; 
    } else if (game.board[0][2] === game.board[1][1] && game.board[1][1] === game.board[2][0]) {
      return game.board[0][2]; 
    }

    for (let i = 0; i < game.board.length; i++) {
      if(game.board[i][0] === game.board[i][1] && game.board[i][1] === game.board[i][2] && game.board[i][0] !== "") {
        return game.board[i][0];
      } else if(game.board[0][i] === game.board[1][i] && game.board[1][i] === game.board[2][i] && game.board[0][i] !== "") {
        return game.board[0][i];
      }
    }
    return false;
  }

  this.clearBoard = function () {
    game.board.forEach(function (row) {
      row[0] = "";
      row[1] = "";
      row[2] = "";
    });
    ui.theBoard.contents().empty()
    game.turn = 0;
    
    return "cleared board"
  }
}
