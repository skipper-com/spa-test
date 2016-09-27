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
    var foundItems = [];
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(response) {
      var j = 0;
      for (var i = 0; i < response.data.length; i++) {
        var menuItem = response.data[i].name;
        if (menuItem.toLowerCase().indexOf("searchTerm") === -1) {
          foundItems.push(menuItem, j);
          j++;
        }
      }
      return foundItems;
    });
  };
}

})();
