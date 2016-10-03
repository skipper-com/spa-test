(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['details']
function ItemsController(details) {
  var categoryDetails = this;
  categoryDetails.shortName = details.shortName;
  categoryDetails.name = details.name;
  categoryDetails.description = details.description;
}

})();
