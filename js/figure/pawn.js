class Pawn extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9817;" : "&#9823;"
   }
   // from,to: object of class field 
   move(from, to) {
      if (this.color == "white") {
         return this.moveAsWhite(from, to);
      }
      else if (this.color == "black") {
         return this.moveAsBlack(from, to)
      }
   }

   moveAsWhite(from, to) {
      if (to.position.x >= from.position.x) return false;

      if (to.figure == null) {
         if (this.moveOne(from, to, -1)) return true;
         return this.moveTwo(from, to, 7, -2);
      }
      else return this.attack(from, to, -1);
   }


   moveAsBlack(from, to) {
      if (to.position.x <= from.position.x) return false;

      if (to.figure == null) {
         if (this.moveOne(from, to, 1)) return true;
         return this.moveTwo(from, to, 2, 2);
      }
      else return this.attack(from, to, 1);
   }

   // step is +-1
   moveOne(from, to, step) {
      if (from.position.x + step == to.position.x) {
         if (from.position.y == to.position.y) {
            return true;
         }
      }
   }

   moveTwo(from, to, start, step) {
      if (from.position.x != start) return false;
      if (from.position.y != to.position.y) return false;
      if (from.position.x + step != to.position.x) return false; // check row
      return this.simpleColider(from.position, to.position);
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
}