
    angular
        .module('openeApp.workflows')
        .controller('StartPooledReviewWorkflowController', StartPooledReviewWorkflowController);
    
    function StartPooledReviewWorkflowController($controller, userService, workflowDef) {
        
        angular.extend(this, $controller('BaseStartCaseWorkflowController', {}));
        var vm = this;
        vm.workflowDef = workflowDef;
        vm.BaseStartCaseWorkflowController_getWorkflowInfo = vm.getWorkflowInfo;
        vm.getWorkflowInfo = getWorkflowInfo;
        
        init();
        
        function init(){
            vm.init();
            userService.getGroups().then(function(result){
                vm.recipients = result;
            });
        }
        
        function getWorkflowInfo(){
            var wi = vm.BaseStartCaseWorkflowController_getWorkflowInfo();
            angular.merge(wi, {
                assignToGroup: vm.selectedRecipient,
                properties: {
                    wf_requiredApprovePercent: vm.requiredApprovalPercentage
                }
            });
            return wi;
        }

    }