class Bishop extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9815;" : "&#9821;"
   }
   // from,to: object of class field 
   canMove(from, to) {
      if (this.checkTarget(to) == false) return false;
      return this.obliqueColider(from.position, to.position);
   }
}