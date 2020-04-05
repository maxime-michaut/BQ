(function(){
    'use_strict';

    angular.module('app')
        .component('app', {
            controller: ComponentController,
            controllerAs: 'vm',
            templateUrl: 'js/components/app.component.html'
        });



    ComponentController.$inject = ['$scope'];
    function ComponentController($scope) {
        let vm = this;

        vm.$onInit = $onInit;
        vm.$postLink = $postLink;

        vm.gameData = {
            score: [12, 14], // ketchulp / mayo
            current_step_index: 0,
            steps: ['Les Nuggets', 'Le Sel ou Poivre', 'Les Menus', 'L\'addition'],
            ketchup_players: [
                {
                    name: 'maxime'
                }
            ],
            mayo_players: [
                {
                    name: 'bite'
                }
            ]
        }
        vm.teams = ['master', 'ketchup', 'mayo'];
        vm.user_model = {
            name: '',
            team: '',
        }
        vm.login = login;
        vm.nextStep = nextStep;

        function $postLink() {
            console.log('coucou');
        }
        function $onInit() {
            console.log('coucou');
        }


        var socket = io.connect('http://localhost:8080');


        function login() {
            console.log(socket.emit('login', vm.user_model));
            vm.user = angular.copy(vm.user_model);
            vm.user.index = 2;
        }
        vm.logout = logout;
        function logout() {
            socket.emit('logout', vm.user);
            vm.user = null;
        }

        function nextStep() {
            socket.emit('nextStep');
        }
        socket.on('updateGamedata', function(data) {
            console.log('data');
            console.log(data);
            $scope.$apply(function() {
                vm.gameData = data.gameData;
            });

        });
        // socket.emit('testWord', word);

    	socket.on('login', function(data){
            // console.log(data);
            console.log('login cb');
    	});
    }
})()
