//Articles service used for articles REST endpoint
angular.module('mean.gifit').factory("Gifit", ['$resource', function($resource) {
    return $resource('/api/gifit/:id', {
        gifit: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
