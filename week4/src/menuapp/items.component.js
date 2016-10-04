(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesDetails', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
