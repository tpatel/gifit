//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        /*when('/gifit', {
            templateUrl: '/views/gifit/list.html'
        }).*/
        when('/gifit/create', {
            templateUrl: '/views/gifit/create.html'
        }).
        when('/gifit/:id', {
            templateUrl: '/views/gifit/view.html'
        }).
        when('/', {
            templateUrl: '/views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
