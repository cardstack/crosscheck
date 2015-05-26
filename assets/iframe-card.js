// control panel application

var ControlPanelAppRegistry = {};
var ControlPanelRouter = BaseRouter.extend();

var ControlPanelApp = Ember.Application.extend({
  Resolver: generateResolverWithFallback('ControlPanel', ControlPanelAppRegistry),
  Router: ControlPanelRouter,
  destroy: function() {
    this._super.apply(this, arguments);
    console.log('Destroyed!', this);
  }
});

ControlPanelRouter.map(function () {
});

ControlPanelAppRegistry.CardService = Ember.Service.extend({
  handleInit: Ember.on('init', function() {
    var app = this.container.lookup('application:main');
    Ember.set(this, 'cardInstance', app.get('cardInstance'));
  })
});

ControlPanelAppRegistry.ApplicationRoute = BaseApplicationRoute.extend({
  templateName: 'controlpanel-application',

  cardService: Ember.inject.service('card'),

  actions: {
    addCard: function(containerKey, cardUrl) {
      var cardService = Ember.get(this, 'cardService');
      var cardInstance = cardService.get('cardInstance');
      cardInstance.consumers.cardManager.send('addCard', {
        containerKey: containerKey,
        card: {
          uuid: UUID.generate(), url: cardUrl, options: { adapter: 'inline' }
        }
      });
    },

    destroyCards: function(containerKey) {
      var cardService = Ember.get(this, 'cardService');
      var cardInstance = cardService.get('cardInstance');
      cardInstance.consumers.cardManager.send('destroyCards', {
        containerKey: containerKey
      });
    }
  }
});

var cardInstance = Conductor.card({
  consumers: {
    cardManager: Conductor.Oasis.Consumer.extend({
      events: {
        destroyCard: function(data) {
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

  render: function() {
    this.app = ControlPanelApp.create();
    this.app.set('cardInstance', this);
  }
});
