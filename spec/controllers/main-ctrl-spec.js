;(function(){
  describe('Controller: MainCtrl', function(){
    var scope, controller, service, win;

    beforeEach(module('VegasLocker3000'));
    beforeEach(inject(function($rootScope, $controller, LockerService, $window){
      scope = $rootScope.$new();
      win   = $window;
      spyOn(win, 'alert').and.stub();
      service    = LockerService;
      controller = $controller('MainCtrl', {
        '$scope':      scope,
        LockerService: service,
        '$window':     win
      });
    }));

    describe('when $scope.addBag successfully called', function(){
      beforeEach(function(){
        spyOn(service, "addBag").and.returnValue({size: 'large', slot_index: 1, ticket: 'l1'});
        scope.info.customer_name = 'amazing';
        scope.addBag();
      });

      it('should show message with locker and ticket info', function(){
        expect(win.alert).toHaveBeenCalledWith("Bag added to locker: large 1\nTicket is: l1");
      });

      it('should reset $scope.info.customer_name', function(){
        expect(scope.info.customer_name).toBe('');
      });
    });

    describe('when $scope.addBag NOT successfully called', function(){
      beforeEach(function(){
        spyOn(service, "addBag").and.returnValue(false);
        scope.info.customer_name = 'amazing';
        scope.addBag();
      });

      it('should show expected error message', function(){
        expect(win.alert).toHaveBeenCalledWith("Sorry no lockers available");
      });

      it('should reset $scope.info.customer_name', function(){
        expect(scope.info.customer_name).toBe('');
      });
    });

    describe('when $scope.retrieveBag successfully called', function(){
      beforeEach(function(){
        spyOn(service, "getBag").and.returnValue({size: 'large', info: {name: 'awesome'}});
        scope.info.ticket = '2345';
        scope.retrieveBag();
      });

      it('should show message with found bag and info', function(){
        expect(win.alert).toHaveBeenCalledWith('large retrieved for awesome');
      });

      it('should reset $scope.info.ticket', function(){
        expect(scope.info.ticket).toBe('');
      });
    });

    describe('when $scope.retrieveBag NOT successfully called', function(){
      beforeEach(function(){
        spyOn(service, "getBag").and.returnValue(false);
        scope.info.ticket = '2345';
        scope.retrieveBag();
      });

      it('should show not found error', function(){
        expect(win.alert).toHaveBeenCalledWith('2345 not found');
      });

      it('should NOT reset $scope.info.ticket', function(){
        expect(scope.info.ticket).toBe('2345');
      });
    });

    describe('when setNewBagSize called', function(){
      beforeEach(function(){
        spyOn(scope, 'setNewBagSize').and.callThrough();
        scope.setNewBagSize(2);
      });

      it('should set $scope.newBagSize to 2', function(){
        expect(scope.newBagSize).toBe(2);
      });
    });


  });
})();