class Main {
   constructor() {
      this.board = new Board();
   }

   init() {
      this.board.generate();
      this.board.placeFigures();
      this.board.initOnClickOnFields();

      Figure.board = this.board;
   }
}

var main = new Main();
main.init();