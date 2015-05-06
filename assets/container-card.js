var containerCard = Conductor.card({
  conductorConfiguration: {
    allowSameOrigin: true
  },

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

        destroyCards: function() {
          this.card.destroyCards();
        }
      }
    })
  },

  services: {
    cardManager: Conductor.Oasis.Service.extend({
      initialize: function(port) {
        this.sandbox.cardManagerPort = port;
      },

      destroyCard: function(data) {
        this.send('destroyCard', data);
      },

      events: {
        addCard: function(data) {
          var containerKey = data.containerKey;
          var card = data.card;
          ENVIRONMENT.addCard(containerKey, card);
        },

        destroyCards: function(data) {
          var containerKey = data.containerKey;
          ENVIRONMENT.destroyCards(containerKey);
        },

        didDestroyApp: function(card) {
          var url = card.url;
          var id = card.id;

          var cardReference = this.sandbox.conductor.cards[url][id][0];
          this.sandbox.conductor.unload(cardReference);
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
    card.element = element;

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

    conductorInstance.addDefaultCapability('cardManager', this.services.cardManager);

    conductorInstance.loadData(card.url, index, {
      url: card.url,
      id: index
    });

    var cardInstance = conductorInstance.load(card.url, index, {
      adapter: cardAdapter
    });

    card.instance = cardInstance;

      cardInstance.appendTo(el).then(function() {
        cardInstance.render(el);
        card.instance.sandbox.el = card.element;
      });
  },

  destroyCards: function() {
    this.data.cards.forEach(this.destroyCard, this);
  },

  destroyCard: function(card) {
    var conductorInstance = this.conductor;
    var instance = card.instance;

    instance.waitForLoad().then(function(loadedInstance) {
      instance.sandbox.capabilities.cardManager.destroyCard();
    });
  }
});
