class Bishop extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9815;" : "&#9821;"
   }
   // from,to: object of class field 
   move(from, to) {
      if (this.obliqueColider(from.position, to.position) == false) {
         return false;
      }

      if (to.figure == null) return true;
      return (to.figure.color != this.color);
   }
}