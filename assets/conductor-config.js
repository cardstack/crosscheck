var conductorInstance = new Conductor();

function buildAnimalCard() {
  return conductorInstance.load('assets/animal.js', 'animal', {
    adapter: Conductor.adapters.inline
  });
}

var animal1 = buildAnimalCard();
animal1.render('#container-slot-1');
var animal2 = buildAnimalCard();
animal2.render('#container-slot-2');
