// var codeGen = angular.module('pokenameApp', []);

angular.module('app', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        var home = {
                name: 'home',
                url: '/',
                templateUrl: '/pokeapp/home.html'
            },
            red = {
                name: 'red',
                url: '/red',
                parent: home,
                templateUrl: 'content./pokeapp/home.'
            },
            blue = {
                name: 'blue',
                url: '/blue',
                parent: home,
                templateUrl: 'content.blue.html'
            },
            green = {
                name: 'green',
                url: '/green',
                parent: home,
                templateUrl: 'content.green.html'
            };

        $stateProvider.state(home);

    }])
    .run(['$state', function ($state) {
       $state.transitionTo('home');
    }])
