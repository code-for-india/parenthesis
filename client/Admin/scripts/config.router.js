'use strict';

angular.module('app')
  .run(
    [           '$rootScope', '$state', '$stateParams',
      function ( $rootScope,   $state,   $stateParams ) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
      function ( $stateProvider,   $urlRouterProvider,  MODULE_CONFIG ) {
        $urlRouterProvider
          .otherwise('/access/signin');
        $stateProvider
        .state('access', {
              url: '/access',
              template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
            })
            .state('access.signin', {
              url: '/signin',
              templateUrl: 'views/pages/signin.html'
            })
            .state('access.signup', {
              url: '/signup',
              templateUrl: 'views/pages/signup.html'
            })
            .state('access.forgot-password', {
              url: '/forgot-password',
              templateUrl: 'views/pages/forgot-password.html'
            })
            .state('access.signout', {
              url: '/signout',
              templateUrl: 'views/pages/signin.html',
              controller: 'LogoutCtrl'
            })
          .state('app', {
            abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: 'views/layout.html'
              },
              'aside': {
                templateUrl: 'views/aside.html'
              },
              'content': {
                templateUrl: 'views/content.html'
              }
            }
          })
            .state('app.dashboard', {
              url: '/dashboard',
              templateUrl: 'views/pages/dashboard.html',
              data : { title: 'Dashboard' },
              controller: 'DashboardCtrl',
              resolve: load(['scripts/controllers/chart.js'])
            })
            .state('app.item', {
              url: '/item',
              abstract: true,
              template: '<div ui-view></div>'
            })
            .state('app.item.list', {
              url: '/list',
              templateUrl: 'views/pages/items/items.html',
              data : { title: 'Items' },
              controller: 'ItemsCtrl'
            })
            .state('app.item.add', {
              url: '/add',
              templateUrl: 'views/pages/items/add.html',
              data : { title: 'Add Item' },
              controller: 'ItemCtrl'
            })
            .state('app.item.qrgenerator', {
              url: '/qrgenerate',
              templateUrl: 'views/pages/qrgenerate.html',
              data : { title: 'QR Generator' }
            })
            .state('app.item.edit', {
              url: '/edit',
              templateUrl: 'views/pages/items/edit.html',
              data : { title: 'Edit Item' }
            })
            .state('app.item.feedbacks', {
              url: '/feedbacks',
              templateUrl: 'views/pages/feedback/feedbacks.html',
              data : { title: 'Feedback List'}
            })
            .state('app.user', {
              url: '/user',
              abstract: true,
              template: '<div ui-view></div>'
            })
            .state('app.user.list', {
              url: '/list',
              templateUrl: 'views/pages/blank.html',
              data : { title: 'Users' }
            })
            .state('app.user.add', {
              url: '/add',
              templateUrl: 'views/pages/users/add.html',
              data : { title: 'Add User' }
            })
            .state('app.user.edit', {
              url: '/edit',
              templateUrl: 'views/pages/blank.html',
              data : { title: 'Edit User' }
            })
            .state('app.user.delete', {
              url: '/delete',
              templateUrl: 'views/pages/blank.html',
              data : { title: 'Delete User'}
            })
            .state('app.qr', {
              url: '/qr',
              abstract: true,
              template: '<div ui-view></div>'
            })
            .state('app.qr.generator', {
              url: '/generate',
              templateUrl: 'views/pages/qrgenerate.html',
              data : { title: 'QR Generator' }
            });
          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            if(!module.module){
                              name = module.files;
                            }else{
                              name = module.name;
                            }
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }
      }
    ]
  );
