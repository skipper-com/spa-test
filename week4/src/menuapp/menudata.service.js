(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);

function MenuDataService() {
  var service = this;

  service.getAllCategories = function () {
    console.log('getAllCategories');
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/categories.json")
    })};

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
    })
  }
};
})();
