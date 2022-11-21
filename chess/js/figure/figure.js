class Figure {
   constructor(color) {
      this.color = color;
   }

   static board = null;

   // from | to => field.postion => x,y
   // colide to target but without last field
   simpleColider(from, to) {
      var dx = 0;
      var dy = 0;
      var lx = Math.abs(from.x - to.x);
      var ly = Math.abs(from.y - to.y);
      var distance = Math.max(lx, ly);

      if (lx != 0 && ly != 0) return false;

      if (lx != 0) dx = (from.x - to.x) > 0 ? -1 : 1;
      else dy = (from.y - to.y) > 0 ? -1 : 1;

      return this.colide(from, dx, dy, distance);
   }

   // from | to => field.postion => x,y
   // colide to target but without last field
   obliqueColider(from, to) {
      if (Math.abs(from.x - to.x) != Math.abs(from.y - to.y)) return false

      var distance = Math.abs(from.x - to.x);
      var dx = (from.x - to.x > 0) ? -1 : 1;
      var dy = (from.y - to.y > 0) ? -1 : 1;

      return this.colide(from, dx, dy, distance);
   }

   colide(from, dx, dy, distance) {
      for (var i = 1; i < distance; i++) {
         var x = from.x + i * dx;
         var y = from.y + i * dy;

         if (Figure.board.findField(x, y).figure != null) return false;
      }

      return true;
   }

   // from as field
   help(from) {
      Figure.board.fields.forEach(field => {
         if (this.move(from, field)) field.toggleClassHelp();
      });
   }
}