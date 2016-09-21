(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  toBuy.transferItem = function (itemIndex) {
    ShoppingListCheckOffService.transferItem(itemIndex);
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var bougthList = this;
  bougthList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
    { name: "cookies", quantity: 10 },
    { name: "apples", quantity: 9 },
    { name: "banana", quantity: 8 },
    { name: "peaches", quantity: 7 },
    { name: "coke", quantity: 6 },
  ];
  var itemsBought = [];

  service.transferItem = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return itemsToBuy;
  };
  service.getBoughtItems = function () {
    return itemsBought;
  };
}

})();
