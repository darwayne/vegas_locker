;(function(app){
  app.controller('MainCtrl', function($scope, LockerService, $window){
    angular.extend($scope, {
      info: {
        customer_name: '',
        ticket: ''
      },
      newBagSize: 0,
      setNewBagSize: function(size){
        $scope.newBagSize = size;
        console.log('bag size set to ', size);
      },
      addBag: function(){
        var info                  = LockerService.addBag($scope.newBagSize, {name: $scope.info.customer_name});
        $scope.info.customer_name = '';
        if(info){
          $window.alert(
            'Bag added to locker: ' + info.size + ' ' + info.slot_index +
            "\nTicket is: " + info.ticket
          );
        }
        else
        {
          $window.alert('Sorry no lockers available');
        }
      },
      retrieveBag: function(){
        var ticket         = $scope.info.ticket;
        $scope.info.ticket = '';
        var bag_info       = LockerService.getBag(ticket);
        if(bag_info){
          $window.alert(bag_info.size + ' retrieved for ' + bag_info.info.name);
        }
      }
    });
  });
})(VegasApp);