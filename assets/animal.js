// animal app
var AnimalAppRegistry = {};
var AnimalRouter = BaseRouter.extend();

var AnimalApp = Ember.Application.extend({
  Resolver: generateResolverWithFallback('animal', AnimalAppRegistry),
  Router: AnimalRouter
});

AnimalRouter.map(function () {
  this.route('panda');
  this.route('alpaca');
  this.route('dog');
});

AnimalAppRegistry.ApplicationRoute = BaseApplicationRoute.extend({
  templateName: 'animal-application'

});

AnimalAppRegistry.PandaRoute = BaseRoute.extend({ templateName: 'animal-index' });
AnimalAppRegistry.AlpacaRoute = BaseRoute.extend({ templateName: 'animal-index' });
AnimalAppRegistry.DogRoute = BaseRoute.extend({ templateName: 'animal-index' });

var card = Conductor.card({
  render: function(selector) {
    this.app = AnimalApp.create({ rootElement: selector });
  },

  destroy: function() {
    console.log('Destroying Ember app');
    this.app.destroy();
  }
});
