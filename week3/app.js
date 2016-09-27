(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}
function NarrowItDownDirectiveController () {
  var list = this;

  list.itemInList = function () {
    
  }

}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.title = "Sample menu";
  list.found = function (itemFind) {
      MenuSearchService.getMatchedMenuItems(itemFind);
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
      console.log("foundItems ", foundItems);
      return foundItems;
    });
  };
}

})();
