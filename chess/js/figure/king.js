class King extends Figure {
   constructor(color) {
      super(color);
      this.shape = this.color == "white" ? "&#9812;" : "&#9818;"
   }

   move(from, to) {
      if (this.checkTarget(to) == false) return false;
      var dx = Math.abs(from.position.x - to.position.x);
      var dy = Math.abs(from.position.y - to.position.y);

      return ((dx + dy == 1) || (dx == 1 && dy == 1));
   }
}