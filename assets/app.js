// base

'use strict';

var BaseApplicationRoute = Ember.Route.extend({
  actions: {
    error: (function (_error) {
      function error(_x) {
        return _error.apply(this, arguments);
      }

      error.toString = function () {
        return _error.toString();
      };

      return error;
    })(function (error) {
      log(error.message);
    })
  }
});

var BaseRoute = Ember.Route.extend({
  model: function model() {
    return {
      type: this.routeName,
      showRoute: this.routeName + '.show',
      list: makeList(10, this.routeName)
    };
  }
});

var BaseIndexRoute = Ember.Route.extend({
  templateName: 'vehicle-index'
});

var BaseShowRoute = Ember.Route.extend({
  templateName: 'vehicle-show',
  model: function model(params) {
    var _routeName$split = this.routeName.split('.');

    var parent = _routeName$split[0];

    return {
      parent: parent,
      text: params.id
    };
  }
});

var BaseRouter = Ember.Router.extend({
  location: 'none',

  notifyOnTransition: Ember.on('didTransition', function () {
    this.namespace.cardContainer.sendMessage('transitioned!!!');
  })
});

// vehicle application

var VehicleRouter = BaseRouter.extend();

var VehicleApp = Ember.Application.extend({
  Resolver: generateResolverWithFallback('vehicle'),
  Router: VehicleRouter
});

VehicleRouter.map(function () {
  this.route('cars', function () {
    this.route('show', { path: ':id' });
  });
  this.route('trucks', function () {
    this.route('show', { path: ':id' });
  });
  this.route('vans', function () {
    this.route('show', { path: ':id' });
  });
  this.route('ambulances', function () {
    this.route('show', { path: ':id' });
  });
  this.route('motorcycles', function () {
    this.route('show', { path: ':id' });
  });
});

VehicleApp.ApplicationRoute = BaseApplicationRoute.extend({ templateName: 'vehicle-application' });

VehicleApp.CarsRoute = BaseRoute.extend();
VehicleApp.TrucksRoute = BaseRoute.extend();
VehicleApp.VansRoute = BaseRoute.extend();
VehicleApp.AmbulancesRoute = BaseRoute.extend();
VehicleApp.MotorcyclesRoute = BaseRoute.extend();

VehicleApp.CarsIndexRoute = BaseIndexRoute.extend();
VehicleApp.TrucksIndexRoute = BaseIndexRoute.extend();
VehicleApp.VansIndexRoute = BaseIndexRoute.extend();
VehicleApp.AmbulancesIndexRoute = BaseIndexRoute.extend();
VehicleApp.MotorcyclesIndexRoute = BaseIndexRoute.extend();

VehicleApp.CarsShowRoute = BaseShowRoute.extend();
VehicleApp.TrucksShowRoute = BaseShowRoute.extend();
VehicleApp.VansShowRoute = BaseShowRoute.extend();
VehicleApp.AmbulancesShowRoute = BaseShowRoute.extend();
VehicleApp.MotorcyclesShowRoute = BaseShowRoute.extend();

// animal app
var AnimalRouter = BaseRouter.extend();

var AnimalApp = Ember.Application.extend({
  Resolver: generateResolverWithFallback('animal'),
  Router: AnimalRouter
});

AnimalRouter.map(function () {
  this.route('panda');
  this.route('alpaca');
  this.route('dog');
});

AnimalApp.ApplicationRoute = BaseApplicationRoute.extend({ templateName: 'animal-application' });

AnimalApp.PandaRoute = BaseRoute.extend({ templateName: 'animal-index' });
AnimalApp.AlpacaRoute = BaseRoute.extend({ templateName: 'animal-index' });
AnimalApp.DogRoute = BaseRoute.extend({ templateName: 'animal-index' });

// environment

var CardTypes = {
  vehicle: VehicleApp,
  animal: AnimalApp
};

var bootData = {
  slots: {
    kjnew: { elementId: 'container-slot-1' },
    '23lkm': { elementId: 'container-slot-2' },
    kybds: { elementId: 'container-slot-3' },
    knqrn: { elementId: 'container-slot-4' },
    i6gas: { elementId: 'container-slot-5' }
  },

  containers: [{ slotId: 'kjnew', cards: [{ type: 'vehicle' }, { type: 'animal' }] }, { slotId: 'knqrn', cards: [{ type: 'animal' }] }]
};

var Environment = Ember.Object.extend({
  _containerInstances: null,
  data: bootData,

  init: function init() {
    this._super.apply(this, arguments);
    this._containerInstances = [];
  },

  boot: function boot() {
    var _this = this;

    var environment = this;
    this.data.containers.forEach(function (containerData) {
      _this._containerInstances.push(Container.create({
        environment: environment,
        _data: containerData
      }));
    });
  },

  elementForSlot: function elementForSlot(slotId) {
    return this.data.slots[slotId].elementId;
  },

  sendMessage: function sendMessage(source) {
    for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      messages[_key - 1] = arguments[_key];
    }

    console.log.apply(console, ['Messages:'].concat(messages));

    this._containerInstances.forEach(function (container) {
      if (source === container) {
        return;
      }

      container.receiveMessage.apply(container, messages);
    });
  }
});

var Container = Ember.Object.extend({
  _data: null,

  init: function init() {
    this._super.apply(this, arguments);

    this.prepareSlot();
    this.bootCards();
  },

  prepareSlot: function prepareSlot() {
    var slotId = this._data.slotId;
    var slotElementId = this.environment.elementForSlot(slotId);
    var slot = document.getElementById(slotElementId);

    this._data.cards.forEach(function (card, index) {
      var element = document.createElement('div');
      element.id = '' + slotId + '-' + index;

      slot.appendChild(element);
    });
  },

  bootCards: function bootCards() {
    var _this2 = this;

    var cardContainer = this;

    this._data.cards.forEach(function (card, index) {
      var slotId = _this2._data.slotId;
      var App = CardTypes[card.type];

      App.create({
        cardContainer: cardContainer,
        rootElement: '#' + slotId + '-' + index
      });
    });
  },

  sendMessage: function sendMessage() {
    var _environment;

    (_environment = this.environment).sendMessage.apply(_environment, [this].concat(arguments));
  },

  receiveMessage: function receiveMessage() {
    console.log.apply(console, ['received: '].concat(arguments));
  }
});

// DOOO EEEEEEETTTTTTT!!!!!
var env = Environment.create();
env.boot();

function makeList(count, text) {
  var ret = [];

  for (var i = 0; i < count; i++) {
    ret.push('' + text + ' -- item ' + i);
  }

  return ret;
}

function generateResolverWithFallback(type) {
  var Resolver = Ember.DefaultResolver.extend({
    resolveOther: function resolveOther(parsedName) {
      var classify = Ember.String.classify;
      var get = Ember.get;
      var className = classify(parsedName.name) + classify(parsedName.type);
      var factory = get(parsedName.root, className);
      if (factory) {
        return factory;
      }

      factory = get(CardTypes[type], className);
      if (factory) {
        return factory;
      }
    }
  });

  return Resolver;
}

Ember.onerror = log;
function log() {
  var msg = [].slice.call(arguments).join(' ');
  logs.insertBefore(document.createTextNode('\n' + msg), logs.firstChild);
}
