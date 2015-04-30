var conductorInstance = new Conductor();

function buildAnimalCard() {
  return conductorInstance.load('assets/animal.js', 'animal', {
    adapter: Conductor.adapters.inline
  });
}

function buildVehicleCard() {
  return conductorInstance.load('assets/vehicle.js', 'vehicle', {
    adapter: Conductor.adapters.inline
  });
}

var animal1 = buildAnimalCard();
animal1.render('#container-slot-1');
var animal2 = buildAnimalCard();
animal2.render('#container-slot-2');
var vehicle1 = buildVehicleCard();
vehicle1.render('#container-slot-3');

conductorInstance.loadData('assets/container-card.js', 'container-1', {
  cards: [
    { url: 'assets/animal.js' },
    { url: 'assets/vehicle.js' }
  ]
});
var container1 = conductorInstance.load('assets/container-card.js', 'container-1', {
  adapter: Conductor.adapters.inline
});

container1.render('#container-slot-4');
