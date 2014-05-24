angular.module('Need.services', [])

    .factory('LocationService', function($q) {
        
        var latLong = null;
        
        var getLatLong = function(refresh) {
            
            var deferred = $q.defer();
            
            if( latLong === null || refresh ) {
            
                console.log('Getting lat long');
                navigator.geolocation.getCurrentPosition(function(pos) {
                    console.log('Position=')
                    console.log(pos);
                    latLong =  { 'lat' : pos.coords.latitude, 'lng' : pos.coords.longitude } 
                    deferred.resolve(latLong);

                }, function(error) {
                    console.log('Got error!');
                    console.log(error);
                    latLong = null
                    
                    deferred.reject('Failed to Get Lat Long')

                });
                
            }  else {
                deferred.resolve(latLong);
            }
            
            return deferred.promise;

        };      
        
        return {
            
            getLatLong : getLatLong
            
        }
    })

    .factory('Settings', function ($rootScope){
            $rootScope.settings = {
                distance: 10,
            };
    })

    .factory('API', function ($rootScope, $http, $ionicLoading, $window) {
        
    var base = "http://needappuk.herokuapp.com";
        $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 100
            });
        };

        $rootScope.hide = function () {
            $rootScope.loading.hide();
        };

        $rootScope.logout = function () {
            $rootScope.setToken("");
            $window.location.href = '#/auth/signin';
        };

        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 1999);
        };

        $rootScope.doRefresh = function (tab) {
            if(tab == 1)
                $rootScope.$broadcast('fetchAll');
            else if(tab == 2)
                $rootScope.$broadcast('fetchMine');
            else
                $rootScope.$broadcast('fetchCompleted');
            
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $rootScope.setToken = function (token) {
            return $window.localStorage.token = token;
        }

        $rootScope.getToken = function () {
            return $window.localStorage.token;
        }

        $rootScope.isSessionActive = function () {
            return $window.localStorage.token ? true : false;
        }

        return {
            signin: function (form) {
                return $http.post(base+'/api/v1/bucketList/auth/login', form);
            },
            signup: function (form) {
                return $http.post(base+'/api/v1/bucketList/auth/register', form);
            },

            getAll: function (email,lng,lat,dis) {
                return $http.get(base+'/api/v1/bucketList/data/list', {
                    method: 'GET',
                    params: {
                        token: email,
                        lng: lng,
                        lat: lat,
                        dis: dis
                    }
                });
            },

            getMine: function(email){
                return $http.get(base+'/api/v1/bucketList/data/profile',{
                    method: 'GET',
                    params: {
                        token: email
                    }
                })
            },

            getOne: function (id, email) {
                return $http.get(base+'/api/v1/bucketList/data/item/' + id, {
                    method: 'GET',
                    params: {
                        token: email,
                    }
                });
            },
            saveItem: function (form, email) {
                return $http.post(base+'/api/v1/bucketList/data/item', form, {
                    method: 'POST',
                    params: {
                        token: email
                    }
                });
            },
            putItem: function (id, form, email) {
                return $http.put(base+'/api/v1/bucketList/data/item/' + id, form, {
                    method: 'PUT',
                    params: {
                        token: email
                    }
                });
            },
            deleteItem: function (id, email) {
                return $http.delete(base+'/api/v1/bucketList/data/item/' + id, {
                    method: 'DELETE',
                    params: {
                        token: email
                    }
                });
            }
        }
    });