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
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
    }).then(function(response) {
      console.log("response ", response);
      var categoryDetails = [];
      for (var i = 0; i < response.data.length; i++) {
        categoryDetails.push({
            name: response.data[i].name,
            short_name: response.data[i].short_name,
            description: response.data[i].description,
          });
        }
      return categoryDetails;
    })
  }
};
})();
