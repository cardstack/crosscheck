var card = Conductor.card({
  render: function(slotId) {
    this.slotId = slotId;
    this.prepareSlot();
    this.bootCards();
  },

  prepareSlot: function prepareSlot() {
    var slotId = this.slotId;
    var slot = document.querySelector(slotId);

    this.data.cards.forEach(function (card, index) {
      var element = document.createElement('div');
      element.id = '' + slot.id + '-' + index;

      slot.appendChild(element);
    });
  },

  bootCards: function bootCards() {
    var cardContainer = this;

    cardContainer.conductor = new Conductor( );

    this.data.cards.forEach(function (cardOptions, index) {
      var slotId = cardContainer.slotId;
      var cardInstance = cardContainer.conductor.load(cardOptions.url, index, {
        adapter: Conductor.adapters.inline
      });

      cardInstance.render(slotId + '-' + index);
    });
  },

  sendMessage: function sendMessage() {
    var _environment;

    (_environment = this.environment).sendMessage.apply(_environment, [this].concat(arguments));
  },

  receiveMessage: function receiveMessage() {
    console.log.apply(console, ['received: '].concat(arguments));
  }
});
