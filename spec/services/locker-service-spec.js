;(function(){
  describe('Service: LockerService', function(){
    var service;

    beforeEach(module('VegasLocker3000'));
    beforeEach(inject(function(LockerService){
      service = LockerService;
    }));

    describe('#getLockers', function(){
      it('should return expected object', function(){
        expect(_.keys(service.getLockers()).sort()).toEqual(['large', 'medium', 'small']);
      });
    });

    describe('#getBag', function(){
      it('should return false if ticket not found', function(){
        expect(service.getBag('call_of_duty')).toBe(undefined);
      });

      it('should return expected bag', function(){
        service.addBag(0, {name: 'test'});
        expect(service.getBag('s0')).toEqual({size: 0, info: {name: 'test'}});
      });

      it('should set nextOpening on locker', function(){
        service.addBag(0, {name: 'test'});
        service.addBag(0, {name: 'test'});
        service.addBag(0, {name: 'test'});
        service.getBag('s0');
        expect(service.getLockers().small.nextOpening).toEqual(0);
        service.addBag(0, {name: 'test'});
        service.getBag('s1');
        expect(service.getLockers().small.nextOpening).toEqual(1);
      });

      it('should set decrement inUse on locker', function(){
        service.addBag(0, {name: 'test'});
        service.addBag(0, {name: 'test'});
        service.addBag(0, {name: 'test'});
        service.getBag('s0');
        expect(service.getLockers().small.inUse).toEqual(2);
      });
    });

    describe('#addBag', function(){
      it('should return false if size is invalid', function(){
        expect(service.addBag('black ops', '3')).toBe(undefined);
      });

      it('should return ticket information', function(){
        var result = service.addBag(0, {name: 'test'});
        expect(result).toEqual({ticket: 's0', slot_index: 0, size: 'small'});
      });

      it('should set nextOpening on locker', function(){
        service.addBag(0, {name: 'test'});
        service.addBag(0, {name: 'test'});
        service.addBag(0, {name: 'test'});
        expect(service.getLockers().small.nextOpening).toEqual(3);
      });

      it('should add bag to bigger locker if locker not available for bag size', function(){
        var final_result;
        _(2001).times(function(){
          final_result = service.addBag(0, {name: 'test'});
        });

        expect(final_result.size).toEqual('large');
      });
    });

  });
})();
