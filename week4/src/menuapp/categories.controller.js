(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['categories'];
function CategoriesControllers(categories) {
  var categoriesList = this;
  categoriesList.categories = categories;
}

})();
