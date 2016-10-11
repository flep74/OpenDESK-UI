'use strict';

angular.module('openDeskApp.testdata').factory('testService', function ($http, $window, alfrescoNodeUtils, siteService, cmisService) {
    var restBaseUrl = '/alfresco/s/api/';

    var testSite1_name = "test1"


    return {
        loadSites: function () {
             siteService.createSite(testSite1_name, "blabla");
        },

        addDocumentsToSites: function () {

            var currentFolderNodeRef;
            var cmisQuery = testSite1_name + "/documentLibrary/"
            var newFolderNodeRef;

            cmisService.getNode(cmisQuery).then(function (val) {
                currentFolderNodeRef = val.data.properties["alfcmis:nodeRef"].value;

                var props = {
                    prop_cm_name: "1",
                    prop_cm_title: "2",
                    alf_destination: currentFolderNodeRef
                };

                //var newFolderNodeRef = siteService.createFolder("cm:folder", props);
                //console.log(newFolderNodeRef);

                return $http.get('http://localhost:8000/app/src/testdata/android.pdf', {responseType:'arraybuffer'} ).then(function (response) {


                    console.log(response);

                    var file = new Blob([response.data], {type: 'application/pdf'});
                    //var test =  new File(response.data, "flemming.pdf", {type: 'application/pdf'});
                    file.name = "hugo.pdf"

                    console.log(file);
                    siteService.uploadFiles(file, currentFolderNodeRef);


                })

                //
                //$http({method: 'GET', url: 'http://localhost:8000/app/src/testdata/android.pdf'}, {responseType:'arraybuffer'}).
                //    success(function(data, status, headers, config) {
                //
                //
                //
                //
                //
                //    }).
                //    error(function(data, status, headers, config) {
                //        // handle error
                //    });
                //
                //
                //
                //var bb = new Blob();
                //
                //var xhr = new XMLHttpRequest();
                //xhr.open('GET', 'http://localhost:8000/app/src/testdata/testService.js', true);
                //
                //xhr.responseType = 'arraybuffer';
                //console.log(xhr.response);

                //bb.append(xhr.response); // Note: not xhr.responseText

//at this point you have the equivalent of: new File()
//                var blob = bb.getBlob('image/png');







            });







    }
    }
});
