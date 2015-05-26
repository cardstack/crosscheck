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
    //this.namespace.cardContainer.sendMessage('transitioned!!!');
  })
});

function makeList(count, text) {
  var ret = [];

  for (var i = 0; i < count; i++) {
    ret.push('' + text + ' -- item ' + i);
  }

  return ret;
}

function generateResolverWithFallback(type, fallbackRegistry) {
  var Resolver = Ember.DefaultResolver.extend({
    resolveOther: function resolveOther(parsedName) {
      var classify = Ember.String.classify;
      var get = Ember.get;
      var className = classify(parsedName.name) + classify(parsedName.type);
      var factory = get(parsedName.root, className);
      if (factory) {
        return factory;
      }

      factory = get(fallbackRegistry, className);
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
