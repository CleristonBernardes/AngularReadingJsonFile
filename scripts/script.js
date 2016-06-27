var CampaignMonitorApp = angular.module('CampaignMonitorApp', []);

// create the controller and inject Angular's $scope
CampaignMonitorApp.controller('IssueController', ['ReadInfoFactory', '$scope', function (ReadInfoFactory, $scope) {

    $scope.result;
    $scope.hasValue = true;
    $scope.loadingService = false;
    
    $scope.LoadData = function () {

        $scope.loadingService = true;
        var now = new Date().getTime();
        while (new Date().getTime() < now + 1000) { /* do nothing */ }; //loading..

        ReadInfoFactory.getMainInfo().then(function (response) {

            $scope.result = response.data;
            $scope.hasValue = (response.data.length > 0);
        })
        .finally(function () {
            $scope.loadingService = false;
        });
    }

    $scope.CleanData = function () {
        $scope.result = undefined;
        $scope.hasValue = false;
    }

    $scope.GetDateDifference = function(inputDate) {

        var temp = inputDate.split(" ");
        var data = temp[0].split("-");
        var time = temp[1];
        var formatInput = data[1] + "/" + data[2] + "/" + data[0] + " " + time;

        var startTime = new Date();
        var endTime = new Date(formatInput);
        var resultInSeconds = Math.abs(endTime.getTime() - startTime.getTime()) / 1000;
        
        if (resultInSeconds < 60)
        {
            return resultInSeconds + " seconds";
        }
        else
        {
            var resultInMinutes = Math.round(resultInSeconds / 60);
            if (resultInMinutes < 60) {
                return resultInMinutes + " minutes";
            }
            else {
                var resultInHours = Math.round(resultInMinutes / 60);
                if (resultInHours < 24) {
                    return resultInHours + " hours";
                }
                else {
                    return Math.round(resultInHours / 24) + " days";
                }
            }
        }
        

    }
    

}]);

CampaignMonitorApp.factory('ReadInfoFactory', ['$http', function ($http) {


    var mainInfo = $http.get('data/test.json').success(function (response) {
        return response;
    }).error(function (error, status) {
        alert(error + ", " + status);
    });

    var factory = {};
    factory.getMainInfo = function () {

        return mainInfo;
    };

    return factory; 
}]);



