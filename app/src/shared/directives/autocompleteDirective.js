angular
    .module('openDeskApp')
    .directive('openeAutocomplete', autocomplete);

function autocomplete() {

    return {
        restrict: 'E',
        scope: {
            datasource: '=',
            required: '=',
            name: '@',
            list: '=',
            label: '@',
            selected: '=?'
        },
        controllerAs: 'vm',
        controller: '@',
        name: 'controllerName',
        bindToController: true,
        templateUrl: 'app/src/common/components/authoritySelector/view/authoritySelectorOptions.html'
    };
}