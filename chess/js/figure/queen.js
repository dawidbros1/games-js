class Queen extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9813;" : "&#9819;"
   }
   // from,to: object of class field 

   canMove(from, to) {
      if (this.checkTarget(to) == false) return false;
      if (this.simpleColider(from.position, to.position)) return true
      return this.obliqueColider(from.position, to.position)
   }
}