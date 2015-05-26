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


// DOOO EEEEEEETTTTTTT!!!!!
var env = Environment.create();
env.boot();
