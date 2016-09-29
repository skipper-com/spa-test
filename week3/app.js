(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.component('itemsLoaderIndicator', {
  templateUrl: 'loader/itemsloaderindicator.template.html',
  controller: SpinnerController
})
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      title: '@title',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
  var $ctrl = this;

  var cancelListener = $rootScope.$on('shoppinglist:processing', function (event, data) {
    console.log("Event: ", event);
    console.log("Data: ", data);

    if (data.on) {
      $ctrl.showSpinner = true;
    }
    else {
      $ctrl.showSpinner = false;
    }
  });

  $ctrl.$onDestroy = function () {
    cancelListener();
  };

};

NarrowItDownController.$inject = ['$rootScope', 'MenuSearchService'];
function NarrowItDownController($rootScope, MenuSearchService) {
  var list = this;
  list.title = "Sample menu";
  list.find = function (itemFind) {
    $rootScope.$broadcast('shoppinglist:processing', {on: true});
    var promise = MenuSearchService.getMatchedMenuItems(itemFind);
    promise.then(function (response) {
        list.found = response;
    })
    .finally(function () {
      $rootScope.$broadcast('shoppinglist:processing', { on: false });
    });
  };

  list.removeItem = function (itemIndex) {
      list.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    service.searchTerm = searchTerm;
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(response) {
      var foundItems = [];
      if (service.searchTerm !== "") {
        for (var i = 0; i < response.data.menu_items.length; i++) {
          var menuDesc = response.data.menu_items[i].description;
          if (menuDesc.toLowerCase().indexOf(service.searchTerm) !== -1) {
            foundItems.push({
              name: response.data.menu_items[i].name,
              short_name: response.data.menu_items[i].short_name,
              description: response.data.menu_items[i].description
            });
          }
        }
      };
      return foundItems;
    });
  };
}

})();
