'use strict';

angular.module('openDeskApp.documents')
    .controller('DocumentController', DocumentController);

function DocumentController($scope, $timeout, documentService, $stateParams, $location, $state, documentPreviewService, alfrescoDownloadService, $mdDialog, notificationsService, authService, cmisService,siteService, $window) {
    
    var vm = this;
    vm.doc = [];
    vm.plugin = [];
    vm.paths = [];
	vm.title = [];
	vm.topRef = "";
	vm.loolDocUpdated = false;
	vm.fileName = $stateParams.fileName != undefined ? $stateParams.fileName : "";

	var parentDocumentNode = "";
	var firstDocumentNode = "";
	var selectedDocumentNode = "";
	
	if ($stateParams.doc != undefined) {
		selectedDocumentNode = $stateParams.doc;
	} else {
		selectedDocumentNode = $stateParams.nodeRef.split('/')[3];
	}


    if($location.search().archived !=  undefined && $location.search().parent !=  undefined)
    {
        vm.showArchived = $location.search().archived || $location.search().showDocPreview;;
		parentDocumentNode = $location.search().parent;
		vm.topRef = parentDocumentNode;
    }
    else{
        vm.showArchived = false;
		parentDocumentNode = selectedDocumentNode;
    }
    
    documentService.getHistory(parentDocumentNode).then (function (val){
        $scope.history = val;
		var currentNoOfHistory = $scope.history.length;
		var orgNoOfHistory = $location.search().noOfHist;
		//if a doc has been added to the history list, doc has been updated in lool
		if (orgNoOfHistory != undefined && currentNoOfHistory > orgNoOfHistory) {
			vm.loolDocUpdated = true;
		}
		if (currentNoOfHistory > 0) {
			firstDocumentNode = $scope.history[0].nodeRef;
		}
    });

    
	vm.selectFile = function(event){
        var file = event.target.value;
		var fileName = file.replace(/^C:\\fakepath\\/, "");
		document.getElementById("uploadFile").innerHTML = fileName;		
    };
	
	vm.cancel = function() {
		$mdDialog.cancel();
	};
	
	vm.goBack = function() {
		var nodeRef = $stateParams.topRef != null ? $stateParams.topRef : $stateParams.nodeRef.split('/')[3];
		if ($stateParams.backToDocPreview) {
			//came from edit doc in documentpreviewer, before goBack in lool
			window.location.replace("/#!/dokument/"+ nodeRef + "?showDocPreview=true&noOfHist=" + $stateParams.noOfHistory);
		} else {
			//came from review doc or edit doc from the documentlist, before goBack in lool
			$window.history.back();
		}

	}
	
    vm.godkendDialog = function (event) {
        $mdDialog.show({
            templateUrl: 'app/src/documents/view/aproveComment.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        });
    };
	
	vm.afvisDialog = function (event) {
        $mdDialog.show({
            templateUrl: 'app/src/documents/view/rejectComment.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        });
    };
	
	vm.uploadNewVersionDialog = function (event) {
		$mdDialog.show({
			templateUrl: 'app/src/documents/view/uploadNewVersion.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: event,
			scope: $scope,        // use parent scope in template
			preserveScope: true,  // do not forget this if use parent scope
			clickOutsideToClose: true
		});
	};


    vm.uploadNewVersion = function (file) {

		if(vm.paths[vm.paths.length -1].title != file.name){
			document.getElementById("uploadFile").innerHTML = "<i class='material-icons'>warning</i>&nbsp;Du skal vælge et dokument, der hedder<br>det samme som det eksisterende dokument. ";				
		} else {
			documentService.getDocument(vm.showArchived ? parentDocumentNode : selectedDocumentNode).then(function(response) {

				var cmisQuery = response.item.location.site + "/documentLibrary/" + response.item.location.path


				cmisService.getNode(cmisQuery).then(function (val) {

					var currentFolderNodeRef = val.data.properties["alfcmis:nodeRef"].value;
				   
					siteService.uploadNewVersion(file, currentFolderNodeRef, response.item.nodeRef).then(function(response){
						var param = vm.showArchived ? parentDocumentNode : selectedDocumentNode;
						if (window.location.hash == "#!/dokument/"+ param) {
							window.location.reload();
						} else {
							window.location.replace("/#!/dokument/"+ param);
						}
					} );

					$mdDialog.cancel();

				});
			});
		}
    };

    
    vm.getVersion = function (version) {

    }


    // prepare to handle a preview of a document to review
    var paramValue = $location.search().dtype;

    if (paramValue == "wf") {
        vm.wf_from = $location.search().from;
        vm.wf = true;
    }

    
    vm.createWFNotification = function(comment) {
        var creator = authService.getUserInfo().user.userName;
        var link = "/#!/dokument/" + selectedDocumentNode + "?dtype=wf-response" + "&from=" + creator;

        notificationsService.addNotice(vm.wf_from, "review svar", comment, link).then (function (val) {
            $mdDialog.hide();
        });
    }

	
	vm.highlightVersion = function () {
		var elm = document.getElementById(selectedDocumentNode) != undefined ? selectedDocumentNode : firstDocumentNode;
		
		if (elm == "") {
			 $timeout(vm.highlightVersion, 100);
		} else {
			document.getElementById(elm).style.backgroundColor = "#e1e1e1";
			document.getElementById(elm).style.lineHeight = "2";
		}
	}

    documentService.getDocument(parentDocumentNode).then(function(response) {
		
        vm.doc = response.item;
        

        // Compile paths for breadcrumb directive
        vm.paths = buildBreadCrumbPath(response);
		
		vm.title = response.item.location.siteTitle;
        
        function buildBreadCrumbPath(response) {
                var paths = [
                    {
                        title: 'Projekter',
                        link: '#!/projekter'
                    },
                    {
                        title: response.item.location.siteTitle,
                        link: '#!/projekter/' + response.item.location.site
                    }
                ];
                var pathArr = response.item.location.path.split('/');
                var pathLink = '/';
                for (var a in pathArr) {
                    if (pathArr[a] !== '') {
                        paths.push({
                            title: pathArr[a],
							link: '#!/projekter/' + response.item.location.site + pathLink + pathArr[a]
                        });
                        pathLink = pathLink + pathArr[a] + '/';
                    };
                };
                paths.push({
                    title: response.item.location.file,
                    link: response.item.location.path
                });
                return paths;
        };
        
    });


    // todo check if not ok type like pdf, jpg and png - then skip this step
    if (vm.showArchived) {


        vm.store = 'versionStore://version2Store/';

        documentService.createThumbnail(parentDocumentNode, selectedDocumentNode).then (function(response) {

            documentPreviewService.previewDocumentPlugin(response.data[0].nodeRef).then(function(plugin){

                vm.plugin = plugin;
                $scope.config = plugin;
                $scope.viewerTemplateUrl = documentPreviewService.templatesUrl + plugin.templateUrl;

                $scope.download = function(){

                    // todo fix the download url to download from version/version2store
                    alfrescoDownloadService.downloadFile($scope.config.nodeRef, $scope.config.fileName);
                };

                if(plugin.initScope){
                    plugin.initScope($scope);
                }


                    // delete the temporary node
                documentService.cleanupThumbnail(response.data[0].nodeRef)

            });
        })

    }
    else {
        vm.store = 'workspace://SpacesStore/';

        documentPreviewService.previewDocumentPlugin(vm.store + $stateParams.doc).then(function(plugin){

            vm.plugin = plugin;
            $scope.config = plugin;
            $scope.viewerTemplateUrl = documentPreviewService.templatesUrl + plugin.templateUrl;

            $scope.download = function(){
                alfrescoDownloadService.downloadFile($scope.config.nodeRef, $scope.config.fileName);
            };

            if(plugin.initScope){
                plugin.initScope($scope);
            }

        });
    }
	
	 //Goes to the libreOffice online edit page
	vm.goToLOEditPage = function(nodeRef, fileName, topRef, noOfHistory, backToDocPreview) {
		/*
		var thisNodeRef = nodeRef;
		var ref = $stateParams.doc;
		if (vm.showArchived) {
			thisNodeRef = "versionStore://version2Store/" + ref;
		}
		$state.go('lool', {'nodeRef': thisNodeRef, 'fileName': fileName, 'topRef': topRef, 'noOfHistory': noOfHistory, 'backToDocPreview': backToDocPreview});
		*/
		$state.go('lool', {'nodeRef': nodeRef, 'fileName': fileName, 'topRef': topRef, 'noOfHistory': noOfHistory, 'backToDocPreview': backToDocPreview});
	};

	angular.element(document).ready(function () {
		if ($window.location.href.split('/')[4] != "lool") {
			vm.highlightVersion();
		}
	});
    
};
	
