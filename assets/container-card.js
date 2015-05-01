var card = Conductor.card({
  render: function(slotId) {
    this.slotId = slotId;
    this.prepareSlot();
    this.bootCards();
  },

  prepareSlot: function prepareSlot() {
    var slotId = this.slotId;
    var cards = this.data.cards;
    var slot = document.querySelector(slotId);

    cards.forEach(function (card, index) {
      var element = document.createElement('div');
      element.id = '' + slot.id + '-' + index;

      slot.appendChild(element);
    });
  },

  bootCards: function bootCards() {
    var cardContainer = this;
    var cards = this.data.cards;

    cardContainer.conductor = new Conductor();

    cards.forEach(function (card, index) {
      var slotId = cardContainer.slotId;
      var adapter = card.options.adapter;
      var cardAdapter = Conductor.adapters[adapter];
      var cardInstance = cardContainer.conductor.load(card.url, index, {
        adapter: cardAdapter
      });

      if (adapter === 'iframe') {
        cardInstance.appendTo(slotId + '-' + index);
      } else {
        cardInstance.render(slotId + '-' + index);
      }
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
