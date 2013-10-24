angular.module('mean.gifit').controller('GifitController', ['$scope', '$routeParams', '$location', 'Global', 'Gifit', function ($scope, $routeParams, $location, Global, Gifit) {
    $scope.global = Global;

    $scope.create = function() {
        var article = new Gifit({
            text: this.text,
            content: this.content
        });
        article.$save(function(response) {
            $location.path("gifit/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.find = function() {
        Gifit.query(function(gifits) {
            $scope.gifits = gifits;
        });
    };

    $scope.findOne = function() {
        Gifit.get({
            id: $routeParams.id
        }, function(gifit) {
            $scope.gifit = gifit;
        });
    };
}]);
