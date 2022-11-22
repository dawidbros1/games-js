class Pawn extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9817;" : "&#9823;"
   }
   // from,to: object of class field 
   canMove(from, to, help) {
      if (this.color == "white") {
         return this.moveAsWhite(from, to, help);
      }
      else if (this.color == "black") {
         return this.moveAsBlack(from, to, help)
      }
   }

   moveAsWhite(from, to, help) {
      if (to.position.x >= from.position.x) return false;

      if (to.figure == null) {
         if (this.moveOne(from, to, -1)) return true;
         else if (this.moveTwo(from, to, 7, -2, help)) return true
         else return this.enPassant(from, to, -1, help);
      }
      else return this.attack(from, to, -1);
   }


   moveAsBlack(from, to, help) {
      if (to.position.x <= from.position.x) return false;

      if (to.figure == null) {
         if (this.moveOne(from, to, 1)) return true;
         else if (this.moveTwo(from, to, 2, 2, help)) return true;
         else return this.enPassant(from, to, 1, help);
      }
      else return (this.attack(from, to, 1));
   }

   // step is +-1
   moveOne(from, to, step) {
      if (from.position.x + step == to.position.x) {
         if (from.position.y == to.position.y) {
            return true;
         }
      }
   }

   moveTwo(from, to, start, step, help) {
      if (from.position.x != start) return false;
      if (from.position.y != to.position.y) return false;
      if (from.position.x + step != to.position.x) return false; // check row

      if (this.simpleColider(from.position, to.position)) {
         if (help == false) { Board.enPassant = from; Board.clearEnPassant = false }
         return true;
      }
      else return false
   }

   attack(from, to, step) {
      if (from.figure.color == to.figure.color) return false;

      if (from.position.x + step == to.position.x) {
         if (from.position.y < to.position.y) {
            if (from.position.y + 1 == to.position.y) {
               return true;
            }
         }

         if (from.position.y > to.position.y) {
            if (from.position.y - 1 == to.position.y) {
               return true;
            }
         }
      }

      return false;
   }

   enPassant(from, to, step, help) {
      if (Board.enPassant == null) return false;

      var enPassant = Board.enPassant;

      if (from.position.x != enPassant.position.x) return false;
      if (Math.abs(from.position.y - enPassant.position.y) == 1) {
         var x = enPassant.position.x + step;
         var y = enPassant.position.y;

         if (to.position.is(x, y)) {
            if (help == false) Board.enPassant.clearFigure();
            return true;
         }
      }

      return false;
   }
}