(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['items']
function ItemsController(items) {
  var categoryItems = this;
  categoryItems.name = items.name;
  categoryItems.short_name = items.short_name;
  categoryItems.description = items.description;
  console.log("items ", items);
  console.log("categoryItems ", categoryItems);

}

})();
