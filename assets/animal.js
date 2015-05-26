// animal app
var AnimalAppRegistry = {};
var AnimalRouter = BaseRouter.extend();

var AnimalApp = Ember.Application.extend({
  Resolver: generateResolverWithFallback('animal', AnimalAppRegistry),
  Router: AnimalRouter,
  destroy: function() {
    this._super.apply(this, arguments);
    console.log('Destroyed!', this);
  }
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
  consumers: {
    cardManager: Conductor.Oasis.Consumer.extend({
      events: {
        destroyCard: function() {
          if (!this.card.app) { return; }
          this.card.app.destroy();
          this.send('didDestroyApp', {
            url: this.card.data.url,
            id: this.card.data.id
          });
          delete this.card.app;
        }
      }
    })
  },

  render: function(selector) {
    this.app = AnimalApp.create({ rootElement: selector });
  }
});
