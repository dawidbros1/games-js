class Rock extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9814;" : "&#9820;"
   }
   // from,to: object of class field 
   move(from, to) {
      if (from.position.x == to.position.x || from.position.y == to.position.y) {
         if (this.simpleColider(from.position, to.position)) {
            if (to.figure == null) return true;
            if (to.figure.color != this.color) return true;
         }
         // return false;
      }

      return false;
   }
}