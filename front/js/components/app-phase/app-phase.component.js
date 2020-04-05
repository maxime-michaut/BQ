(function(){
    'use_strict';

    angular.module('app')
        .component('component', {
            controller: ComponentController,
            controllerAs: 'vm',
            templateUrl: 'app/components/component.html',
            bindings: {
              removeComponent: '&',
              inputList: '<',
              componentIndex: '<',
              component: '<',
              components: '<',
              addWaitingItemParent: '&',
              enableTransferInParent: '&'
            }
        });



    ComponentController.$inject = [];
    function ComponentController() {

    }
})()
