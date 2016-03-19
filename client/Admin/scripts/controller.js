app.controller('LoginCtrl', ['$scope', '$localStorage', '$rootScope','$http', '$location','$rootScope', function($rootScope, $localStorage, $scope, $http, $location,$rootScope) {
	$scope.login = function(logindata){
        console.log(logindata);
		$http.post('http://cfi-nivesh2.c9users.io/authenticate', {data:logindata}).
		success(function(data, status, headers, config) {
            console.log(data);
            if(data.success){
                // save token to local storage
                $rootScope.cfiApiToken = data.token;
                $localStorage.cfiToken = $rootScope.cfiApiToken;
                //$scope.app.setting.cfiApiToken = data.token;
                console.log($localStorage.cfiToken);
                console.log($rootScope.cfiApiToken);
                $location.path('/app/dashboard');
            } else{
                $rootScope.cfiApiToken = "";
                $location.path('/');
            }
		}).
		error(function(data, status, headers, config) {
            console.log(data);
            $location.path('/');
		});
	};
}]);

app.controller('ItemCtrl', ['$scope', '$rootScope','$http', '$location','$rootScope', function($rootScope, $scope, $http, $location,$rootScope) {
	$scope.add = function(item){
        form.apiToken = $rootScope.cfiApiToken;
		$http({
             method: 'POST',
             url: 'http://cfi-nivesh2.c9users.io/api/v1/item/add',
             headers: {
               'x-access-token': form.apiToken
             },
             data: {
                 data: item
             }
        }).
		success(function(data, status, headers, config) {
            console.log(data);
            if(data.success===1){  
                $scope.qrUrl = "http://feedback.somprabhsharma.com?item="+item.itemId;
                $location.path('/app/item/qrgenerate');
            } else if(data.success===0){
                $scope.error = "some error occured, please try again";
                $location.path('/app/item/add');
            } else if(data.success===3){
                $location.path('/');
            } 
		}).
		error(function(data, status, headers, config) {
            console.log(data);
            $location.path('/');
		});
	};
    $scope.getPDF = function(selector) {
        kendo.drawing.drawDOM($(selector)).then(function(group){
          kendo.drawing.pdf.saveAs(group, "qrcode.pdf");
        });
      }
}]);
app.controller('ItemsCtrl', ['$scope', '$rootScope','$http', '$location','$rootScope', function($rootScope, $scope, $http, $location,$rootScope) {
    $scope.items = [];
    $scope.error = "";
    $scope.list = function(){
		$http({
             method: 'GET',
             url: 'http://cfi-nivesh2.c9users.io/api/v1/item/searchAll',
             headers: {
               'x-access-token': $rootScope.cfiApiToken
             }
        }).
		success(function(data, status, headers, config) {
            console.log(data);
            if(data.success===1){
                $scope.items = data.data;
            } else if(data.success===0){
                $scope.error = "some error";
            } else if(data.success===3){
                $location.path('/');
            } 
		}).
		error(function(data, status, headers, config) {
            console.log(data);
            $location.path('/');
		});
	};
    $scope.list();
    $scope.item = {};
    $scope.edit = function(item){
        console.log(item);
        $scope.item = angular.copy(item);
        $location.path('/app/item/edit');
    };
    $scope.delete = function(itemId){
		$http({
             method: 'GET',
             url: 'http://cfi-nivesh2.c9users.io/api/v1/item/delete/'+itemId,
             headers: {
               'x-access-token': $rootScope.cfiApiToken
             }
        }).
		success(function(data, status, headers, config) {
            console.log(data);
            if(data.success===1){
                $scope.msg = "Item Successfully Deleted!";
                //TOFIX: write js code for instant update.
                $scope.list;
                $location.path('/app/item/list');
            } else if(data.success===0){
                $scope.error = "Some Error Occured, Please try again!";
                $location.path('/app/item/list');
            } else if(data.success===3){
                $location.path('/');
            } 
		}).
		error(function(data, status, headers, config) {
            console.log(data);
            $location.path('/');
		});
	};
    $scope.update = function(item){
		$http({
             method: 'POST',
             url: 'http://cfi-nivesh2.c9users.io/api/v1/item/update',
             headers: {
               'x-access-token': $rootScope.cfiApiToken
             },
             data: {
                 data : item
             }
        }).
		success(function(data, status, headers, config) {
            console.log(data);
            //console.log($scope.app.setting.cfiApiToken);
            if(data.success===1){
                $scope.msg = "Item Successfully Updated!";
                //TOFIX: write js code for instant update.
                $scope.list();
                $location.path('/app/item/list');
            } else if(data.success===0){
                $scope.error = "Some Error Occured, Please try again!";
                $location.path('/app/item/list');
            } else if(data.success===3){
                $location.path('/');
            } 
		}).
		error(function(data, status, headers, config) {
            console.log(data);
            $location.path('/');
		});
	};
    $scope.viewFeedback = function(itemId){
		$http({
             method: 'GET',
             url: 'http://cfi-nivesh2.c9users.io/api/v2/item/searchById/'+itemId,
             headers: {
               'x-access-token': $rootScope.cfiApiToken
             }
        }).
		success(function(data, status, headers, config) {
            if(data.success===1){
                $scope.itemDetails = data.data;
                console.log(data.data);
                $location.path('/app/item/feedbacks');
            } else if(data.success===0){
                $scope.error = "Some Error Occured, Please try again!";
                $location.path('/app/item/list');
            } else if(data.success===3){
                $location.path('/');
            } 
		}).
		error(function(data, status, headers, config) {
            console.log(data);
            $location.path('/');
		});
	};
}]);

app.controller('LogoutCtrl', ['$scope', '$localStorage', '$rootScope','$http', '$location','$rootScope', function($rootScope, $localStorage, $scope, $http, $location,$rootScope) {
		$rootScope.cfiApiToken = "";
        $localStorage.cfiToken = "";
        $rootScope.itemFeedback = [];
}]);

app.controller('DashboardCtrl', ['socket', '$scope', '$rootScope','$http', '$location','$rootScope', function(socket,$scope,$rootScope,  $http, $location,$rootScope) {
    if ( angular.isDefined($rootScope.itemFeedback) ) {
        console.log("already"+$rootScope.itemFeedback);
    } else {
        $rootScope.itemFeedback = [];
    } 
    console.log($rootScope.itemFeedback);
	$scope.itemFeedback = $rootScope.itemFeedback.slice();
    console.log("scope only"+$scope.itemFeedback);
    socket.on("firstPush",function(message){
        console.log(message);
       for (i = 0; i < message.length; i++) { 
           $rootScope.itemFeedback.push(message[i]);
       }
        $scope.itemFeedback = $rootScope.itemFeedback.slice();
    });
    socket.on("newPush",function(message){
        console.log(message);
        $rootScope.itemFeedback.push(message);
        $scope.itemFeedback = $rootScope.itemFeedback.slice();
    });
    $scope.ratings = [];
    $scope.error = "";
               
    $scope.rate = function(){
		$http({
             method: 'GET',
             url: 'http://cfi-nivesh2.c9users.io/api/v2/item/rating',
             headers: {
               'x-access-token': $rootScope.cfiApiToken
             }
        }).
		success(function(data, status, headers, config) {
            console.log(data);
            if(data.success===1){
                $scope.ratings = data.data;
                $scope.totalRatings = data.data.total;  
                $scope.pieLabel = [];
                $scope.pieData = [];
                for(i=0;i<$scope.ratings.length;i++){
                    $scope.pieLabel.push($scope.ratings[i].city);
                    $scope.pieData.push($scope.ratings[i].feedback_count);
                }
            } else if(data.success===0){
                $scope.error = "some error";
            } else if(data.success===3){
                $location.path('/');
            } 
		}).
		error(function(data, status, headers, config) {
            console.log(data);
            $location.path('/');
		});
	};
    $scope.rate();    
}]);