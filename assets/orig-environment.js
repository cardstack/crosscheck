// environment
var CardTypes = {
  vehicle: VehicleApp,
  animal: AnimalApp
};

var bootData = {
  slots: {
    kjnew: { elementId: 'container-slot-1' },
    '23lkm': { elementId: 'container-slot-2' },
    kybds: { elementId: 'container-slot-3' },
    knqrn: { elementId: 'container-slot-4' },
    i6gas: { elementId: 'container-slot-5' }
  },

  containers: [{ slotId: 'kjnew', cards: [{ type: 'vehicle' }, { type: 'animal' }] }, { slotId: 'knqrn', cards: [{ type: 'animal' }] }]
};

var Environment = Ember.Object.extend({
  _containerInstances: null,
  data: bootData,

  init: function init() {
    this._super.apply(this, arguments);
    this._containerInstances = [];
  },

  boot: function boot() {
    var _this = this;

    var environment = this;
    this.data.containers.forEach(function (containerData) {
      _this._containerInstances.push(Container.create({
        environment: environment,
        _data: containerData
      }));
    });
  },

  elementForSlot: function elementForSlot(slotId) {
    return this.data.slots[slotId].elementId;
  },

  sendMessage: function sendMessage(source) {
    for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      messages[_key - 1] = arguments[_key];
    }

    console.log.apply(console, ['Messages:'].concat(messages));

    this._containerInstances.forEach(function (container) {
      if (source === container) {
        return;
      }

      container.receiveMessage.apply(container, messages);
    });
  }
});

var Container = Ember.Object.extend({
  _data: null,

  init: function init() {
    this._super.apply(this, arguments);

    this.prepareSlot();
    this.bootCards();
  },

  prepareSlot: function prepareSlot() {
    var slotId = this._data.slotId;
    var slotElementId = this.environment.elementForSlot(slotId);
    var slot = document.getElementById(slotElementId);

    this._data.cards.forEach(function (card, index) {
      var element = document.createElement('div');
      element.id = '' + slotId + '-' + index;

      slot.appendChild(element);
    });
  },

  bootCards: function bootCards() {
    var _this2 = this;

    var cardContainer = this;

    this._data.cards.forEach(function (card, index) {
      var slotId = _this2._data.slotId;
      var App = CardTypes[card.type];

      App.create({
        cardContainer: cardContainer,
        rootElement: '#' + slotId + '-' + index
      });
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

// DOOO EEEEEEETTTTTTT!!!!!
var env = Environment.create();
env.boot();
