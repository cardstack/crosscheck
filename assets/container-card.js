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
          this.card.destroyCards();
          // this.card.destroyCard(uuid);
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
    var conductorInstance = this.conductor;
    var slotId = this.slotId;
    var el = card.elementId;
    var uuid = card.uuid;
    var adapter = card.options.adapter;

    var cardAdapter = Conductor.adapters[adapter];

    var CardManagerService = Conductor.Oasis.Service.extend({
      initialize: function (port) {
        this.sandbox.cardManagerPort = port;
      },

      destroyCard: function() {
        this.send('destroyCard');
      }
    });

    conductorInstance.addDefaultCapability('cardManager', CardManagerService);

    var cardInstance = conductorInstance.load(card.url, index, {
      adapter: cardAdapter
    });

    if (adapter === 'iframe') {
      cardInstance.appendTo(el);
    } else {
      cardInstance.render(el);
    }

    card.instance = cardInstance;
  },

  destroyCards: function() {
    this.data.cards.forEach(this.destroyCard, this);
  },

  destroyCard: function(card) {
    var conductorInstance = this.conductor;
    var instance = card.instance;

    instance.waitForLoad().then(function(loadedInstance) {
      loadedInstance.sandbox.capabilities.cardManager.destroyCard();
    });
  }
});
