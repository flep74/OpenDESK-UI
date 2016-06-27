    angular
        .module('openDeskApp.search', ['ngCookies'])
        .controller('SearchController', SearchController, ['$cookies', function($cookies) {
					$cookies.searchResult = "";
        }]);

    /**
     * Main Controller for the Search module
     * @param $scope
     * @constructor
     */
    function SearchController($scope, $state, $cookies, $stateParams, searchService, documentPreviewService, alfrescoDownloadService, documentService, $window) {
        var vm = this;
				
				var originatorEv;
				vm.openMenu = function($mdOpenMenu, event) {
				  originatorEv = event;
				  $mdOpenMenu(event);
				};
				
        // $scope.searchResults = [];
				$scope.searchResults = $cookies.getObject("searchResult");

        vm.getAutoSuggestions = function(term) {
            return searchService.getSearchSuggestions(term).then(function (val) {

                if (val != undefined) {
                    return val;
                }
                else {
                    return [];
                }
            });
        }
				
        vm.getSearchresults = function(term) {
					return searchService.getSearchResults(term).then(function (val) {
						if (val != undefined) {

                            console.log(val);

							$cookies.putObject("searchResult", val);
							window.location.href = "#/search";
							
							// $scope.searchResults = val;							
							// $state.go('search');
						} else {
							return [];
						}
					});
        }

        vm.previewDocument = function previewDocument(nodeRef){
            documentPreviewService.previewDocument(nodeRef);
        }

        vm.downloadDocument = function downloadDocument(nodeRef, name){
            alfrescoDownloadService.downloadFile(nodeRef, name);
        }

        $scope.selectedDocumentPath = "";

        vm.gotoPath = function (nodeRef) {

            var ref = nodeRef;

            documentService.getPath(ref.split("/")[3]).then(function(val) {

                $scope.selectedDocumentPath = val.container


                var project = val.site;
                var container = val.container;
                var path = val.path;

                var projectPath = project + "/" + container + "/" + path;

                $window.location.href = '#/projekter/' + projectPath;

                console.log("gotoPath")}

            );
        }

    }

