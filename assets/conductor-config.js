var conductorInstance = new Conductor();
var card = conductorInstance.load('assets/animal.js', 'animal', {
  adapter: Conductor.adapters.inline
});

card.appendTo('#container-slot-1');
