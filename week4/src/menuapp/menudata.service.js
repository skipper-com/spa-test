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
      console.log(response);
      console.log(response.data.length);
      console.log(response.data[0].name);
      var categories = [];
      for (var i = 0; i < response.data.length; i++) {
        categories.push({
            name: response.data[i].name,
            short_name: response.data[i].short_name,
            description: response.data[i].description
          });
        }
        console.log(categories[0].name);
      return "hello";
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
    })
  }
};
})();
