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
    }).then(function(response, searchItem) {
      var j = 0;
      console.log("searchItem: ", searchItem);
      console.log("response data length: ", response.data.length);
      console.log("response menu_items length: ", response.menu_items.length);
      for (var i = 0; i < response.data.length; i++) {
        var menuDesc = response.data[i].description;
        if (menuDesc.toLowerCase().indexOf("searchTerm") === -1) {
          foundItems.push(menuDesc, j);
          j++;
        }
      }
      return foundItems;
    });
  };
}

})();
