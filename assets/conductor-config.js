var conductorInstance = new Conductor();
var containerCardPath = 'assets/container-card.js';

function createContainerCard(containerId, options) {
  var capabilities = options.capabilities || [];
  conductorInstance.loadData(containerCardPath, containerId, options);

  return conductorInstance.load(containerCardPath, containerId, {
    adapter: Conductor.adapters.inline,
    capabilities: capabilities
  });
}

var CardManagerService = Conductor.Oasis.Service.extend({
  initialize: function (port) {
    this.sandbox.cardManagerPort = port;
  },

  addCard: function(card) {
    this.send('addCard', card);
  },

  destroyCard: function(card) {
    this.send('destroyCard', card);
  }
});

conductorInstance.addDefaultCapability('cardManager', CardManagerService);

var container1 = createContainerCard('container-1', {
  cards: [
    { uuid: UUID.generate(), url: 'assets/animal.js', options: { adapter: 'inline' } },
    { uuid: UUID.generate(), url: 'assets/vehicle.js', options: { adapter: 'inline' } }
  ]
});

var container2 = createContainerCard('container-2', {
  cards: [
    { uuid: UUID.generate(), url: 'assets/animal.js', options: { adapter: 'inline' } },
    { uuid: UUID.generate(), url: 'assets/vehicle.js', options: { adapter: 'inline' } }
  ]
});

var container3 = createContainerCard('container-3', {
  cards: [
    { uuid: UUID.generate(), url: 'http://new.dockyard.com', options: { adapter: 'iframe' }}
  ]
});

container1.render('#container-slot-1');
container2.render('#container-slot-2');
container3.render('#container-slot-3');

$(function() {
  $('#addAnimalCard').on('click', function() {
    container1.waitForLoad().then(function(card) {
      card.sandbox.capabilities.cardManager.addCard({
        uuid: UUID.generate(), url: 'assets/animal.js', options: { adapter: 'inline' }
      });
    });
  });

  $('#addVehicleCard').on('click', function() {
    container1.waitForLoad().then(function(card) {
      card.sandbox.capabilities.cardManager.addCard({
        uuid: UUID.generate(), url: 'assets/vehicle.js', options: { adapter: 'inline' }
      });
    });
  });

  $('#destroyCards').on('click', function() {
    container1.waitForLoad().then(function(card) {
      card.sandbox.capabilities.cardManager.destroyCard();
    });
  });
});
