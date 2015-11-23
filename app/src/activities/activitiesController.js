angular
        .module('openeApp.activities')
        .controller('activitiesController', activitiesController);
    
    function activitiesController(activitiesService){
        var vm = this;
        
        activitiesService.getUserActivities().then(function(result){
            angular.forEach(result, function(activity, key) {
                activity.activitySummary = angular.fromJson(activity.activitySummary);
            });
            vm.activities = result;
            if(result.length > 0 ){
                activitiesService.setCurrentUserLastReadActivityFeedId(result[0].id);
            }
        });
    }