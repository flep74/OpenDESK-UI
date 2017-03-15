/**
 * Created by flemmingheidepedersen on 15/03/2017.
 */

describe('SiteControll2er', function() {
    beforeEach(module('openDeskApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.grade', function() {
        it('tests for creating a notification', function() {
            var $scope = {};
            var controller = $controller('SiteController', { $scope: $scope });
            //$scope.createNotification("123","123","123","123");

            //expect($scope.strength).toEqual('strong');
        });
    });
});
