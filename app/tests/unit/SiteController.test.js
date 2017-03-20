/**
 * Created by flemmingheidepedersen on 15/03/2017.
 */

describe('SiteControll2er', function() {
    beforeEach(module('openDeskApp'));


    var $controller;
    var $authService;
    var $AuthController;
    var http;
    var $httpBackend

    beforeEach(inject(function(_$controller_, authService, $http, _$httpBackend_, sessionService){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $authService = authService;
        http = $http;
        $httpBackend = _$httpBackend_;
        $sessionService = sessionService;

        console.log("hvad er auth:" + $authService)




    }));


    var credentials = {"username" : "admin", "password" : "admin"}


    describe('$scope.grade', function() {
        it('tests for creating a notification', function() {

            var $scope = {};

            //var test = $authService.login(credentials.username, credentials.password).then (function(response) {
            //
            //});

            //user.capabilities.isAdmin

            var capabilities = {isAdmin : true};

            var admin = {"userName" : "admin",
                         "capabilities" : capabilities,
                         "firstName" : "admin"};

            var userInfo = {user : admin};

            $sessionService.setUserInfo(userInfo);
            console.log("sessionService.getUserInfo()");
            console.log($sessionService.getUserInfo());

            var controller = $controller('SiteController', { $scope: $scope });


            //$httpBackend.whenGET("/api/login").respond( function(response) {
            //
            //    sessionService.setUserInfo(userInfo);
            //
            //});




            $scope.createNotification("123","123","123","123");
            //


            //expect($scope.strength).toEqual('strong');
        });
    });
});
