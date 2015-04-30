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

Conductor.card({
  activate: function(selector) {
    var body = document.body || document.documentElement.getElementsByTagName('body')[0];
    var element = document.createElement('div');
    element.id = UUID.generate();
    body.appendChild(element);
    AnimalApp.create({ rootElement: '#' + element.id });
  }
});
