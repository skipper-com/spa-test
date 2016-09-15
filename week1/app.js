(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
    $scope.itemEvaluate = function () {
      if (typeof $scope.itemString != 'undefined') {
        $scope.itemsArray = $scope.itemString.split(",");
        for (var i = 0; i < $scope.itemsArray.length - 1; i++) { // <!--replace empty item, i.e., `, ,` as an item towards to the count,-->
          if ($scope.itemsArray[i].trim() === "") {
            $scope.itemsArray.splice(i, 1);
          }
        }

        if  ($scope.itemsArray.length === 1 && $scope.itemsArray[0] === "") {
          $scope.text = "Please enter data first!!";
          $scope.input_border = "red_border";
          $scope.text_color = "red_text";
        } else if ($scope.itemsArray.length <= 3) {
          $scope.text = "Enjoy!";
          $scope.input_border = "green_border";
          $scope.text_color = "green_text";
        } else {
          $scope.text = "Too much!";
          $scope.input_border = "green_border";
          $scope.text_color = "green_text";
        }
      } else {
        $scope.text = "Please enter data first";
        $scope.input_border = "red_border";
        $scope.text_color = "red_text";
      }
    }

}})();
