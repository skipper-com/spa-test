(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['items']
function ItemsController(items) {
  var categoryItems = this;
  categoryItems.items = items;
  console.log("items ", items);
  console.log("categoryItems ", categoryItems.items);
}

})();
