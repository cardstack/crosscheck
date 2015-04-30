var conductorInstance = new Conductor();

conductorInstance.loadData('assets/container-card.js', 'container-1', {
  cards: [
    { url: 'assets/animal.js' },
    { url: 'assets/vehicle.js' }
  ]
});

var container1 = conductorInstance.load('assets/container-card.js', 'container-1', {
  adapter: Conductor.adapters.inline
});
container1.render('#container-slot-1');

conductorInstance.loadData('assets/container-card.js', 'container-2', {
  cards: [
    { url: 'assets/animal.js' },
    { url: 'assets/vehicle.js' }
  ]
});

var container2 = conductorInstance.load('assets/container-card.js', 'container-1', {
  adapter: Conductor.adapters.inline
});
container2.render('#container-slot-2');
