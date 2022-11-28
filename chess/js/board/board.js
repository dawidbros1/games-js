class Board {
   constructor() {
      this.wrapper = document.getElementById("board")
      this.fields = [];
      this.selectedField = null;

      this.round = 0;
      this.queue = ['white', 'black']

      Board.enPassant = null;
      Board.clearEnPassant = false;

      this.avaiableFigures = { Pawn, Rock, Bishop, Knight, King, Queen }
   }

   getPlayer() {
      return this.queue[this.round % 2];
   }

   getNextPlayer() {
      return this.queue[(this.round + 1) % 2];
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
      this.findField(1, 5).setFigure(new King('black'));

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
      this.findField(8, 5).setFigure(new King('white'));
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
            if (this.selectedField != null) {
               if (this.selectedField == field) return this.uncheck();

               if (this.selectedField.figure.canMoveToField(this.selectedField, field)) {
                  this.moveFigureTo(field);
                  this.checkEnPassant(field);
               }

               return 0;
            }

            if (field.figure == null) return 0;
            if (field.figure.color == this.getPlayer() && field.select()) this.selectedField = field;
         })
      }
   }

   moveFigureTo(field) {
      let selectedType = this.selectedField.figure == null ? null : this.selectedField.figure.constructor.name;
      // let toFigure = field.figure == null ? null : Object.assign({}, field.figure);
      let targetType = field.figure == null ? null : field.figure.constructor.name;

      field.setFigure(this.selectedField.figure)

      this.selectedField.select();
      this.selectedField.clearFigure(null);

      this.fields.forEach(field => {
         field.removeClassHelp();
      });

      // Jeżeli po wykonaniu ruchu mój król będzie zagrożony to nie pozwól na wykonaniu ruchu
      if (this.kingIsInDanger()) {
         this.selectedField.setFigure(new this.avaiableFigures[selectedType](this.getPlayer()));

         if (targetType != null) { field.setFigure(new this.avaiableFigures[targetType](this.getNextPlayer())); }
         else field.clearFigure();

         this.selectedField = null;
         return 0;
      }

      this.selectedField = null;
      this.round++;

      if (this.kingIsInDanger()) {
         // Czy jest możliwość ucieczki => Jak nie to koniec gry
         // Poinformuj gracza
      }
   }

   uncheck() {
      this.selectedField.select();
      this.selectedField = null;
      return 0;
   }

   checkEnPassant(field) {
      if (Board.enPassant != null) {
         if (Board.clearEnPassant == true) {
            Board.enPassant = null;
            Board.clearEnPassant = false;
         }
         else {
            Board.enPassant = field;
            Board.clearEnPassant = true;
         }
      }
   }

   kingIsInDanger() {
      var color = this.getPlayer(); // get color of current player

      // Pobierz swojego króla
      var fieldOfKing = null;

      this.fields.forEach(field => {
         if (field.figure != null && field.figure.constructor.name == "King" && field.figure.color == color) {
            fieldOfKing = field;
         }
      });

      var fields = this.getFieldsByColor(this.getNextPlayer())
      var status = false;


      fields.forEach(field => {
         if (field.figure.canMoveToField(field, fieldOfKing)) {
            console.log("INFO [SZACH]: " + color + " król jest zagroszony");
            status = true;
         }
      });

      return status;
   }

   getFieldsByColor(color) {
      var output = [];

      this.fields.forEach(field => {
         if (field.figure != null && field.figure.color == color) {
            output.push(field);
         }
      });

      return output;
   }
}