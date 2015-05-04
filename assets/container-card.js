var card = Conductor.card({
  consumers: {
    cardManager: Conductor.Oasis.Consumer.extend({
      events: {
        addCard: function(newCard) {
          var cardInstance = this.card;
          var cardLength = cardInstance.data.cards.length;
          cardInstance.addCard(newCard);
          cardInstance.prepareSlot(newCard);
          cardInstance.appendCard(newCard, cardLength);
        },

        destroyCard: function(uuid) {
          var cardInstance = this.card;
          var cardInstanceCards = cardInstance.conductor.cards;
          var cards = Object.keys(cardInstanceCards).map(function(instanceName) {
            return cardInstanceCards[instanceName];
          });

          cards.forEach(function(card) {
            card[0][0].destroy();
          });
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
    var slot = document.querySelector(this.slotId);
    var element = document.createElement('div');
    var uuid = card.uuid || UUID.generate();

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

  appendCard: function(card, index) {
    var slotId = this.slotId;
    var el = card.elementId;
    var uuid = card.uuid;
    var adapter = card.options.adapter;

    var cardAdapter = Conductor.adapters[adapter];
    var cardInstance = this.conductor.load(card.url, index, {
      adapter: cardAdapter
    });

    if (adapter === 'iframe') {
      cardInstance.appendTo(el);
    } else {
      cardInstance.render(el);
    }
  }
});
