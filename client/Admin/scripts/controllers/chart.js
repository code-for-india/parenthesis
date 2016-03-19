app.controller('ChartCtrl', ['$scope', function($scope) {
  $scope.plot_pie = [];
    
  var labelPie = ['Delhi','Noida','Ghaziabad','Gurgaon','Faridabad'];
    
  for (var i = 0; i < labelPie.length; i++) {
    $scope.plot_pie[i] = {
      label: labelPie[i],
      data: Math.floor(Math.random() * 100) + 1
    }
  }

}]);
