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
  }
});

conductorInstance.addDefaultCapability('cardManager', CardManagerService);

var container1 = createContainerCard('container-1', {
  cards: [
    { url: 'assets/animal.js', options: { adapter: 'inline' } },
    { url: 'assets/vehicle.js', options: { adapter: 'inline' } }
  ]
});

var container2 = createContainerCard('container-2', {
  cards: [
    { url: 'assets/animal.js', options: { adapter: 'inline' } },
    { url: 'assets/vehicle.js', options: { adapter: 'inline' } }
  ]
});

var container3 = createContainerCard('container-3', {
  cards: [
    { url: 'http://new.dockyard.com', options: { adapter: 'iframe' }}
  ]
});

$('#lol').on('click', function() {
  container1.waitForLoad().then(function(card) {
    card.sandbox.capabilities.cardManager.addCard({
      url: 'assets/animal.js', options: { adapter: 'inline' }
    });
  });
});

container1.render('#container-slot-1');
container2.render('#container-slot-2');
container3.render('#container-slot-3');
