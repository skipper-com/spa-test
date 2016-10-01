(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['categories']
function ItemsController(categories) {
  var categoryDetail = this;
  categoryDetail.shortName = categories.shortName;
  categoryDetail.name = categories.name;
  categoryDetail.description = categories.description;
}

})();
