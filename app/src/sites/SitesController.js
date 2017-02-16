'use strict';

    angular
        .module('openDeskApp.sites')
        .controller('SitesController', SitesController);

        function SitesController($scope, $mdDialog, $window, siteService, cmisService, $stateParams, searchService, $rootScope, documentService, authService, pd_siteService) {

			var vm = this;
            
            vm.sites = [];
			vm.sitesPerUser = [];
			vm.organizationalCenters = [];

			//pd_siteService.getAllOrganizationalCenters();

			//siteService.createMembersPDF("kagenu2");

			// siteService.removeRole("kage2", "abeecher", "Consumer")

			 //pd_siteService.createPDSite("kage8", "desc", "100", "center_1","fhp", "fhp");

			//pd_siteService.getAllOrganizationalCenters();


            //pd_siteService.createPDSite("kage4", "desc", "100", "center_1","admin", "abeecher");
			//siteService.getGroupMembers("kage2", "PD_PROJECTMANAGER");
			//siteService.removeRole("kage2", "abeecher", "Consumer")

			//siteService.addUser("kage8", "abeecher", "PD_MONITORS");
			//siteService.addUser("TestAvanceretprojekt", "abeecher", "PD_PROJECTOWNER");
			//siteService.removeUser("kage1", "abeecher", "PD_MONITORS");


            function getSites() {
                return siteService.getSites().then(function(response) {
                        vm.sites = response;
						return response;
                    }
                );    
            };
            getSites();

			function getSitesPerUser() {
				return siteService.getSitesPerUser().then(function(response) {
						vm.sitesPerUser = response;
						return response;
					}
				);
			};
			getSitesPerUser();

			function getAllOrganizationalCenters() {
				pd_siteService.getAllOrganizationalCenters().then(function(response) {
						vm.organizationalCenters = response.data;
						vm.organizationalCenters.push({"shortName": "", "displayName": "Alle"});
					}
				);
			};
			getAllOrganizationalCenters();


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

				siteService.createSite(name, description).then(function(val) {

					$mdDialog.hide();

					getSites().then(function(val) {
						vm.sites = val;
					});

					getSitesPerUser().then(function(val) {
						vm.sitesPerUser = val;
					});

					var shortName = name.replace(new RegExp(" ", 'g'), "");
					window.location.href = "/#!/projekter/" + shortName  + "?type=Project";

				});
			};

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
					
					getSites().then(function(val) {
						vm.sites = val;
					});

					getSitesPerUser().then(function(val) {
						vm.sitesPerUser = val;
					});
				});
			};


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
					
					getSites().then(function(val) {
						vm.sites = val;
					});

					getSitesPerUser().then(function(val) {
						vm.sitesPerUser = val;
					});
				});
			};

            
			vm.getSearchresults = function getSearchReslts(term){
				return searchService.getSearchResults(term).then(function (val) {

					console.log(val);

					if (val != undefined) {

						$rootScope.searchResults = [];
						$rootScope.searchResults = val.data.items;

						window.location.href = "#!/search";

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
					$window.location.href = "/#!/dokument/" + path;

					console.log("gotoPath");
				});
			};
            
            
        } // SiteCtrl close
