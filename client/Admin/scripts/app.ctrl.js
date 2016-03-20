'use strict';

angular.module('app')  
  .controller('AppCtrl', ['$scope', '$localStorage', '$window', '$document', '$location', '$rootScope', '$timeout', '$mdSidenav', '$mdColorPalette', '$anchorScroll',
    function (             $scope, $localStorage,   $window,   $document,   $location,   $rootScope,   $timeout,   $mdSidenav,   $mdColorPalette,   $anchorScroll ) {
      var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
      $scope.app = {
        name: 'Monitoring System',
        version: '1.0.2',
        // for chart colors
        color: {
          primary: '#3f51b5',
          info:    '#2196f3',
          success: '#4caf50',
          warning: '#ffc107',
          danger:  '#f44336',
          accent:  '#7e57c2',
          white:   '#ffffff',
          light:   '#f1f2f3',
          dark:    '#475069'
        },
        setting: {
          theme: {
            primary: 'indigo',
            accent: 'purple',
            warn: 'amber'
          },
          asideFolded: false
        }
      }

      $scope.setTheme = function(theme){
        $scope.app.setting.theme = theme;
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.appSetting) ) {
        $scope.app.setting = $localStorage.appSetting;
      } else {
        $localStorage.appSetting = $scope.app.setting;
      }
      $scope.$watch('app.setting', function(){
        $localStorage.appSetting = $scope.app.setting;
      }, true);
      
      
      function isSmartDevice( $window ) {
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      };

      $scope.getColor = function(color, hue){
        if(color == "bg-dark" || color == "bg-white") return $scope.app.color[ color.substr(3, color.length) ];
        return rgb2hex($mdColorPalette[color][hue]['value']);
      }

      //Function to convert hex format to a rgb color
      function rgb2hex(rgb) {
        return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
      }

      function hex(x) {
        var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
      }

      $rootScope.$on('$stateChangeSuccess', openPage);

      function openPage() {
          if ( angular.isDefined($localStorage.cfiToken) ) {
              console.log("apptoken:"+$localStorage.cfiToken);
              if($localStorage.cfiToken===""){
                  $rootScope.cfiApiToken = "";
                  $scope.closeAside();
                  $anchorScroll();
                  $location.path('/');
              } else {
                  $rootScope.cfiApiToken = $localStorage.cfiToken;
                    $scope.closeAside();
                // goto top
                    $location.hash('view');
                    $anchorScroll();
                    $location.hash('');
              }
            
          } else {
            $rootScope.cfiApiToken = "";
            $location.path('/');
          }
          $rootScope.$watch('cfiApiToken', function(){
            $localStorage.cfiToken = $rootScope.cfiApiToken;
          }, true);
      }

      $scope.goBack = function () {
        $window.history.back();
      }

      $scope.openAside = function () {
        $timeout(function() { $mdSidenav('aside').open(); });
      }
      $scope.closeAside = function () {
        $timeout(function() { $document.find('#aside').length && $mdSidenav('aside').close(); });
      }

    }
  ]);
