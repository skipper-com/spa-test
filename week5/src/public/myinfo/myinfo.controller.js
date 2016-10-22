(function () {
  "use strict"

  angular.module('public')
  .controller('MyinfoController', MyinfoController);

  MyinfoController.$inject = ['$scope', 'SharedDataService', 'MenuService', 'ApiPath'];
  function MyinfoController($scope, SharedDataService, MenuService, ApiPath) {
    var $ctrl = this;
    $scope.Data = SharedDataService;
    $ctrl.user = $scope.Data.user;
    $ctrl.basePath = ApiPath;
    console.log("$ctrl.item", $ctrl);
    var promise = MenuService.checkShortName($scope.Data.user.short_name);
    promise.then(function (response) {
      if (response.status === 200) {
        $ctrl.item = response.data;
        $scope.Data.item = $ctrl.item;
        console.log("$scope.Data", $scope.Data);

      } else {
        $scope.Data.user.registered = false;
      }
    });
  };
})();
