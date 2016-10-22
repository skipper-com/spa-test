(function functionName() {
  "use strict"
  angular.module('public')
  .service('SharedDataService', SharedDataService);


  function SharedDataService() {
    var share = this;
    var Data = {
      user: {},
      item: {},
    };
    Data.user.registered = false;
    return Data;
  };
})()
