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
