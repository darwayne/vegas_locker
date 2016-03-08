;(function(app){
  app.service('LockerService', function(){
    var MAX_LOCKER_SIZE = 1000;
    var lockers         = {
      small: {
        slots:       new Array(MAX_LOCKER_SIZE),
        nextOpening: 0,
        inUse:       0
      },
      medium:  {
        slots:       new Array(MAX_LOCKER_SIZE),
        nextOpening: 0,
        inUse:       0
      },
      large:  {
        slots:       new Array(MAX_LOCKER_SIZE),
        nextOpening: 0,
        inUse:       0
      },
    };
    var SIZE_MAP     = ['small', 'medium', 'large'];
    var TICKET_MAP   = {s: 'small', m: 'medium', l: 'large'};
    var TICKET_REGEX = /^([sml])(\d{1,4})$/;

    angular.extend(this, {
      getLockers: function(){
        return lockers;
      },
      getNextAvailableLocker: function(size){
        var lockers = this.getLockers();
        for(var i = size; i < 3; i++){
          if(lockers[SIZE_MAP[i]].nextOpening > -1){
            return {
              locker: lockers[SIZE_MAP[i]],
              size: SIZE_MAP[i]
            };
          }
        }
      },
      addBag: function(size, customer_info){
        if(_.includes([0,1,2], size)){
          var available = this.getNextAvailableLocker(size);
          if(available){
            available.locker.inUse++;
            var slot_index                     = available.locker.nextOpening;
            available.locker.slots[slot_index] = {size: size, info: customer_info};
            
            if(available.locker.inUse >= MAX_LOCKER_SIZE){
              available.locker.nextOpening = -1;
            }
            else
            {
              for(var i = slot_index; i < MAX_LOCKER_SIZE; i++){
                if(!available.locker.slots[i]){
                  available.locker.nextOpening = i;
                  break;
                }
              }
            }

            return {
              ticket: available.size.charAt(0) + slot_index,
              slot_index: slot_index,
              size: available.size
            };
          }
        }
      },
      getBag: function(ticket){
        var ticket_info = String(ticket).match(TICKET_REGEX);
        if(ticket_info){
          var locker_type = TICKET_MAP[ticket_info[1]];
          var slot_index  = Number(ticket_info[2]);
          var locker      = this.getLockers()[locker_type];
          if(locker.slots[slot_index]){
            var bag                  = locker.slots[slot_index];
            locker.slots[slot_index] = undefined;
            if(slot_index < locker.nextOpening){
              locker.nextOpening = slot_index;
            }
            locker.inUse--;
            return bag;
          }
        }
      }
    });
  });
})(VegasApp);
