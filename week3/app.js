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
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.title = "Sample menu";
  list.found = function (itemFind) {
      console.log("find process!");
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
    }).then(function(response, service.searchTerm) {
      var j = 0;
      console.log("response ", response);
      console.log("searchTerm: ", service.searchTerm);
      console.log("response data length: ", response.data.menu_items.length);
      var foundItems = [];
      foundItems[0] = "tri";
      console.log("foundItems ", foundItems[0]);
      foundItems[0].name = "name";
      console.log("foundItems ", foundItems[0].name);
      for (var i = 0; i < response.data.menu_items.length; i++) {
        var menuDesc = response.data.menu_items[i].description;
        if (menuDesc.toLowerCase().indexOf(service.searchTerm) !== -1) {
          foundItems[j].name = response.data.menu_items[i].name;
          foundItems[j].short_name = response.data.menu_items[i].short_name;
          foundItems[j].description = response.data.menu_items[i].description;
          j++;
        }
      }
      return foundItems;
    });
  };
}

})();
