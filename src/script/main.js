require('jQuery');
require('angular');

angular.module('myApp', [])
// .run(['$rootScope',function ($rootScope) {
//     console.log("jump to run", $rootScope); // cannot do that, because at this time, there is no binding yet
// }])
.controller('myController', ['$scope' , '$rootScope',function ($scope, $rootScope) {
    console.log("jump to controller");
    // console.log($rootScope);
    // console.log($scope);
}])
.directive('myDirective',['$http' ,function ($http) {
    return {
        restrict : 'E',
        scope : {
            name : '='
        },
        template : '<div><button ng-click="click()"/> <nest-directive name="bindData.name" bind-data="bindData"></nest-directive></div>',
        replace : true,
        link : {
            post : function (scope, iElem, iAttrs) {
                console.log('inside my post link funciton');
                console.log("iElem", iElem);
                // scope.name = "jacky";
                scope.bindData = {};
                scope.bindData.name = "jacky";
                scope.click = function () {
                    scope.bindData.name = "changed";
                    console.log("inside handler");
                    setTimeout(function() {
                        console.log("next event loop");
                    })
                    $http.get('test.html').then(function(response) {
                        console.log(response);
                    });
                    scope.$evalAsync(function() {
                        console.log("async task");
                    });
                }
            }
        }
    };
}])
.directive('nestDirective', function () {
    return {
        restrict : 'E',
        scope : {
            name : '=',
            bindData : '='
        },
        template : '<p>{{nest_name}}</p> ',
        replace : true,
        link : {
            post : function (scope, iElem, iAttrs) {
                console.log('inside nest post link funciton');
                scope.nest_name = "nest_jacky";
                scope.$watch ("name", function() {
                    console.log("inside digest cycle");
                    scope.nest_name = scope.name;
                    // re-change data, this will caurse $digest to run forever
                    // https://docs.angularjs.org/error/$rootScope/infdig
                    // scope.bindData = {};
                    // scope.bindData.name = scope.nest_name + 1;
                    // need to comment out this 2 command to run.
                });
            }
        }
    };
});