class Knight extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9816;" : "&#9822;"
   }
   // from,to: object of class field 
   move(from, to) {
      if (this.checkTarget(to) == false) return false;

      var status = false;
      var vectors = [
         [2, 1], [2, -1], [-2, 1], [-2, -1], // x = +-2 | y = +-1
         [1, 2], [1, -2], [-1, 2], [-1, -2] // x = +-1 | y = +-2
      ];

      vectors.forEach(vector => {
         let field = Figure.board.findField(from.position.x + vector[0], from.position.y + vector[1]);
         if (field != null && field == to) status = true;
      });

      return status;
   }
}