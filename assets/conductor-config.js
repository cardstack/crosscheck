var conductorInstance = new Conductor();
var containerCardPath = 'assets/container-card.js';

function createContainerCard(containerId, options) {
  conductorInstance.loadData(containerCardPath, containerId, options);

  return conductorInstance.load(containerCardPath, containerId, {
    adapter: Conductor.adapters.inline
  });
}

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

container1.render('#container-slot-1');
container2.render('#container-slot-2');
container3.render('#container-slot-3');
