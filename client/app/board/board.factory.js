var app = angular.module("rocketBoardApp");

app.service('BoardFactory', function(ColorPicker) {
  var that = this;

  this.sprintBoard = {
    "name": "Spring Board",
    "numberOfColumns": 4,
    "columns": [{
      "status": "0 - Backlog",
      "name": "Backlog"
    }, {
      "status": "1 - Ready",
      "name": "Ready"
    }, {
      "status": "2 - Development",
      "name": "Development"
    }, {
      "status": "3 - Quality Assurance",
      "name": "Quality Assurance"
    }]
  }

  return {
    makeBoard: function(repositories) {
      var board = new Board(that.sprintBoard.name, that.sprintBoard.numberOfColumns);

      _.forEach(repositories, function(repository) {
        repository.color = ColorPicker.getNextColor();
        board.repositories.push(repository);
      });

      _.forEach(that.sprintBoard.columns, function(column) {
        board.columns.push(new Column(column.name, column.status));
      });

      board.issues = [];

      console.log(board);

      return board;
    },
  }

});
