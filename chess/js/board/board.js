class Board {
   constructor() {
      this.wrapper = document.getElementById("board")
      this.fields = [];
      this.selectedField = null;

      this.round = 0;
      this.queue = ['white', 'black'];
      this.enPassant = null;
   }

   getPlayer() {
      return this.queue[this.round % 2];
   }

   generate() {
      // GENERATE FIELDS [8x8 ] ON BOARD
      for (var x = 0; x < 8; x++) {
         var row = document.createElement('tr');

         for (var y = 0; y < 8; y++) {
            let field = new Field(x + 1, y + 1, row);
            this.fields.push(field);
         }

         this.wrapper.appendChild(row);
      }
   }

   placeFigures() {
      // BLACK
      for (var i = 0; i < 8; i++) {
         // this.findField(2, i + 1).setFigure(new Pawn('black'));
      }

      this.findField(1, 1).setFigure(new Rock('black'));
      this.findField(1, 8).setFigure(new Rock('black'));

      this.findField(1, 3).setFigure(new Bishop('black'));
      this.findField(1, 6).setFigure(new Bishop('black'));

      this.findField(1, 2).setFigure(new Knight('black'));
      this.findField(1, 7).setFigure(new Knight('black'));

      this.findField(1, 4).setFigure(new Queen('black'));

      // WHITE
      for (var i = 0; i < 8; i++) {
         // this.findField(7, i + 1).setFigure(new Pawn('white'));
      }

      this.findField(8, 1).setFigure(new Rock('white'));
      this.findField(8, 8).setFigure(new Rock('white'));

      this.findField(8, 3).setFigure(new Bishop('white'));
      this.findField(8, 6).setFigure(new Bishop('white'));

      this.findField(8, 2).setFigure(new Knight('white'));
      this.findField(8, 7).setFigure(new Knight('white'));

      this.findField(8, 4).setFigure(new Queen('white'));
   }

   findField(x, y) {
      for (var i = 0; i < this.fields.length; i++) {
         if (this.fields[i].position.is(x, y)) {
            return this.fields[i];
         }
      }

      return null;
   }

   findFigure(x, y) {
      return this.findField(x, y).figure;
   }

   initOnClickOnFields() {
      for (let i = 0; i < this.fields.length; i++) {
         let field = this.fields[i];

         field.wrapper.addEventListener('click', () => {
            // console.log(field.position.getVector());
            // Jeżeli została zaznaczona jakaś figura
            if (this.selectedField != null) {
               // Odznaczenie figury
               if (this.selectedField == field) {
                  this.selectedField.select();
                  this.selectedField = null;
                  return 0;
               }

               // Przenieś figurę na wskazaną pozycję
               // Metoda move sprawdza czy możemy się ruszyć na dene pole
               if (this.selectedField.figure.move(this.selectedField, field)) {
                  field.setFigure(this.selectedField.figure)
                  this.selectedField.select();
                  this.selectedField.clearFigure(null);
                  this.selectedField = null;
                  this.round++;
                  this.hideAvaiableMoves();
               }

               return 0;
            }

            if (field.figure == null) return 0;

            // Zaznacz pole z figurą
            if (field.figure.color == this.getPlayer() && field.select()) {
               this.selectedField = field;
            }
         })
      }
   }

   hideAvaiableMoves() {
      this.fields.forEach(field => {
         field.removeClassHelp();
      });
   }
}