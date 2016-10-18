'use strict';

angular
    .module('openDeskApp.testdata')
    .controller('TestController', TestController);

function TestController($scope, $mdDialog, $window, testService, siteService, $stateParams, searchService, $rootScope, documentService) {

    var vm = this;

    //siteService.getSites().then(function(val) {
    //    vm.sites = val;
    //});


    //alert("hej");


    //testService.removeTestDate();



    testService.loadSites().then(function (result) {

        // the fix was that i forgot to return this line in createSite:
        // return $http.post('/api/type/' + type + '/formprocessor', props).then(function (response) {

        console.log("hvad er rsult:" + result);

        var sites = siteService.getSites();
        console.log("sites");
        console.log(sites);

        console.log("doh");
        testService.addDocumentsToSites().then(function (result) {
            console.log("doh2");
            testService.addMembersToSite();
        });

    });


    // TODO setup wait for the loadSites to be finished before the documents are added

// fix - lav en controller for hver funktion du ønsker - f.eks. en der kalder indlæs sites.



}; // SiteCtrl close



