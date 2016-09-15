(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
    $scope.itemEvaluate = function () {
      if (typeof $scope.itemString != 'undefined') {
        $scope.itemsArray = $scope.itemString.split(",");
        for (var i = 0; i < $scope.itemsArray.length - 1; i++) {
          if ($scope.itemsArray[i].trim() === "") {
            $scope.itemsArray.splice(i, 1);
          }
        }
        if  ($scope.itemsArray.length === 1 && $scope.itemsArray[0] === "") {
          $scope.text = "Please enter data first!!";
        } else if ($scope.itemsArray.length <= 3) {
          $scope.text = "Enjoy!";
        } else {
          $scope.text = "Too much!";
        }
      } else {
        $scope.text = "Please enter data first";
      }
    }

}})();
