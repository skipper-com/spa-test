(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesDetail', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    categoryDetails: '<'
  }
});

})();
