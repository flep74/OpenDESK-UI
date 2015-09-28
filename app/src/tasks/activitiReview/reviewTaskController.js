(function(){

    
    angular.module('openeApp.activitiReview.tasks')
        .controller('reviewTaskController', reviewTaskController);
    
    reviewTaskController.$inject = ['$controller'];
    
    function reviewTaskController($controller) {
        angular.extend(this, $controller('baseTaskController', {}));
        var vm = this;
        
        init();
        
        function init(){
            vm.init();
            vm.reviewOutcomeProperty = 'wf_reviewOutcome';
            vm.reviewOutcomeApprove = 'Approve';
            vm.reviewOutcomeReject = 'Reject';
        }
        
    }

})();