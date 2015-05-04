var card = Conductor.card({
  consumers: {
    cardManager: Conductor.Oasis.Consumer.extend({
      events: {
        addCard: function(newCard) {
          var cardInstance = this.card;
          cardInstance.addCard(newCard);
          cardInstance.prepareSlot(newCard);
          cardInstance.appendCard(newCard);
        }
      }
    })
  },

  render: function(slotId) {
    this.slotId = slotId;
    this.prepareSlots();
    this.bootCards();
  },

  prepareSlots: function prepareSlots() {
    this.data.cards.forEach(this.prepareSlot, this);
  },

  prepareSlot: function(card) {
    var slotId = this.slotId;
    var slot = document.querySelector(slotId);
    var uuid = UUID.generate();
    var element = document.createElement('div');

    card.uuid = uuid;
    element.id = slot.id + '-' + uuid;
    card.elementId = '#' + element.id;

    slot.appendChild(element);
  },

  bootCards: function bootCards() {
    var cardContainer = this;
    var cards = this.data.cards;

    cardContainer.conductor = new Conductor();

    cards.forEach(cardContainer.appendCard, this);
  },

  addCard: function(card) {
    var cards = this.data.cards;
    cards.push(card);
    return card;
  },

  appendCard: function(card) {
    var slotId = this.slotId;
    var el = card.elementId;
    var uuid = card.uuid;
    var adapter = card.options.adapter;

    var cardAdapter = Conductor.adapters[adapter];
    var cardInstance = this.conductor.load(card.url, uuid, {
      adapter: cardAdapter
    });

    if (adapter === 'iframe') {
      cardInstance.appendTo(el);
    } else {
      cardInstance.render(el);
    }
  },

  sendMessage: function sendMessage() {
    var _environment;

    (_environment = this.environment).sendMessage.apply(_environment, [this].concat(arguments));
  },

  receiveMessage: function receiveMessage() {
    console.log.apply(console, ['received: '].concat(arguments));
  }
});
