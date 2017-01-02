'use strict';

    angular
        .module('openDeskApp.sites')
        .controller('SitesController', SitesController);

        function SitesController($scope, $mdDialog, $window, siteService, cmisService, $stateParams, searchService, $rootScope, documentService, siteProjectDepartmentService) {


			var vm = this;


			siteProjectDepartmentService.createPDSite("test_fhp_5", "desc", "100", "fhp", "fhp");

			siteService.getSites().then(function(val) {
				vm.sites = val;
				//console.log(typeof vm.sites[0].title);
			});

			vm.newSite = function(event) {
				$mdDialog.show({
					templateUrl: 'app/src/sites/view/newProject.tmpl.html',
					parent: angular.element(document.body),
					scope: $scope,
					preserveScope: true,
					targetEvent: event,
					clickOutsideToClose:true
				});
			};

			vm.createSite = function (name, description) {
				var r = siteService.createSite(name, description);

				r.then(function(result){			
					
					siteService.getSites().then(function(val) {
						vm.sites = val;
					});
					
					$mdDialog.hide();
				});
			}

			vm.deleteSiteDialog = function(siteName) {
				var confirm = $mdDialog.confirm()
					.title('Vil du slette dette projekt?')
					.textContent('Projektet og alle dets filer vil blive slettet')
					.ok('Ja')
					.cancel('Annullér');
				$mdDialog.show(confirm).then(function() {
					vm.deleteSite(siteName);
				});
			};
			
			vm.deleteSite = function (siteName) {
				var r = siteService.deleteSite(siteName);

				r.then(function(result){
					$mdDialog.hide();
					
					siteService.getSites().then(function(val) {
						vm.sites = val;
					});
				});
			}


			vm.cancel = function() {
				$mdDialog.cancel();
			};

			vm.reload = function() {
				$window.location.reload();
			};
			
			var originatorEv;
			vm.openMenu = function($mdOpenMenu, event) {
			  originatorEv = event;
			  $mdOpenMenu(event);
			};



			vm.querySites = function(q) {
				return siteService.getSitesByQuery(q).then(function (val) {
					vm.sites = val;
				});
			};


			vm.currentDialogTitle = '';
			vm.currentDialogDescription = '';
			vm.currentDialogShortName = '';
			vm.renameSiteDialog = function (event, shortName, title, description) {
				vm.currentDialogTitle = title;
				vm.currentDialogDescription = description;
				vm.currentDialogShortName = shortName;
				$mdDialog.show({
					templateUrl: 'app/src/sites/view/renameSite.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: event,
					scope: $scope,        // use parent scope in template
					preserveScope: true,  // do not forget this if use parent scope
					clickOutsideToClose: true
				});
			};
			
			vm.currentDialogSite = '';
			vm.infoSiteDialog = function (site) {
				vm.currentDialogSite = site;		
				$mdDialog.show({
					templateUrl: 'app/src/sites/view/infoSite.tmpl.html',
					parent: angular.element(document.body),
					//targetEvent: event,
					scope: $scope,        // use parent scope in template
					preserveScope: true,  // do not forget this if use parent scope
					clickOutsideToClose: true
				});
			};

			vm.updateSiteName = function (shortName, newName, description) {
				var r = siteService.updateSiteName(shortName, newName, description);

				r.then(function(result){
					vm.project_title = result.title;
					vm.project_description = result.description;
					$mdDialog.hide();
					
					siteService.getSites().then(function(val) {
						vm.sites = val;
					});
				});
			};

			vm.getSearchresults = function getSearchReslts(term){
				return searchService.getSearchResults(term).then(function (val) {

					console.log(val);

					if (val != undefined) {

						$rootScope.searchResults = [];
						$rootScope.searchResults = val.data.items;

						window.location.href = "#/search";

					} else {
						return [];
					}
				});
			};

			vm.getAutoSuggestions = function getAutoSuggestions(term) {
				return searchService.getSearchSuggestions(term).then(function (val) {

					if (val != undefined) {
						return val;
					}
					else {
						return [];
					}
				});
			};

			vm.gotoPath = function (nodeRef) {

				var ref = nodeRef;

				documentService.getPath(ref.split("/")[3]).then(function(val) {

					$scope.selectedDocumentPath = val.container
					// var project = val.site;
					// var container = val.container;
					// var path = val.path;

					var path = ref.replace("workspace://SpacesStore/", "");
					$window.location.href = "/#/dokument/" + path;

					console.log("gotoPath");
				});
			}

        }; // SiteCtrl close



