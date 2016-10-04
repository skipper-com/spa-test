(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/categories.json")
    }).then(function(response) {
      var categories = [];
      for (var i = 0; i < response.data.length; i++) {
        categories.push({
            name: response.data[i].name,
            short_name: response.data[i].short_name,
          });
        }
      return categories;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    console.log("short_name ", categoryShortName);
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
    }).then(function(response) {
      console.log("response data length", response.data.length);
      console.log("response data menu_item", response.data.menu_items[0].name);
      var categoryDetails = [];
      for (var i = 0; i < response.data.length; i++) {
        categoryDetails.push({
            name: response.data.menu_items[i].name,
            short_name: response.data.menu_items[i].short_name,
            description: response.data.menu_items[i].description,
          });
        }
      return categoryDetails;
    })
  }
};
})();
