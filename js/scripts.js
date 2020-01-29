var ui = new UI();
var controller = new Controller(ui);

//////////////////////////////////////////////////////////
// --------------- THE VIEW A.K.A Front End ------------ \\
function UI() {
  //public
  this.user1 = $("#player-1"); //input
  this.player1Name = $("#player1Name");//title copy

  this.player2Name = $("#player2Name");//title copy
  this.user2 = $("#player-2"); //imnput

  this.theBoard = $(".game-board");
  this.hidden = $(".hideDiv");
  this.winTitle = $('#win-title');
  this.player1Score = $("#playerScoreX");
  this.player2Score = $("#playerScoreO");
  this.startButtonText = $("#startButton");

  this.hidden.hide();


  this.writeOutComputerMove = function(id){
    $('#'+id).html('O');
  } 

  //private
  var that = this;
  var computerBtn = $('#playAI');

  // ------------- Start Button click --------------- \\
  $("button#startButton").click(function () {
    showPlayerNames()

    that.hidden.slideDown("slow");
    controller.consoleLog();
    controller.clearBoard();
    controller.state = true;
    that.winTitle.html("");
    ui.startButtonText.html("Restart");
    computerBtn.hide();
  });

  // ------------- Board Clicks --------------- \\
  this.theBoard.on("click", ".square", function () {
    if (controller.state) {
      if ($(this).html() === "") {
        $(this).html(controller.currentPlayer());
        controller.writeToBoard(this.id);
        controller.checkBoard();
        // console.log(this.id);
      }
    }
  });

  computerBtn.click(function (event) {
    bootUpComputer();
  });


  //view functions
  var showPlayerNames = function () {

    that.player1Name.html(that.user1.val());
    that.user1.html();
    that.user1.hide();

    that.player2Name.html(that.user2.val());
    that.user2.html();
    that.user2.hide();
  }

  var bootUpComputer = function () {
    
    console.log(computerBtn.html() );
    if(computerBtn.html() === 'Play AI'){
      that.user2.val("Master Data")
      that.user2.attr('readonly', 'readonly');
      computerBtn.html('Play Human');
      computerBtn.removeClass('btn-danger');
      computerBtn.addClass('btn-success');
      controller.AI = true;
    } else if (computerBtn.html() === 'Play Human') {
      controller.AI = false;
      that.user2.val("")
      that.user2.removeAttr('readonly');
      computerBtn.html('Play AI');
      computerBtn.removeClass('btn-success');
      computerBtn.addClass('btn-danger');
    }
    
  }
} // end View

///////////////////////////////////////////////////////////////////
// ------------------ CONTROLLER, A.K.A Business time --------- \\
function Controller(ui) {

  //private
  var icon;

  var game = {
    board: [
      ["", "", ""],
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

  this.consoleLog = function () {
    console.log("in method")
    console.log(ui.user1.val(), ui.user2.val());
  }

  //public
  this.AI = false;

  this.currentPlayer = function () {
    game.turn++;
    if (game.turn % 2 === 0) {
      icon = "O"

      return "O";
    } else {
      icon = "X"
      if(this.AI){
        // console.log("this is the computer " + this.AI);
       computerTurn()
        game.turn++;

      }
      return "X";
    }
  }

  this.checkBoard = function () {
    if (game.turn >= 5 && game.turn <= 8) {
      var winner = checkForWinner();
      if (winner) {
        this.state = false;
        if (winner === "X") {
          game.playerX.score++;
          ui.player1Score.html(game.playerX.score);

        } else if (winner === "O") {
          game.playerO.score++;
          ui.player2Score.html(game.playerO.score);
        }
        ui.winTitle.html('The winner is ' + winner + '!!!');
      }
    } else if (game.turn >= 9) {
      if (winner) {
        this.state = false;
        ui.winTitle.html('The winner is ' + winner + '!!!');
        if (winner === "X") {
          game.playerX.score++;
          ui.player1Score.html(game.playerX.score);
        } else if (winner === "O") {
          ui.player2Score.html(game.playerO.score);
          game.playerO.score++;
        }
      } else {
        ui.winTitle.html('Its a tie!!!');
      }
    }
  }

  this.writeToBoard = function (move) {
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
  var checkForWinner = function () {
    if (game.board[0][0] === game.board[1][1] && game.board[1][1] === game.board[2][2]) {
      return game.board[0][0];
    } else if (game.board[0][2] === game.board[1][1] && game.board[1][1] === game.board[2][0]) {
      return game.board[0][2];
    }

    for (let i = 0; i < game.board.length; i++) {
      if (game.board[i][0] === game.board[i][1] && game.board[i][1] === game.board[i][2] && game.board[i][0] !== "") {
        return game.board[i][0];
      } else if (game.board[0][i] === game.board[1][i] && game.board[1][i] === game.board[2][i] && game.board[0][i] !== "") {
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

  var domBoard = [
    ["r1c1", "r1c2", "r1c3"],
    ["r2c1", "r2c2", "r2c3"],
    ["r3c1", "r3c2", "r3c3"]
  ];

  var computerTurn = function() {
    //random number get postion.
    //write this postion mr.ui
    var move = true;
    var place;
    
    while (move) {
      var randomCol = Math.floor(Math.random()*3);
      var randomRow = Math.floor(Math.random()*3);
      if(game.board[randomRow][randomCol] === ""){
        console.log(randomRow, randomCol, game.board[randomRow][randomCol]);
        game.board[randomRow][randomCol] = "O";
        move = false;
        place = [randomRow,randomCol]
        
      }
  
    }

    ui.writeOutComputerMove(domBoard[place[0]][place[1]]);
  
  }
} // End Controller
