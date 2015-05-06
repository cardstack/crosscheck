var conductorInstance = new Conductor();
var containerCardPath = 'assets/container-card.js';

var CardManagerService = Conductor.Oasis.Service.extend({
  initialize: function(port) {
    this.sandbox.cardManagerPort = port;
  },

  addCard: function(card) {
    this.send('addCard', card);
  },

  destroyCards: function() {
    this.send('destroyCards');
  }
});

conductorInstance.addDefaultCapability('cardManager', CardManagerService);

var ENVIRONMENT = {
  containerInstances: {},

  containers: {
    'container-1': {
      cards: [
        { uuid: UUID.generate(), url: 'assets/animal.js', options: { adapter: 'inline' } },
        { uuid: UUID.generate(), url: 'assets/vehicle.js', options: { adapter: 'inline' } }
      ]
    },
    'container-2': {
      cards: [
        { uuid: UUID.generate(), url: 'assets/animal.js', options: { adapter: 'inline' } },
        { uuid: UUID.generate(), url: 'assets/vehicle.js', options: { adapter: 'inline' } }
      ]
    },
    'sidebar-1': {
      cards: [
        { uuid: UUID.generate(), url: 'http://localhost:8000/iframe.html', options: { adapter: 'iframe' }}
      ]
    }
  },

  addCard: function(containerKey, card) {
    var container = this.containerInstances[containerKey];

    if (!container) { return; }

    container.waitForLoad().then(function(loadedContainer) {
      loadedContainer.sandbox.capabilities.cardManager.addCard(card);
    });
  },

  destroyCards: function(containerKey) {
    var container = this.containerInstances[containerKey];


    if (!container) { return; }

    container.waitForLoad().then(function(loadedContainer) {
      loadedContainer.sandbox.capabilities.cardManager.destroyCards();
    });
  },

  createContainerCard: function(containerId) {
    var options = this.containers[containerId];
    var capabilities = options.capabilities || [];
    conductorInstance.loadData(containerCardPath, containerId, options);

    var containerCard = conductorInstance.load(containerCardPath, containerId, {
      adapter: Conductor.adapters.inline,
      capabilities: capabilities
    });

    this.containerInstances[containerId] = containerCard;
    return containerCard;
  }
};

var container1 = ENVIRONMENT.createContainerCard('container-1');
var container2 = ENVIRONMENT.createContainerCard('container-2');
var sidebar1 = ENVIRONMENT.createContainerCard('sidebar-1');

container1.render('#container-slot-1');
container2.render('#container-slot-2');
sidebar1.render('#sidebar');
