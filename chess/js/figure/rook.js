class Rock extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9814;" : "&#9820;"
   }
   // from,to: object of class field 
   canMove(from, to) {
      if (this.checkTarget(to) == false) return false;
      return (this.simpleColider(from.position, to.position))
   }
}