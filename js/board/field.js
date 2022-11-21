class Field {
   constructor(x, y, row) {
      this.position = new Position(x, y)
      this.figure = null;
      this.onInit(row);
   }

   onInit(row) {
      this.wrapper = document.createElement('td');

      var div = document.createElement('div')
      div.classList.add('figure');

      this.wrapper.appendChild(div);

      row.appendChild(this.wrapper);
   }

   setFigure(figure) {
      this.figure = figure;
      this.wrapper.getElementsByTagName('div')[0].innerHTML = this.figure.shape;
   }

   clearFigure() {
      this.figure = null;
      this.wrapper.getElementsByTagName('div')[0].innerHTML = null;
   }

   select() {
      if (this.figure != null) {
         this.wrapper.classList.toggle('active')
         this.figure.help(this);
      }

      return this.figure != null;
   }

   toggleClassHelp() {
      this.wrapper.classList.toggle('help');
   }

   removeClassHelp() {
      this.wrapper.classList.remove('help');
   }
}