// vehicle application

var VehicleAppRegistry = {};
var VehicleRouter = BaseRouter.extend();

var VehicleApp = Ember.Application.extend({
  Resolver: generateResolverWithFallback('vehicle', VehicleAppRegistry),
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

VehicleAppRegistry.ApplicationRoute = BaseApplicationRoute.extend({ templateName: 'vehicle-application' });

VehicleAppRegistry.CarsRoute = BaseRoute.extend();
VehicleAppRegistry.TrucksRoute = BaseRoute.extend();
VehicleAppRegistry.VansRoute = BaseRoute.extend();
VehicleAppRegistry.AmbulancesRoute = BaseRoute.extend();
VehicleAppRegistry.MotorcyclesRoute = BaseRoute.extend();

VehicleAppRegistry.CarsIndexRoute = BaseIndexRoute.extend();
VehicleAppRegistry.TrucksIndexRoute = BaseIndexRoute.extend();
VehicleAppRegistry.VansIndexRoute = BaseIndexRoute.extend();
VehicleAppRegistry.AmbulancesIndexRoute = BaseIndexRoute.extend();
VehicleAppRegistry.MotorcyclesIndexRoute = BaseIndexRoute.extend();

VehicleAppRegistry.CarsShowRoute = BaseShowRoute.extend();
VehicleAppRegistry.TrucksShowRoute = BaseShowRoute.extend();
VehicleAppRegistry.VansShowRoute = BaseShowRoute.extend();
VehicleAppRegistry.AmbulancesShowRoute = BaseShowRoute.extend();
VehicleAppRegistry.MotorcyclesShowRoute = BaseShowRoute.extend();

var card = Conductor.card({
  render: function(selector) {
    VehicleApp.create({ rootElement: selector });
  }
});
