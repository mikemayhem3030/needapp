angular.module('Need', ['ionic', 'Need.controllers', 'Need.services'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('auth', {
                url: "/auth",
                abstract: true,
                templateUrl: "templates/auth.html"
            })
            .state('auth.signin', {
                url: '/signin',
                views: {
                    'auth-signin': {
                        templateUrl: 'templates/auth-signin.html',
                        controller: 'SignInCtrl'
                    }
                }
            })
            .state('auth.signup', {
                url: '/signup',
                views: {
                    'auth-signup': {
                        templateUrl: 'templates/auth-signup.html',
                        controller: 'SignUpCtrl'
                    }
                }
            })
            .state('bucket', {
                url: "/bucket",
                abstract: true,
                templateUrl: "templates/bucket.html"
            })
            .state('bucket.list', {
                url: '/list',
                views: {
                    'bucket-list': {
                        templateUrl: 'templates/bucket-list.html',
                        controller: 'myListCtrl'
                    }
                }
            })
            .state('bucket.need', {
                url: '/need/:id',
                views: {
                    'bucket-list': {
                        templateUrl: 'templates/need.html',
                        controller: 'myNeedCtrl'
                    }
                }
            })
            .state('bucket.profile', {
                url: '/profile',
                views: {
                    'bucket-profile': {
                        templateUrl: 'templates/profile.html',
                        controller: 'myProfileCtrl'
                    }
                }
            })
            .state('bucket.settings',{
                url: '/settings',
                views: {
                    'bucket-settings':{
                        templateUrl: 'templates/settings.html',
                        controller: 'mySettingsCtrl'
                    }
                }
            })
            .state('bucket.messages', {
                url: '/messages',
                views: {
                    'bucket-messages': {
                        templateUrl: 'templates/messages.html',
                        controller: 'messagesCtrl'
                    }
                }
            })
        $urlRouterProvider.otherwise('/auth/signin');
    })

