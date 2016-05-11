'use strict';

    angular
        .module('openDeskApp.sites')
        .controller('SiteController', SiteController);
        
        function SiteController($scope, $mdDialog, $window, siteService, cmisService, $stateParams, $location) {
			
			var vm = this;

			vm.project = $stateParams.projekt;
			vm.path = $stateParams.path;

			vm.cancel = function() {
				$mdDialog.cancel();
			};

			vm.reload = function() {
				$window.location.reload();
			};

			vm.createFolder = function(folderName) {
				var currentFolderNodeRef;
				var cmisQuery = $stateParams.projekt + $stateParams.path;

				cmisService.getNode(cmisQuery).then(function(val) {
					currentFolderNodeRef = val.data.properties["alfcmis:nodeRef"].value;

					var props = {
						prop_cm_name: folderName,
						prop_cm_title:folderName,
						alf_destination : currentFolderNodeRef
					};

					siteService.createFolder("cm:folder",props);

					vm.reload();
				});
			}


			vm.newFolderDialog = function(event) {
				$mdDialog.show({
					templateUrl: 'app/src/sites/view/newFolder.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: event,
					clickOutsideToClose:true
				});
			};

			cmisService.getFolderNodes($stateParams.projekt + $stateParams.path).then(function(val) {


				vm.contents = new Array();

				for (var x in val.data.objects) {
				  vm.contents.push({name : val.data.objects[x].object.succinctProperties["cmis:name"],
				                    contentType : val.data.objects[x].object.succinctProperties["cmis:objectTypeId"],
				                    nodeRef : val.data.objects[x].object.succinctProperties["cmis:parentId"]});
				};
			});


			siteService.getSiteMembers(vm.project).then(function(val) {
					vm.members = val;
			});

			vm.newMember = function(event) {
					$mdDialog.show({
							templateUrl: 'app/src/sites/view/newMember.tmpl.html',
							parent: angular.element(document.body),
							targetEvent: event,
							clickOutsideToClose: true
					});
			};

			// below for testing purpose - loads some data

			//siteService.getSiteRoles("heide").then(function(val) {
			//	vm.roles = val.siteRoles;
			//})

			//siteService.addMemberToSite("heide", "abeecher", "SiteContributor");
			//siteService.removeMemberFromSite("heide", "abeecher");
			//siteService.updateRoleOnSiteMember("heide", "abeecher", "SiteConsumer");

			//siteService.getSitesByQuery('1').then(function(val) {
			//		vm.roles = val;
			//})





        }; // SiteCtrl close

