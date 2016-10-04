(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['items']
function ItemsController(items) {
  var categoryItems = this;
  categoryItems.items = items;
}

})();
