

angular.module('myApp', [])
// .run(['$rootScope',function ($rootScope) {
//     console.log("jump to run", $rootScope); // cannot do that, because at this time, there is no binding yet
// }])
.controller('myController', ['$scope' , '$rootScope',function ($scope, $rootScope) {
    $scope.bindData = 'jacky';
    console.log("jump to controller");
    console.log($rootScope);
    console.log($scope);
}]);