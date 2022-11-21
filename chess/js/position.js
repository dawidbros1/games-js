class Position {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }

   is(x, y) {
      return (x == this.x && y == this.y)
   }

   getVector() {
      return [this.x, this.y];
   }
}