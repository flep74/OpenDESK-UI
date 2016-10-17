'use strict';

angular
    .module('openDeskApp.testdata')
    .controller('TestController', TestController);

function TestController($scope, $mdDialog, $window, testService, cmisService, $stateParams, searchService, $rootScope, documentService) {

    var vm = this;

    //siteService.getSites().then(function(val) {
    //    vm.sites = val;
    //});

    //testService.loadSites();
    testService.addDocumentsToSites();



}; // SiteCtrl close



