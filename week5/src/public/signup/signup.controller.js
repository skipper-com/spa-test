(function () {
  "use strict"

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope', 'SharedDataService', 'MenuService'];
  function SignupController($scope, SharedDataService, MenuService) {
    var $ctrl = this;
    $scope.Data = SharedDataService;
    $ctrl.submit = function () {
      $ctrl.user.registered = true;
      $scope.Data.user = $ctrl.user;
      $ctrl.completed = true;
    };

    $ctrl.checkShortName = function (short_name) {
      var promise = MenuService.checkShortName(short_name);
      promise.then(function (response) {
        if (response.status === 200) {
          $ctrl.noSuchMenuNumber = false;
        } else {
          $ctrl.completed = false;
          $ctrl.noSuchMenuNumber = true;
        }
      });
    };
  }
})();
